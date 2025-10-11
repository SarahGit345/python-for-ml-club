# API Contract Documentation

This document describes all API endpoints used by the frontend application. The mock data layer simulates these endpoints - switch to real API by setting `USE_MOCK = false` in `src/lib/api.js`.

## Base URL

```
Development: http://localhost:3000
Production: Set via NEXT_PUBLIC_API_BASE_URL environment variable
```

## Endpoints

### 1. Get Sessions

**Endpoint**: `GET /api/sessions`

**Description**: Retrieves all course sessions

**Response**:
```json
[
  {
    "id": 1,
    "title": "Session 1: Introduction to Python & ML Basics",
    "date": "2025-10-01",
    "resources": [101, 102, 103]
  }
]
```

---

### 2. Get Resources

**Endpoint**: `GET /api/resources?sessionId={id}`

**Description**: Retrieves resources, optionally filtered by session

**Query Parameters**:
- `sessionId` (optional): Filter resources by session ID

**Response**:
```json
[
  {
    "id": 101,
    "sessionId": 1,
    "title": "Introduction to Python - Slides",
    "type": "ppt",
    "url": "https://example.com/intro-python.pptx"
  }
]
```

**Resource Types**:
- `ppt` - PowerPoint presentation
- `pdf` - PDF document
- `video` - Video recording

---

### 3. Get Assignments

**Endpoint**: `GET /api/assignments`

**Description**: Retrieves all assignments and quizzes

**Response**:
```json
[
  {
    "id": 201,
    "title": "Daily Quiz 1: Python Basics",
    "type": "quiz",
    "due": "2025-10-03",
    "status": "pending",
    "sessionId": 1,
    "quizId": 301
  }
]
```

**Assignment Types**:
- `quiz` - Daily quiz
- `coding` - Coding assignment

**Status Values**:
- `pending` - Not yet submitted
- `submitted` - Submitted, awaiting grading
- `graded` - Graded and completed

---

### 4. Get Quiz

**Endpoint**: `GET /api/quizzes/{id}`

**Description**: Retrieves a specific quiz with questions

**Response**:
```json
{
  "id": 301,
  "title": "Daily Quiz 1: Python Basics",
  "duration": 600,
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What is the output of: print(type([]))?",
      "choices": [
        "<class 'list'>",
        "<class 'dict'>",
        "<class 'tuple'>",
        "<class 'set'>"
      ],
      "correctAnswer": 0,
      "points": 10
    },
    {
      "id": 2,
      "type": "text",
      "question": "What does 'ML' stand for?",
      "correctAnswer": "Machine Learning",
      "points": 10
    }
  ]
}
```

**Question Types**:
- `mcq` - Multiple choice (single select)
- `text` - Short text answer

---

### 5. Submit Quiz

**Endpoint**: `POST /api/quizzes/{id}/submit`

**Description**: Submits quiz answers and receives grading results

**Request Body**:
```json
{
  "userId": 1,
  "answers": {
    "1": 0,
    "2": "Machine Learning"
  }
}
```

**Response**:
```json
{
  "score": 85,
  "maxScore": 100,
  "breakdown": [
    {
      "questionId": 1,
      "correct": true,
      "awarded": 10,
      "correctAnswer": 0
    },
    {
      "questionId": 2,
      "correct": false,
      "awarded": 0,
      "correctAnswer": "Machine Learning"
    }
  ]
}
```

---

### 6. Get Leaderboard

**Endpoint**: `GET /api/leaderboard?sessionId={id}&period={period}`

**Description**: Retrieves ranked leaderboard data

**Query Parameters**:
- `sessionId` (optional): Filter by session
- `period` (optional): Time period filter (`overall`, `last_7_days`, `this_month`)

**Response**:
```json
[
  {
    "rank": 1,
    "userId": 1,
    "name": "Alice Kumar",
    "score": 980
  }
]
```

---

### 7. Login

**Endpoint**: `POST /api/auth/login`

**Description**: Authenticates user and returns user data

**Request Body**:
```json
{
  "email": "alice@example.com",
  "name": "Alice Kumar"
}
```

**Response**:
```json
{
  "id": 1,
  "name": "Alice Kumar",
  "email": "alice@example.com",
  "rollNumber": "CS001",
  "score": 980,
  "avatar": "AK",
  "progress": {
    "userId": 1,
    "completedQuizzes": 2,
    "totalQuizzes": 7,
    "score": 980,
    "progress": 28
  }
}
```

---

### 8. Signup

**Endpoint**: `POST /api/auth/signup`

**Description**: Creates a new user account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "CS013"
}
```

**Response**:
```json
{
  "id": 13,
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "CS013",
  "score": 0,
  "avatar": "JD",
  "progress": {
    "completedQuizzes": 0,
    "totalQuizzes": 7,
    "score": 0,
    "progress": 0
  }
}
```

---

### 9. Get User Progress

**Endpoint**: `GET /api/users/{userId}/progress`

**Description**: Retrieves progress data for a specific user

**Response**:
```json
{
  "userId": 1,
  "completedQuizzes": 2,
  "totalQuizzes": 7,
  "score": 980,
  "progress": 28
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## Authentication

The frontend uses localStorage to persist user sessions. For real API integration:

1. Store JWT tokens or session IDs from login response
2. Include authentication headers in subsequent requests:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

## CORS Configuration

The backend API should allow requests from the frontend domain:

```javascript
Access-Control-Allow-Origin: http://localhost:5000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Rate Limiting

Consider implementing rate limiting on the backend:
- Quiz submissions: 1 per quiz per user
- Login attempts: 5 per hour per IP
- API requests: 100 per minute per user
