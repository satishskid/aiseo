
# AI-Powered SEO Automation Platform

A comprehensive, client-side platform to generate complete SEO strategies for Healthcare, EdTech, and AI businesses targeting the Indian market. The application leverages the Google Gemini API to produce keyword research, content plans, technical SEO recommendations, and social media post ideas.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo/your-project)

*(Replace the repository URL above after you've pushed this to your own GitHub account.)*

## ✨ Features

- **Multi-Step SEO Workflow:** A guided 7-step process from business input to performance analysis.
- **Dynamic AI Generation:** Leverages Google's `gemini-2.5-flash` model for fast, high-quality, and structured JSON output.
- **AI-Powered Baseline Audit:** Instantly get an SEO score and actionable "quick wins" based on your initial business info.
- **Actionable Publishing Calendar:** The AI generates a 4-week content calendar to turn your strategy into a concrete action plan.
- **Dynamic Sales Demo Generation:** Sales teams can generate complete, real-data client reports on the fly. These demos are cached locally for offline presentation.
- **AI Sales Coach:** During demo mode, a side panel provides AI-generated talking points to help salespeople effectively communicate the tool's value.
- **Client-Side API Key Management:** Users provide their own Gemini API key, which is stored securely in their browser's local storage. The application is fully client-side with no backend dependency.
- **Comprehensive Outputs:** Generates keyword strategies, content plans, social media posts, technical SEO checklists, and conversion rate optimization (CRO) plans.
- **Data Export:** Allows users to download the generated strategy as Markdown or CSV files.
- **Responsive Design:** A modern, clean UI built with Tailwind CSS that works across all devices.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **AI:** Google Gemini API (`@google/genai`)
- **Styling:** Tailwind CSS
- **Deployment:** Netlify (or any static host)
- **Module Loading:** ES Modules with `importmap` and `esm.sh` for a build-less development environment.

## 🚀 Getting Started (Local Development)

This project is set up to run directly in the browser without a build step, making local development very simple.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A code editor (e.g., [VS Code](https://code.visualstudio.com/)).
- The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code is highly recommended to avoid potential CORS issues.

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/your-project.git
    cd your-project
    ```

2.  **Run with Live Server:**
    - Open the project folder in VS Code.
    - Right-click the `index.html` file and select "Open with Live Server".
    - Your browser will open the application at a local address (e.g., `http://127.0.0.1:5500`).

## ⚙️ Usage

The application is designed to be intuitive and guides you through the process.

1.  **Use the Demo Hub:**
    - Click the "🚀 Demo Hub" button in the header.
    - Select "🔑 Manage API Keys" and enter your Google Gemini API key.
    - To generate a new sales demo, select "+ Generate New Sales Demo...", enter a brand name and URL, and let the AI work. The demo will be saved for later.
    - To view a saved demo, simply select it from the list.
2.  **Live Mode:**
    - Select "Live Mode" from the Demo Hub.
    - Fill in your business info in Step 1 and click "Generate Foundation & SEO Audit".
    - Review the AI-generated text and click "Confirm & Generate SEO Strategy".
    - Progress through each step by clicking the "Generate" buttons that appear.
3.  **Export Data:** Once all steps are complete, use the "Final Actions" section to export your generated data.

## 🌐 Deployment

This application can be deployed as a static site on any modern hosting platform. See the detailed [Netlify Deployment Guide](#) for step-by-step instructions.

- **Build Command:** (leave empty)
- **Publish Directory:** `.` (or the root directory)
