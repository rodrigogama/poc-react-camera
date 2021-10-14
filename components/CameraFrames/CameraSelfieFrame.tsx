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
    <div
      ref={containerRef}
      className="bg-transparent w-full h-full z-10 relative"
    >
      <svg height={height} viewBox={viewBox}>
        <defs>
          <mask id="mask">
            <rect height={height} width={width} fill="#fff" />
            <circle
              r={circleRadius}
              cx={width / 2}
              cy={height / 2}
              fill="#000"
            />
          </mask>
        </defs>

        <rect height={height} width={width} fill="#ffffff" mask="url(#mask)" />
      </svg>
    </div>
  );
};
