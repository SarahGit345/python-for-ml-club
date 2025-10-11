import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getQuiz, submitQuiz } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import QuizQuestion from '../../components/QuizQuestion';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function QuizAttempt() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadQuiz();
    }
  }, [id]);

  useEffect(() => {
    if (quiz && timeRemaining > 0 && !submitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, timeRemaining, submitted]);

  useEffect(() => {
    if (quiz && !submitted) {
      const autoSave = setInterval(() => {
        localStorage.setItem(`quiz_${id}_answers`, JSON.stringify(answers));
      }, 10000);

      return () => clearInterval(autoSave);
    }
  }, [quiz, answers, id, submitted]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const data = await getQuiz(id);
      setQuiz(data);
      setTimeRemaining(data.duration);
      
      const savedAnswers = localStorage.getItem(`quiz_${id}_answers`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setError('Please login to submit the quiz');
      return;
    }

    try {
      setLoading(true);
      const response = await submitQuiz(id, user.id, answers);
      setResult(response);
      setSubmitted(true);
      localStorage.removeItem(`quiz_${id}_answers`);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && !quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-misc-blue"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Submitted!</h1>
            <p className="text-gray-600">Here are your results</p>
          </div>

          <div className="bg-misc-blue bg-opacity-10 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Your Score</p>
              <p className="text-4xl font-bold text-misc-blue">
                {result.score} / {result.maxScore}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                {Math.round((result.score / result.maxScore) * 100)}%
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Answer Breakdown</h2>
            {result.breakdown.map((item, index) => (
              <div key={item.questionId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Question {index + 1}</span>
                <div className="flex items-center space-x-4">
                  <span className={`font-medium ${item.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {item.correct ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                  <span className="text-gray-600">{item.awarded} pts</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/assignments')}
              className="bg-misc-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Assignments
            </button>
            <button
              onClick={() => router.push('/leaderboard')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-misc-blue text-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <ClockIcon className="h-5 w-5" />
              <span className="font-semibold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-white text-opacity-90">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1}</span>
              <span className="text-sm font-medium text-misc-blue">{currentQ.points} points</span>
            </div>
            <QuizQuestion
              question={currentQ}
              answer={answers[currentQ.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span>Previous</span>
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                className="flex items-center space-x-2 px-4 py-2 text-white bg-misc-blue rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Auto-saving every 10 seconds • {Object.keys(answers).length} of {quiz.questions.length} answered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
