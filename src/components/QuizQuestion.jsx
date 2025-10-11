export default function QuizQuestion({ question, answer, onAnswerChange }) {
  if (question.type === 'mcq') {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
        <div className="space-y-2">
          {question.choices.map((choice, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={answer === index}
                onChange={() => onAnswerChange(index)}
                className="h-4 w-4 text-misc-blue focus:ring-misc-blue"
              />
              <span className="text-gray-700">{choice}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-misc-blue focus:border-misc-blue"
        />
      </div>
    );
  }

  return null;
}
