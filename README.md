# Pregnancy Care Companion

A comprehensive pregnancy tracking web application with AI-powered assistance, medication safety checker, symptom tracker, and nutritional guidance.

## Features

- 📅 Week-by-week pregnancy tracking
- 💊 Medication safety checker
- 🤖 AI-powered chat assistant (OpenAI GPT-3.5)
- 📊 Symptom tracking and emergency guidance
- 🍎 Nutrition planner
- 🚨 Emergency symptom reference

## Tech Stack

- React 18
- TypeScript
- Vite
- OpenAI API
- Tailwind-style CSS
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pregnancy-tracker.git
cd pregnancy-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```bash
cp .env.example .env
```

4. Add your OpenAI API key to the `.env` file
```
VITE_OPENAI_API_KEY=your-actual-api-key-here
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Deployment

This app is configured for deployment on Vercel. See the deployment instructions in the repository.

## Environment Variables

- `VITE_OPENAI_API_KEY` - Your OpenAI API key for the chat assistant

## License

MIT