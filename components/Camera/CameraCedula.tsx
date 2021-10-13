import React from 'react';
import Webcam from 'react-webcam';
import { CameraProps } from './types';

export const CameraCedula = React.forwardRef<Webcam, CameraProps>(
  (props, ref) => {
    const { cameraProps } = props;
    return (
      <div>
        <Webcam {...cameraProps} ref={ref} mirrored />
      </div>
    );
  },
);

CameraCedula.displayName = 'CameraCedula';
