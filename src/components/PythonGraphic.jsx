export default function PythonGraphic({ className = '' }) {
  return (
    <div className={`hidden md:flex items-center justify-center ${className}`} aria-hidden>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Transparent background so the graphic blends with page */}
        <g>
          <path d="M30 40c0-8 6-14 14-14h12v10H44c-3 0-6 3-6 6v6h-8V40z" fill="#306998" opacity="0.95" />
          <path d="M90 80c0 8-6 14-14 14H64v-10h12c3 0 6-3 6-6v-6h8v8z" fill="#FFD43B" opacity="0.95" />
          <circle cx="50" cy="60" r="3" fill="#fff" opacity="0.95" />
          <circle cx="74" cy="60" r="3" fill="#000" opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}
