import React from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

type Fullscreen = {
  isFullscreenEnabled: boolean;
};

const isFullscreenAvailable = (): boolean => {
  const document = window.document as any;
  if (!document) return false;

  return Boolean(
    document.fullscreenEnabled ||
      document.mozFullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled,
  );
};

export const useFullscreen = (): Fullscreen => {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = React.useState(false);

  useEnhancedEffect(() => {
    setIsFullscreenEnabled(isFullscreenAvailable());
  }, []);

  return { isFullscreenEnabled };
};
