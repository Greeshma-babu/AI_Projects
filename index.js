import dotenv from "dotenv";
import express from "express";
import crypto from "crypto";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());

// 🔐 Verify GitHub Signature
function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  const payload = JSON.stringify(req.body);

  const hmac = crypto.createHmac("sha256", process.env.GITHUB_SECRET);
  const digest = "sha256=" + hmac.update(payload).digest("hex");

  if (!signature) {
    console.log("❌ No signature found");
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// ===============================
// GitHub Webhook for PRs
// ===============================
app.post("/webhook", async (req, res) => {
  console.log("🚀 GitHub webhook triggered");

  if (!verifySignature(req)) {
    console.log("❌ Invalid signature");
    return res.status(401).send("Invalid signature");
  }

  const event = req.headers["x-github-event"];
  if (event === "pull_request" && req.body.action === "opened") {
    const prTitle = req.body.pull_request.title;
    const prUrl = req.body.pull_request.html_url;
    const repo = req.body.repository.full_name;
    const prNumber = req.body.pull_request.number;

    console.log("📌 PR Title:", prTitle);

    // ===============================
    // 🤖 OpenAI Review
    // ===============================
    let reviewComments = [];
    try {
      const openaiRes = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `You are a code reviewer. Generate 3 concise review comments for this PR title:\n"${prTitle}"`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiText = openaiRes.data.choices?.[0]?.message?.content?.trim();
      if (aiText) {
        reviewComments = aiText.split("\n").filter(line => line.trim() !== "");
        console.log("🤖 AI Review generated:", reviewComments);
      } else {
        reviewComments.push("🤖 AI generated review comment (AI review unavailable or failed)");
      }
    } catch (err) {
      console.log("❌ OpenAI API error:", err.response?.data || err.message);
      reviewComments.push("🤖 AI generated review comment (AI review unavailable or failed)");
    }

    // Add manual review comments
    reviewComments.push("Review comment 1", "Review comment 2", "Review comment 3");

    // Send PR info to Slack
    try {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `New Pull Request Opened\nRepo: ${repo}\nTitle: ${prTitle}\nURL: ${prUrl}`,
      });
    } catch (err) {
      console.log("❌ Slack PR info error:", err.response?.data || err.message);
    }

    // Send review comments to Slack
    for (const comment of reviewComments) {
      try {
        await axios.post(process.env.SLACK_WEBHOOK_URL, {
          text: `PR #${prNumber} | Repo: ${repo}\nComment: ${comment}`,
        });
      } catch (err) {
        console.log("❌ Slack review comment error:", err.response?.data || err.message);
      }
    }
  }

  res.status(200).send("OK");
});

// ===============================
// Slack Event Listener for Reactions & My PRs
// ===============================
app.post("/slack/events", async (req, res) => {
  const { type, event } = req.body;
  res.status(200).send("OK"); // Respond immediately to Slack

  console.log("⚡ Slack event received:", JSON.stringify(req.body, null, 2));

  // -------------------------
  // 1️⃣ Reaction added ✅
  // -------------------------
  if (type === "event_callback" && event.type === "reaction_added") {
    if (event.reaction !== "white_check_mark") return;

    const channel = event.item.channel;
    const ts = event.item.ts;

    try {
      const slackRes = await axios.get("https://slack.com/api/conversations.history", {
        params: { channel, latest: ts, inclusive: true, limit: 1 },
        headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
      });

      let messageText = slackRes.data.messages[0].text;
      messageText = messageText.replace(/[*`]/g, "").replace(/\[\d{1,2}:\d{2}\s?[APM]{2}\]\s*/, "");

      const prMatch = messageText.match(/PR\s*#(\d+)\s*\|\s*Repo:\s*([^\n]+)\nComment:\s*([\s\S]+)/);
      if (!prMatch) return;

      const prNumber = prMatch[1];
      const repo = prMatch[2].trim();
      const commentText = prMatch[3].trim();

      await axios.post(
        `https://api.github.com/repos/${repo}/issues/${prNumber}/comments`,
        { body: commentText },
        { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
      );

      console.log(`✅ Comment posted to PR #${prNumber}: ${commentText}`);
    } catch (err) {
      console.log("❌ Error posting approved comment:", err.response?.data || err.message);
    }
  }

  // -------------------------
  // 2️⃣ App Mention / My PRs in table
  // -------------------------
  if (type === "event_callback" && event.type === "app_mention") {
    const text = event.text.toLowerCase();
    if (!text.includes("prs")) return;

    const match = event.text.match(/PRs\s+(\S+)/i);
    if (!match) return;

    const githubUser = match[1].trim(); // user login

    try {
      const repo = "Greeshma-babu/AI_Automation_test";

      const prRes = await axios.get(`https://api.github.com/repos/${repo}/pulls`, {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        params: { state: "open", per_page: 50 },
      });

      const prs = prRes.data.filter(pr => pr.user.login === githubUser || pr.requested_reviewers.some(r => r.login === githubUser));

      if (!prs.length) {
        await axios.post(process.env.SLACK_WEBHOOK_URL, {
          text: `:clipboard: No open PRs found for GitHub user \`${githubUser}\`.`,
        });
        return;
      }

      // Build table
      let tableText = "*Open PRs for GitHub user:* `" + githubUser + "`\n";
      tableText += "```";
      tableText += "PR # | Title                          | Status\n";
      tableText += "--- | ------------------------------ | --------\n";

      for (const pr of prs) {
        const reviewsRes = await axios.get(
          `https://api.github.com/repos/${repo}/pulls/${pr.number}/reviews`,
          { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
        );
        const approvers = [...new Set(reviewsRes.data.filter(r => r.state === "APPROVED").map(r => r.user.login))];
        const status =
          approvers.length === 0 ? "Pending" :
          approvers.length < 2 ? "Partially Approved" :
          "Approved";

        tableText += `${pr.number} | ${pr.title.padEnd(30)} | ${status}\n`;
      }
      tableText += "```";

      await axios.post(process.env.SLACK_WEBHOOK_URL, { text: tableText });

    } catch (err) {
      console.log("❌ Error fetching PRs:", err.response?.data || err.message);
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `:x: Failed to fetch PRs for GitHub user ${githubUser}.`,
      });
    }
  }
});

app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});