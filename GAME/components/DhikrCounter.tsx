import React, { useEffect, useState } from 'react';

interface DhikrCounterProps {
  count: number;
  setCount: (n: number) => void;
  target?: number;
}

const DhikrCounter: React.FC<DhikrCounterProps> = ({ count, setCount, target = 100 }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Increment
    setCount(count + 1);

    // Ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    // Vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Calculate circle progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = target > 0 ? Math.min(count / target, 1) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      <div className="relative group cursor-pointer select-none" onClick={handleClick}>
        {/* Background Glow */}
        <div className="absolute inset-0 bg-islamic-green/20 rounded-full blur-3xl group-hover:bg-islamic-green/30 transition-all duration-500"></div>

        {/* SVG Circle */}
        <svg width="300" height="300" className="transform -rotate-90 relative z-10 drop-shadow-2xl">
          {/* Track */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-islamic-green transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <span className="text-6xl font-bold text-gray-800 dark:text-white drop-shadow-sm">
            {count}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ذکر
          </span>
        </div>

        {/* Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-islamic-green/30 animate-ping pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors shadow-sm font-medium"
        >
          بازنشانی
        </button>
      </div>
    </div>
  );
};

export default DhikrCounter;
