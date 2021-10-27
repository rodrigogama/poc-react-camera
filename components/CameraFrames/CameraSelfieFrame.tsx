import React from 'react';

export const CameraSelfieFrame: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
  }, []);

  const { width, height } = dimensions;
  const circleRadius = width / 2.8;
  const viewBox = `0 0 ${width} ${height}`;
  return (
    <div>
      <div className="scanner-overlay z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 61 39"
          style={{ transform: 'scale(-1, 1)' }}
        >
          <g fill="none">
            <path d="M15.9 14.7c-1 1.1-2.7 1.5-4.1.9l-.3-.1c-.2-.1-.3-.1-.5-.2-1.2-.2-2.3.6-2.5 1.8L8 20.2c-.6-3.5-.3-6.2 1-8 1.9-2.7 6.5-3.7 7.8-.7 2 .7 3 2 3.1 3.9.6 1.2.8 2.8.3 4.8l-.5-3.3c-.2-1.5-1.4-2.7-3-3h-.1l-.7.8zM5.5 28.5c5.7-1.5 11.6-1.5 17.3 0v3.8H5.5v-3.8z"></path>
          </g>
        </svg>
      </div>
    </div>
  );
};
