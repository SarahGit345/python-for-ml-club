import { useState, useEffect } from 'react';
import { getAssignments } from '../lib/api';
import AssignmentCard from '../components/AssignmentCard';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (err) {
      setError('Failed to load assignments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    if (filter === 'quiz') return assignment.type === 'quiz';
    if (filter === 'coding') return assignment.type === 'coding';
    if (filter === 'pending') return assignment.status === 'pending';
    if (filter === 'completed') return assignment.status !== 'pending';
    return true;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-misc-blue"></div>
          <p className="mt-4 text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assignments & Quizzes</h1>
        <p className="text-gray-600 mt-2">Complete your assignments and quizzes on time</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'quiz', 'coding', 'pending', 'completed'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filter === filterOption
                ? 'bg-misc-blue text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assignments found for this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
