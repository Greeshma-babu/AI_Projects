# AI_Projects
This repo contains the AI ML projects.

# 1. AI Movie Review Analysis
  File Name: AI_Movie_Review_Analysis.ipynb  
  Description : The system processes a movie review by performing text preprocessing using NLP techniques such as tokenization, stop-word removal, lemmatization, and stemming. The cleaned text is then analyzed using      sentiment analysis to compute polarity scores, which classify the review as positive, negative, or neutral. Finally, sentence-level polarity is evaluated, and the sentence with the highest polarity score is selected to generate a concise extractive summary of the review.

# 2. AI Code Review Integration project
  File Name: index.js  
  Description : The system integrates GitHub, Slack, and an AI-based code review model using HuggingFace. When a new Pull Request (PR) is created in GitHub, a Node.js server running locally automatically triggers a webhook  event to initiate the workflow. The PR code is analyzed using a HuggingFace-based model to generate automated review comments, which are then sent to Slack for notification. In Slack, a code reviewer evaluates the AI-generated comments and selectively approves relevant suggestions by reacting with a tick (✅). Only the approved comments are then automatically posted back as official review comments on the corresponding GitHub PR.
This workflow reduces unnecessary or low-quality AI-generated comments, ensures human validation from experienced reviewers, and improves efficiency by minimizing manual review effort and saving development time.

# 3.  AI Cluster Details Auto-Response System
  FileName : Cluster.yml (Repo : https://github.com/Greeshma-babu/DefectCreation)
  Description : This system is designed to process GitHub Issue tracking queries related to cluster details. When a developer requests cluster information in an issue, the system uses Natural Language Processing (NLP) along with a Hugging Face AI model to interpret and extract the intent from the input text. Based on the identified cluster number, the system dynamically retrieves and shares the corresponding cluster-specific details using resource links. This enables automated understanding of developer queries and provides relevant contextual information without manual intervention.

# Techincal Blog 
   Title : Tutorial: Building an Enterprise AI Pipeline with IBM watsonx.data, IBM AutoAI & IBM Orchestration Pipelines  
    Description : This blog presents a product success prediction use case using historical data, showing how to design and operationalize an end-to-end AI solution from raw data to production. It highlights how IBM watsonx.data, IBM AutoAI, and IBM Orchestration Pipelines work together to streamline data management, automate model building, and manage workflow execution, enabling faster insights, reduced operational complexity, and enterprise-grade governance.  
    Link : https://medium.com/@greeshmababu99/tutorial-building-an-enterprise-ai-pipeline-with-ibm-watsonx-data-a4f9e3b589e6?source=email-0c1dc91e1cea-1776320285081-newsletter.subscribeToProfile-------------------------75f6e3c0_6128_4c4b_a2af_9df3cf9d1eb9--------59a4b2cd594b
