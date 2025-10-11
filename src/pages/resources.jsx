import { useState, useEffect } from 'react';
import { getSessions, getResources } from '../lib/api';
import ResourceCard from '../components/ResourceCard';

export default function Resources() {
  const [sessions, setSessions] = useState([]);
  const [resourcesBySession, setResourcesBySession] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const sessionsData = await getSessions();
      setSessions(sessionsData);

      const resourcesMap = {};
      for (const session of sessionsData) {
        const resources = await getResources(session.id);
        resourcesMap[session.id] = resources;
      }
      setResourcesBySession(resourcesMap);
    } catch (err) {
      setError('Failed to load resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-misc-blue"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
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
        <h1 className="text-3xl font-bold text-gray-900">Course Resources</h1>
        <p className="text-gray-600 mt-2">Access all course materials, slides, and recordings</p>
      </div>

      <div className="space-y-8">
        {sessions.map((session) => (
          <div key={session.id} className="bg-gray-50 rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{session.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(session.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourcesBySession[session.id]?.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
              {(!resourcesBySession[session.id] || resourcesBySession[session.id].length === 0) && (
                <p className="text-gray-500 col-span-full">No resources available yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
