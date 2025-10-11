import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { AcademicCapIcon, ClipboardDocumentListIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const tiles = [
    {
      title: 'Resources',
      description: 'Access course materials, slides, and videos',
      icon: AcademicCapIcon,
      href: '/resources',
      color: 'bg-blue-500'
    },
    {
      title: 'Assignments',
      description: 'View and attempt quizzes and coding tasks',
      icon: ClipboardDocumentListIcon,
      href: '/assignments',
      color: 'bg-green-500'
    },
    {
      title: 'Leaderboard',
      description: 'See your ranking and compete with peers',
      icon: TrophyIcon,
      href: '/leaderboard',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to MISC's Python for Machine Learning
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn Python and Machine Learning fundamentals with hands-on practice, 
          interactive quizzes, and real-world projects.
        </p>
      </div>

      {isAuthenticated && user?.progress && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed Quizzes</span>
              <span className="font-semibold text-misc-blue">
                {user.progress.completedQuizzes} / {user.progress.totalQuizzes}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-misc-blue h-3 rounded-full transition-all duration-300"
                style={{ width: `${user.progress.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Score</span>
              <span className="font-semibold text-misc-blue">{user.progress.score} points</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`${tile.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <tile.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{tile.title}</h3>
            <p className="text-gray-600">{tile.description}</p>
          </Link>
        ))}
      </div>

      {!isAuthenticated && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Login to track your progress and access all features
          </p>
          <Link
            href="/login"
            className="inline-block bg-misc-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
