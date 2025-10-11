export default function MLGraphic({ className = '' }) {
  return (
    <div className={`hidden md:flex items-center justify-center ${className}`} aria-hidden>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="104" height="104" rx="16" fill="#F9FAFB" />
        <g>
          <circle cx="40" cy="40" r="8" fill="#7C3AED" />
          <circle cx="80" cy="40" r="6" fill="#06B6D4" />
          <circle cx="60" cy="80" r="10" fill="#10B981" />
          <path d="M44 44 L76 36 L68 76" stroke="#111827" strokeOpacity="0.08" strokeWidth="3" fill="none" />
        </g>
      </svg>
    </div>
  );
}
