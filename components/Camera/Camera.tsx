import React from 'react';
import Webcam from 'react-webcam';
import { useIsLandscape } from '../../hooks/useIsLandscape';
import { CameraProps } from './types';

export const Camera = React.forwardRef<Webcam, CameraProps>((props, ref) => {
  const { cameraProps } = props;
  const isLandscape = useIsLandscape();

  console.log({ isLandscape });

  return (
    <div style={{ border: '1px solid' }}>
      <p>Orientation: {isLandscape ? 'landscape' : 'orientation'}</p>

      <Webcam {...cameraProps} ref={ref} mirrored className="w-full" />
    </div>
  );
});

Camera.displayName = 'Camera';
