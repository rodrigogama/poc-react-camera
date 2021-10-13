import React from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
import { CameraProps } from './types';

export const CameraSelfie = React.forwardRef<Webcam, CameraProps>(
  (props, ref) => {
    const { cameraProps } = props;
    return (
      <div>
        <Webcam {...cameraProps} ref={ref} mirrored />
      </div>
    );
  },
);

CameraSelfie.displayName = 'CameraSelfie';
