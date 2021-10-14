import clsx from 'clsx';
import React from 'react';
import Webcam from 'react-webcam';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import { useIsLandscape } from '../../hooks/useIsLandscape';
import {
  CameraCedulaFrame,
  CameraSelfieFrame,
  CameraFrameType,
} from '../CameraFrames';
import { CameraProps } from './types';

export const Camera = React.forwardRef<Webcam, CameraProps>((props, ref) => {
  const { cameraProps, cameraFrameType, showCameraFrame } = props;
  const isLandscape = useIsLandscape();
  const permission = useCameraPermission();

  console.log({ permission });

  const onUserMediaError = (error: string | DOMException) => {
    console.log('onUserMediaError');

    if (error instanceof DOMException) {
      console.log(error.name);
    } else {
      console.log(error);
    }
  };

  const showSelfieFrame =
    cameraFrameType === CameraFrameType.SELFIE && showCameraFrame;
  const showCedulaFrame =
    cameraFrameType === CameraFrameType.CEDULA && showCameraFrame;

  const videoConstraints = {
    facingMode:
      cameraFrameType === CameraFrameType.SELFIE ? 'user' : 'environment',
  };

  return (
    <>
      <p>Orientation: {isLandscape ? 'landscape' : 'portrait'}</p>
      {permission === 'denied' && (
        <p>Permission denied: please, allow your camera</p>
      )}
      <div
        className="relative overflow-hidden w-full bg-black after:block after:pb-[75%] mt-6"
        style={{ border: '1px solid' }}
      >
        <Webcam
          {...cameraProps}
          key={permission}
          videoConstraints={videoConstraints}
          ref={ref}
          onUserMediaError={onUserMediaError}
          mirrored={showSelfieFrame}
          className={clsx('z-10 absolute top-0 left-0', {
            'w-full': isLandscape,
          })}
        />

        <div className="absolute w-full h-full top-0 left-0">
          {showSelfieFrame && (
            <CameraSelfieFrame key={isLandscape ? 'landscape' : 'portrait'} />
          )}

          {showCedulaFrame && (
            <CameraCedulaFrame key={isLandscape ? 'landscape' : 'portrait'} />
          )}
        </div>
      </div>
    </>
  );
});

Camera.displayName = 'Camera';
