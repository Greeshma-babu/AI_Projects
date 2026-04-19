# AI_Projects
This repo contains the AI ML projects

# 1. AI Movie Review Analysis
  File Name: AI_Movie_Review_Analysis.ipynb 
  Description : The system processes a movie review by performing text preprocessing using NLP techniques such as tokenization, stop-word removal, lemmatization, and stemming. The cleaned text is then analyzed using      sentiment analysis to compute polarity scores, which classify the review as positive, negative, or neutral. Finally, sentence-level polarity is evaluated, and the sentence with the highest polarity score is selected to generate a concise extractive summary of the review.

# 2. AI Code Review Integration project
  File Name: index.js 
  Description : The system integrates GitHub, Slack, and an AI-based code review model using HuggingFace. When a new Pull Request (PR) is created in GitHub, a Node.js server running locally automatically triggers a webhook  event to initiate the workflow. The PR code is analyzed using a HuggingFace-based model to generate automated review comments, which are then sent to Slack for notification. In Slack, a code reviewer evaluates the AI-generated comments and selectively approves relevant suggestions by reacting with a tick (✅). Only the approved comments are then automatically posted back as official review comments on the corresponding GitHub PR.
This workflow reduces unnecessary or low-quality AI-generated comments, ensures human validation from experienced reviewers, and improves efficiency by minimizing manual review effort and saving development time.
