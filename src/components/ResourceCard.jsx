import { DocumentArrowDownIcon, PlayCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ResourceCard({ resource }) {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <PlayCircleIcon className="h-6 w-6" />;
      case 'ppt':
        return <DocumentTextIcon className="h-6 w-6" />;
      case 'pdf':
        return <DocumentArrowDownIcon className="h-6 w-6" />;
      default:
        return <DocumentTextIcon className="h-6 w-6" />;
    }
  };

  const handleAction = () => {
    if (resource.type === 'video') {
      window.open(resource.url, '_blank');
    } else {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-misc-blue mt-1">{getIcon()}</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{resource.title}</h3>
            <p className="text-sm text-gray-500 mt-1 capitalize">{resource.type}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {resource.type === 'video' ? (
            <button
              onClick={handleAction}
              className="bg-misc-blue text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
              aria-label={`Open ${resource.title}`}
            >
              Watch
            </button>
          ) : (
            <button
              onClick={handleAction}
              className="bg-misc-blue text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
              aria-label={`Download ${resource.title}`}
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
