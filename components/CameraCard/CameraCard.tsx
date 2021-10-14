import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export const CameraCard: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'relative bg-white p-4 rounded w-full h-full shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
