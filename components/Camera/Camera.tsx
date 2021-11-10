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
  const containerRef = React.useRef(null);
  const { cameraProps, cameraFrameType, showCameraFrame } = props;
  const isLandscape = useIsLandscape();
  const permission = useCameraPermission();

  console.log({ permission });

  const onUserMediaError = (error: string | DOMException | Error) => {
    console.log('onUserMediaError');

    if (error instanceof DOMException) {
      console.log(error.name);
    } else if (error instanceof Error) {
      console.log(error.message);
      // setMediaError(error.message);
    }
  };

  const handleFullscreen = () => {
    const docEl = containerRef?.current as any;
    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(docEl);
    } else {
      alert('no support');
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

  const docEl = containerRef?.current as any;
  const requestFullScreen =
    docEl?.requestFullscreen ||
    docEl?.mozRequestFullScreen ||
    docEl?.webkitRequestFullScreen ||
    docEl?.msRequestFullscreen;

  // @ts-ignore
  const handleUserMedia = (...args) => console.log(args);

  return (
    <>
      <div
        className="relative overflow-hidden w-full bg-black after:block after:pb-[75%] mt-6"
        style={{ border: '1px solid' }}
        ref={containerRef}
      >
        <Webcam
          {...cameraProps}
          key={permission}
          videoConstraints={videoConstraints}
          ref={ref}
          onUserMedia={handleUserMedia}
          screenshotQuality={1}
          onUserMediaError={onUserMediaError}
          mirrored={showSelfieFrame}
          className={clsx('z-10 absolute top-0 left-0', {
            'w-full': true,
          })}
        />

        <div className="absolute w-full h-full top-0 left-0">
          {showSelfieFrame && <CameraSelfieFrame />}

          {showCedulaFrame && <CameraCedulaFrame />}
        </div>
        <button
          className="relative bg-red-400 w-full z-50"
          onClick={handleFullscreen}
        >
          Fullscreen
        </button>
      </div>
    </>
  );
});

Camera.displayName = 'Camera';
