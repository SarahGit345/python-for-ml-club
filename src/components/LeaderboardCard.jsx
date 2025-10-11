export default function LeaderboardCard({ entry }) {
  const getTrophyIcon = () => {
    switch (entry.rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 text-center">
          {getTrophyIcon() ? (
            <span className="text-2xl">{getTrophyIcon()}</span>
          ) : (
            <span className="text-lg font-semibold text-gray-600">#{entry.rank}</span>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-misc-blue text-white flex items-center justify-center font-semibold">
            {entry.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{entry.name}</p>
          <p className="text-sm text-gray-500">Score: {entry.score}</p>
        </div>
        
        <div className="flex-shrink-0">
          <div className="bg-misc-blue bg-opacity-10 text-misc-blue px-3 py-1 rounded-full text-sm font-semibold">
            {entry.score} pts
          </div>
        </div>
      </div>
    </div>
  );
}
