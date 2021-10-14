import React from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

type Orientation = 'portrait' | 'landscape';

const getOrientation = (): Orientation => {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  if (
    window.screen &&
    window.screen.orientation &&
    window.screen.orientation.angle
  ) {
    return Math.abs(window.screen.orientation.angle) === 90
      ? 'landscape'
      : 'portrait';
  }

  // Support IOS safari
  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90
      ? 'landscape'
      : 'portrait';
  }

  return 'portrait';
};

export const useIsLandscape = (): boolean => {
  const [orientation, setOrientation] = React.useState(getOrientation);

  useEnhancedEffect(() => {
    const eventHandler = () => {
      setOrientation(getOrientation());
    };
    window.addEventListener('orientationchange', eventHandler);
    return () => {
      window.removeEventListener('orientationchange', eventHandler);
    };
  }, []);

  return orientation === 'landscape';
};
