import clsx from 'clsx';
import React from 'react';
import Webcam from 'react-webcam';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import { useIsLandscape } from '../../hooks/useIsLandscape';
import { CameraFrameType } from '../CameraFrames';
import { CameraProps } from './types';

export const Camera = React.forwardRef<Webcam, CameraProps>((props, ref) => {
  const { cameraProps, cameraFrameType, showCameraFrame } = props;
  const isLandscape = useIsLandscape();
  const permission = useCameraPermission();

  console.log({ isLandscape });

  const showSelfieFrame =
    cameraFrameType === CameraFrameType.SELFIE && showCameraFrame;
  const showCedulaFrame =
    cameraFrameType === CameraFrameType.CEDULA && showCameraFrame;

  return (
    <div
      className="relative overflow-hidden w-full bg-black after:block after:pb-[75%]"
      style={{ border: '1px solid' }}
    >
      {/* <p>Orientation: {isLandscape ? 'landscape' : 'orientation'}</p> */}

      <Webcam
        {...cameraProps}
        ref={ref}
        mirrored
        className={clsx('z-10 absolute top-0 left-0', {
          'w-full': isLandscape,
        })}
      />

      <div className="absolute w-full h-full top-0 left-0">
        {showSelfieFrame && <div className=""></div>}

        {showCedulaFrame && (
          <div>
            <div className="scanner-overlay z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 61 39"
                style={{ transform: 'scale(-1, 1)' }}
              >
                <g fill="none">
                  <path d="M15.9 14.7c-1 1.1-2.7 1.5-4.1.9l-.3-.1c-.2-.1-.3-.1-.5-.2-1.2-.2-2.3.6-2.5 1.8L8 20.2c-.6-3.5-.3-6.2 1-8 1.9-2.7 6.5-3.7 7.8-.7 2 .7 3 2 3.1 3.9.6 1.2.8 2.8.3 4.8l-.5-3.3c-.2-1.5-1.4-2.7-3-3h-.1l-.7.8zM5.5 28.5c5.7-1.5 11.6-1.5 17.3 0v3.8H5.5v-3.8z"></path>
                  <path
                    d="M32 9.3h16.7M32 13h7.2M32 16.8h10.9m2.6 15.4h2.6m-10.9 0h5.6m1.2-3h4.1m-7.9 0h1.1m-6.3 0h2.6m7.9 3h2.6-2.6zm-8.3 0h5.6-5.6zm6.8-3h4.1H44zm-3.8 0h1.1-1.1zm-5.2 0h2.6H35zm-24-2.4V28l.1.1c1.8 1.5 4.4 1.5 6.1-.1h0v-1.1m-6.2.7h0c-1.4 0-2.7.2-4.1.6l-1.5.4m11.9-1h0c1.4 0 2.7.2 4.1.6l1.5.4m-2.6-7h0c.6-.1.9-.6.9-1.1h0c0-.5-.4-1-.9-1.1h0M8 18.8v2.7c0 2 1 3.9 2.7 5l.9.6c1.5 1 3.4 1 4.9 0l.9-.6c1.7-1.1 2.7-3 2.7-5v-2.7m-4.2-4.1l.8-.8h.1c1.5.2 2.7 1.5 3 3l.5 3.3c.4-2 .3-3.6-.3-4.8-.1-1.9-1.1-3.2-3.1-3.9-1.2-3-5.8-2-7.8.7-1.3 1.8-1.6 4.5-1 8l.5-3.1c.2-1.2 1.3-2 2.5-1.8.2 0 .4.1.5.2l.3.1c1.4.6 3 .3 4-.9zM8 21.6h0c-.6-.1-.9-.6-.9-1.1h0c0-.5.4-1 .9-1.1h0m0 1.1h-.2m12.7 0h-.2"
                    stroke="#fff"
                    strokeWidth=".741"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity=".7"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Camera.displayName = 'Camera';