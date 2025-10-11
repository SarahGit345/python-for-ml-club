import { useAuth } from '../context/AuthContext';
import { mockSessions } from '../lib/mock-data';
import { useState } from 'react';
import Link from 'next/link';

export default function LivePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [joining, setJoining] = useState(null);

  const joined = new Set(user?.joinedSessions || []);

  const joinSession = (id) => {
    if (!isAuthenticated) return;
    if (joined.has(id)) return;
    setJoining(id);
    const updated = [...joined, id];
    updateUser({ joinedSessions: updated });
    setJoining(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Live Sessions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSessions.map((s) => {
          const isJoined = joined.has(s.id);
          return (
            <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4">Date: {s.date}</p>
              <div className="flex items-center space-x-3">
                <Link href={`/resources?session=${s.id}`} className="text-misc-blue underline">View resources</Link>
                <button
                  onClick={() => joinSession(s.id)}
                  disabled={!isAuthenticated || isJoined}
                  className={`ml-auto px-4 py-2 rounded-lg text-white ${isJoined ? 'bg-gray-400' : 'bg-misc-blue hover:bg-blue-600'}`}
                >
                  {isJoined ? 'Joined' : joining === s.id ? 'Joining...' : 'Join Live'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
