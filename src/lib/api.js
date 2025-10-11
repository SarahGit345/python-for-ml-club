import {
  mockUsers,
  mockSessions,
  mockResources,
  mockAssignments,
  mockQuizzes,
  mockLeaderboard,
  mockUserProgress
} from './mock-data';

const USE_MOCK = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getSessions() {
  if (USE_MOCK) {
    await delay(300);
    return mockSessions;
  }
  const response = await fetch(`${API_BASE_URL}/api/sessions`);
  return response.json();
}

export async function getResources(sessionId) {
  if (USE_MOCK) {
    await delay(200);
    if (sessionId) {
      return mockResources.filter(r => r.sessionId === parseInt(sessionId));
    }
    return mockResources;
  }
  const url = sessionId ? `${API_BASE_URL}/api/resources?sessionId=${sessionId}` : `${API_BASE_URL}/api/resources`;
  const response = await fetch(url);
  return response.json();
}

export async function getAssignments() {
  if (USE_MOCK) {
    await delay(300);
    return mockAssignments;
  }
  const response = await fetch(`${API_BASE_URL}/api/assignments`);
  return response.json();
}

export async function getQuiz(id) {
  if (USE_MOCK) {
    await delay(300);
    return mockQuizzes.find(q => q.id === parseInt(id));
  }
  const response = await fetch(`${API_BASE_URL}/api/quizzes/${id}`);
  return response.json();
}

export async function submitQuiz(quizId, userId, answers) {
  if (USE_MOCK) {
    await delay(500);
    const quiz = mockQuizzes.find(q => q.id === parseInt(quizId));
    if (!quiz) return { error: 'Quiz not found' };
    
    let score = 0;
    const breakdown = quiz.questions.map((q, index) => {
      const userAnswer = answers[q.id];
      let correct = false;
      
      if (q.type === 'mcq') {
        correct = userAnswer === q.correctAnswer;
      } else if (q.type === 'text') {
        correct = userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
      }
      
      const awarded = correct ? q.points : 0;
      score += awarded;
      
      return {
        questionId: q.id,
        correct,
        awarded,
        correctAnswer: q.correctAnswer
      };
    });
    
    const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    
    return { score, maxScore, breakdown };
  }
  
  const response = await fetch(`${API_BASE_URL}/api/quizzes/${quizId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, answers })
  });
  return response.json();
}

export async function getLeaderboard(sessionId, period) {
  if (USE_MOCK) {
    await delay(300);
    return mockLeaderboard;
  }
  const params = new URLSearchParams();
  if (sessionId) params.append('sessionId', sessionId);
  if (period) params.append('period', period);
  
  const response = await fetch(`${API_BASE_URL}/api/leaderboard?${params.toString()}`);
  return response.json();
}

export async function login(email, name) {
  if (USE_MOCK) {
    await delay(400);
    let user = mockUsers.find(u => u.email === email);
    if (!user && name) {
      user = mockUsers.find(u => u.name === name);
    }
    if (!user) {
      user = mockUsers[0];
    }
    const progress = mockUserProgress[user.id] || { 
      userId: user.id, 
      completedQuizzes: 0, 
      totalQuizzes: 7, 
      score: 0, 
      progress: 0 
    };
    return { ...user, progress };
  }
  
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
  return response.json();
}

export async function signup(name, email, rollNumber) {
  if (USE_MOCK) {
    await delay(400);
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      rollNumber,
      score: 0,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      progress: {
        completedQuizzes: 0,
        totalQuizzes: 7,
        score: 0,
        progress: 0
      }
    };
    return newUser;
  }
  
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, rollNumber })
  });
  return response.json();
}

export async function getUserProgress(userId) {
  if (USE_MOCK) {
    await delay(200);
    return mockUserProgress[userId] || { 
      userId, 
      completedQuizzes: 0, 
      totalQuizzes: 7, 
      score: 0, 
      progress: 0 
    };
  }
  
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/progress`);
  return response.json();
}
