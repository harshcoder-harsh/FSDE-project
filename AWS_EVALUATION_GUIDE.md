# AWS Deployment Setup Guide

Follow this guide to fulfill your evaluation rubrics and link your AWS account to the automated CI/CD pipeline.

## Section 1 -- Amazon ECR: Container Registry
**1.1 ECR Repo Setup**
1. Log into your AWS Console and search for **Elastic Container Registry (ECR)**.
2. Click **Create repository**.
3. Under *Visibility settings*, select **Private**.
4. For *Repository name*, type exactly: `fsde-backend`.
5. Click **Create repository**.

**1.2 Image Pushed & 1.3 Tagging Strategy**
- This is fully automated! Our GitHub Actions workflow automatically builds the Docker image and tags it with both the exact Git Commit SHA (e.g. `e3b0c44`) and `latest`.

---

## Section 2 -- Amazon ECS: Container Orchestration
**2.1 ECS Cluster**
1. In the AWS Console, search for **Elastic Container Service (ECS)**.
2. Click **Create cluster**.
3. Set *Cluster name* to exactly: `fsde-cluster`.
4. Under *Infrastructure*, make sure **AWS Fargate (serverless)** is selected.
5. Click **Create**.

**2.2 Task Definition**
- A base task definition has already been added to your code at `.aws/task-def.json`.
1. In the AWS Console (ECS dashboard), go to **Task definitions** (left menu) and click **Create new task definition** -> **Create new task definition with JSON**.
2. Paste the contents of `.aws/task-def.json`.
   - *Note: Replace `YOUR_AWS_ACCOUNT_ID` in the JSON with your actual 12-digit AWS Account ID before saving.*
3. Click **Create**.

**2.3 Service Running**
1. Go back to your `fsde-cluster` in the ECS dashboard.
2. Click **Create** under the *Services* tab.
3. *Compute options*: Select **Launch type** and choose **FARGATE**.
4. *Deployment configuration*: 
   - Application type: **Service**
   - Task Definition: Select `fsde-backend-task`
   - Service name: `fsde-service`
   - Desired tasks: `1`
5. Click **Create**.

---

## Section 3 -- CI/CD Pipeline: GitHub Actions
**3.1 Dockerfile**
- Already created in the root of the project! It's a multi-stage build that compiles the Node.js backend.

**3.2 Workflow File**
- Already created at `.github/workflows/deploy.yml`.

**3.3 Build & Push / 3.4 Full Automation**
- The pipeline will automatically run whenever you push code to the `main` branch. 
- **CRITICAL FINAL STEP**: For the pipeline to have permission to push to your AWS account, you must add your AWS credentials to GitHub:
  1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
  2. Click **New repository secret**.
  3. Add `AWS_ACCESS_KEY_ID` (paste your IAM Access Key).
  4. Add `AWS_SECRET_ACCESS_KEY` (paste your IAM Secret Key).

Once these secrets are saved, simply commit and push your code to trigger the fully automated pipeline!
