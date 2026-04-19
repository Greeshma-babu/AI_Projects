# Artificial Intelligence (AI) Projects
This repository contains a collection of AI, NLP, and Machine Learning projects focused on real-world use cases such as sentiment analysis, code review automation, and intelligent issue handling.

## List of Projects

1. [AI Movie Review Analysis](#1-ai-movie-review-analysis)  
2. [AI Code Review Integration Project](#2-ai-code-review-integration-project)  
3. [AI Cluster Details Automatic Response System](#3-ai-cluster-details-automatic-response-system) 
4. [Technical Blog](#technical-blog)


# 1. AI Movie Review Analysis
  File Name: AI_Movie_Review_Analysis.ipynb  
  
  Description: This project performs sentiment analysis on movie reviews using NLP techniques. The pipeline includes tokenization, stop-word removal, stemming, and lemmatization. After preprocessing, sentiment polarity scores are calculated to classify reviews as positive, negative, or neutral. Sentence-level analysis is also performed to extract the most impactful sentence for summary generation.
  
Tech Stack:
- NLTK
- Python
- Text Processing
-  Sentiment Analysis
  
Features:
- Text preprocessing pipeline
- Sentiment classification
- Extractive summary generation


# 2. AI Code Review Integration project
  File Name: index.js  
  
  Description : The system integrates GitHub, Slack, and an AI-based code review model using HuggingFace. When a new Pull Request (PR) is created in GitHub, a Node.js server running locally automatically triggers a webhook  event to initiate the workflow. The PR code is analyzed using a HuggingFace-based model to generate automated review comments, which are then sent to Slack for notification. In Slack, a code reviewer evaluates the AI-generated comments and selectively approves relevant suggestions by reacting with a tick (✅). Only the approved comments are then automatically posted back as official review comments on the corresponding GitHub PR. This workflow reduces unnecessary or low-quality AI-generated comments, ensures human validation from experienced reviewers, and improves efficiency by minimizing manual review effort and saving development time.
  
Tech Stack : 
- Node.js
- GitHub Webhooks
-  Slack
- Hugging Face

Features
- Automated AI code review generation
- Human-in-the-loop validation
- Slack-based approval workflow
- GitHub PR integration

# 3. AI Cluster Details Automatic Response System
  FileName : Cluster.yml (Repo : https://github.com/Greeshma-babu/DefectCreation)  
  
  Description : This system is designed to process GitHub Issue tracking queries related to cluster details. When a developer requests cluster information in an issue, the system uses Natural Language Processing (NLP) along with a Hugging Face AI model to interpret and extract the intent from the input text. Based on the identified cluster number, the system dynamically retrieves and shares the corresponding cluster-specific details using resource links. This enables automated understanding of developer queries and provides correct cluster information without manual intervention.
  
Tech Stack:
- NLP
- Hugging Face
- GitHub Issues
  
# Technical Blog 
   Title : Tutorial: Building an Enterprise AI Pipeline with IBM watsonx.data, IBM AutoAI & IBM Orchestration Pipelines.  

   Description : This blog presents a product success prediction use case using historical data, showing how to design and operationalize an end-to-end AI solution from raw data to production. It highlights how IBM watsonx.data, IBM AutoAI, and IBM Orchestration Pipelines work together to streamline data management, automate model building, and manage workflow execution, enabling faster insights, reduced operational complexity, and enterprise-grade governance.
   
   Link : [Tutorial: Building an Enterprise AI Pipeline with IBM watsonx.data, IBM AutoAI & IBM Orchestration Pipelines](https://medium.com/@greeshmababu99/tutorial-building-an-enterprise-ai-pipeline-with-ibm-watsonx-data-a4f9e3b589e6)
