import React from 'react';
import Webcam from 'react-webcam';
import { CameraProps } from './types';

export const Camera = React.forwardRef<Webcam, CameraProps>((props, ref) => {
  const { cameraProps } = props;
  return (
    <div style={{ border: '1px solid' }}>
      <Webcam {...cameraProps} ref={ref} mirrored className="w-full" />
    </div>
  );
});

Camera.displayName = 'Camera';
