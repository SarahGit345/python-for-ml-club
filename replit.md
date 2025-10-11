# Overview

This is a frontend application for the MISC (Microsoft Ignite Students Club) Python for Machine Learning course platform. Built with Next.js, React, and Tailwind CSS, it provides students with access to course materials, interactive quizzes, assignments, and a leaderboard to track progress. The application uses a mock data layer to simulate backend API responses, making it ready for future backend integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework Choice: Next.js with Pages Router**
- Uses Next.js Pages Router (`/src/pages`) instead of App Router for simpler routing and SSR control
- Server-side rendering enabled where beneficial for performance
- React 19 with functional components and hooks exclusively
- No TypeScript - pure JavaScript (ES6+) for reduced complexity

**Styling Strategy: Tailwind CSS**
- Utility-first CSS framework for rapid UI development
- Custom theme extensions for brand colors (`misc-blue`, `misc-dark`)
- Mobile-first responsive design approach
- Configured via `tailwind.config.js` to scan `/src/pages` and `/src/components`

**Component Architecture**
- Modular, reusable components in `/src/components`:
  - `Navbar.jsx` - Site navigation
  - `Footer.jsx` - Page footer
  - `ResourceCard.jsx` - Display course materials
  - `AssignmentCard.jsx` - Show assignments
  - `QuizQuestion.jsx` - Interactive quiz interface
  - `LeaderboardCard.jsx` - Student rankings display
- Functional components with React hooks (useState, useEffect, useContext)

## State Management

**Authentication Context Pattern**
- `AuthContext.jsx` provides global authentication state
- Uses React Context API for user session management
- localStorage persistence for demo authentication
- Wraps entire app via `_app.jsx`

**Local State Management**
- Component-level state with useState for UI interactions
- No external state management library (Redux/Zustand) to keep complexity low
- Quiz auto-save functionality using local state + localStorage

## Data Layer Architecture

**Mock-First API Design**
- Toggle between mock and real API via `USE_MOCK` flag in `/src/lib/api.js`
- All mock data centralized in `/src/lib/mock-data.js`
- API contract documented in `API_CONTRACT.md` for backend integration
- Simulated network delays (200-300ms) for realistic UX testing

**API Abstraction Layer** (`/src/lib/api.js`)
- Wrapper functions for all API calls:
  - `getSessions()` - Fetch course sessions
  - `getResources(sessionId)` - Get materials, optionally filtered
  - `getAssignments()` - Retrieve assignments
  - `getQuiz(id)` - Load quiz data
  - `submitQuiz(id, answers)` - Submit quiz responses
  - `getLeaderboard()` - Fetch student rankings
  - `getUserProgress(userId)` - Get individual progress
  - `login(email, password)` - Authentication
  - `signup(userData)` - User registration
- Environment-aware base URL via `NEXT_PUBLIC_API_BASE_URL`

## Routing Structure

**Page Organization** (`/src/pages/`)
- `index.jsx` - Dashboard/home page
- `login.jsx` - Authentication page
- `signup.jsx` - User registration
- `resources.jsx` - Course materials browser
- `assignments.jsx` - Assignment listing
- `quiz/[id].jsx` - Dynamic quiz pages
- `leaderboard.jsx` - Rankings display
- `profile.jsx` - User profile
- `_app.jsx` - App wrapper with global providers

## Design System

**Accessibility First**
- Semantic HTML elements
- Keyboard navigation support
- ARIA labels where needed
- Color contrast compliance

**Responsive Breakpoints**
- Mobile-first approach
- Tailwind's default breakpoints (sm, md, lg, xl)
- Optimized for all device sizes

# External Dependencies

## Core Framework Dependencies

**Next.js (v15.5.4)**
- React framework for production
- Provides SSR, routing, and optimized builds
- Configured with `reactStrictMode: true` and experimental dev origins

**React (v19.2.0) + React DOM**
- UI library for component-based architecture
- Latest stable version with concurrent features

## Styling & UI

**Tailwind CSS (v3.4.18)**
- Utility-first CSS framework
- PostCSS (v8.5.6) and Autoprefixer (v10.4.21) for processing

**Heroicons React (v2.2.0)**
- Icon library for UI elements
- React-optimized SVG icons

## Development Tools

**ESLint (v9.37.0)**
- Code quality and consistency
- Next.js ESLint config (`eslint-config-next`) for framework-specific rules

## Future Backend Integration

**Expected API Structure**
- RESTful endpoints documented in `API_CONTRACT.md`
- Base URL configurable via environment variable
- Authentication likely JWT-based (to be implemented)
- All endpoints return JSON responses

**Mock Data Models**
- Users with authentication credentials
- Course sessions with date-based scheduling
- Resources (PPT, PDF, video) linked to sessions
- Assignments with deadlines and submission tracking
- Quizzes with multiple-choice questions
- Leaderboard with real-time scoring
- User progress tracking

**Environment Variables Required**
- `NEXT_PUBLIC_API_BASE_URL` - Backend API endpoint (defaults to `http://localhost:3000`)