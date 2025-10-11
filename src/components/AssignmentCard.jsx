import Link from 'next/link';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function AssignmentCard({ assignment }) {
  const getStatusBadge = () => {
    switch (assignment.status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-4 w-4 mr-1" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Graded
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-4 w-4 mr-1" />
            Pending
          </span>
        );
    }
  };

  const getActionButton = () => {
    if (assignment.type === 'quiz') {
      if (assignment.status === 'pending') {
        return (
          <Link
            href={`/quizzes/${assignment.quizId}`}
            className="bg-misc-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Attempt Quiz
          </Link>
        );
      } else if (assignment.status === 'submitted') {
        return (
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
            Submitted
          </button>
        );
      } else {
        return (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            View Result
          </button>
        );
      }
    } else {
      if (assignment.status === 'pending') {
        return (
          <button className="bg-misc-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
            Submit Assignment
          </button>
        );
      } else {
        return (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            View Submission
          </button>
        );
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-sm text-gray-500">
            Due: {new Date(assignment.due).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-gray-400 mt-1 capitalize">{assignment.type}</p>
        </div>
        <div className="sm:ml-4">
          {getActionButton()}
        </div>
      </div>
    </div>
  );
}
