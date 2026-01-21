<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1yqkYEM0V3keScMHX8BqYAWT7vfVuu33E

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This webapp is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Setup Instructions:

1. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`

2. **Add your Gemini API Key as a secret**:
   - Go to `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret`
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key

3. **Deploy**:
   - Push to the `main` branch or manually trigger the workflow from the Actions tab
   - Your app will be available at: `https://saisrikiran25-ctrl.github.io/AIAdvantage/`

### Manual Deployment:

You can also manually trigger the deployment:
- Go to the `Actions` tab in your repository
- Select the "Deploy to GitHub Pages" workflow
- Click `Run workflow`
