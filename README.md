# MISC Python for Machine Learning - Frontend

A clean, minimal frontend built with Next.js, React, and Tailwind CSS for the MISC (Microsoft Ignite Students Club) Python for Machine Learning course platform.

## Features

- 🎓 **Course Resources**: Access session materials, slides, and video recordings
- 📝 **Assignments & Quizzes**: Interactive quizzes with auto-save and instant feedback
- 🏆 **Leaderboard**: Track your progress and compete with peers
- 🔐 **Authentication**: Demo login/signup with localStorage persistence
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- ♿ **Accessible**: Built with semantic HTML and keyboard navigation support

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Language**: JavaScript (ES6+)

## Project Structure

```
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
├── API_CONTRACT.md
├── public/
│   └── logo.png
└── src/
    ├── index.css
    ├── assets/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── LeaderboardCard.jsx
    │   ├── AssignmentCard.jsx
    │   ├── QuizQuestion.jsx
    │   └── ResourceCard.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── lib/
    │   ├── api.js
    │   └── mock-data.js
    └── pages/
        ├── _app.jsx
        ├── index.jsx
        ├── login.jsx
        ├── signup.jsx
        ├── resources.jsx
        ├── assignments.jsx
        ├── quizzes/[id].jsx
        └── leaderboard.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:5000](http://localhost:5000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Mock Data vs Real API

The application uses a mock data layer by default. To switch to a real API:

1. Set the `USE_MOCK` flag to `false` in `src/lib/api.js`
2. Set the API base URL:
```bash
export NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

See `API_CONTRACT.md` for complete API specifications.

## Demo Credentials

For testing, use any email from the mock data:
- alice@example.com
- bob@example.com
- charlie@example.com

Or create a new account via the signup page.

## Features Guide

### Dashboard
- Welcome screen with navigation tiles
- Progress summary for logged-in users
- Quick access to Resources, Assignments, and Leaderboard

### Resources
- Session-grouped course materials
- Download slides and notes
- Watch video recordings

### Assignments
- View all quizzes and coding assignments
- Filter by type (quiz/coding) or status (pending/completed)
- Direct links to attempt quizzes

### Quiz System
- Timed quizzes with countdown timer
- MCQ and text-based questions
- Auto-save every 10 seconds
- Question navigation (previous/next)
- Instant feedback and detailed results

### Leaderboard
- Ranked list of all students
- Filter by time period (overall/last 7 days/this month)
- See scores and rankings

## Development

### Scripts

- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Optional environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000  # API endpoint (when USE_MOCK is false)
```

## Accessibility

The application follows accessibility best practices:
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance
- Alt text for images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 MISC - Microsoft Ignite Students Club. All rights reserved.
