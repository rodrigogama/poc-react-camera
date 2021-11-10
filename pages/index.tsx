import React, { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import { CameraIcon } from '@heroicons/react/outline';
import { CameraCard } from '../components/CameraCard';
import {
  Camera,
  CameraComponent,
  CaptureOptionProps,
  CaptureOptions,
} from '../components/Camera';
import { Select } from '../components/Select';
import { CameraFrameType } from '../components/CameraFrames';
import { useFullscreen } from '../hooks/useFullscreen';
import { useIsLandscape } from '../hooks/useIsLandscape';
import { useCameraPermission } from '../hooks/useCameraPermission';
import Webcam from 'react-webcam';

function downloadBase64File(base64Data: string) {
  const linkSource = `${base64Data}`;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = 'image-camera';
  downloadLink.click();
}

const Home: NextPage = () => {
  const cameraRef = React.useRef<CameraComponent>(null);
  const [capturedImages, setCapturedImages] = React.useState<string | null>();
  const [captureOption, setCaptureOption] = React.useState<CaptureOptionProps>(
    CaptureOptions[0],
  );

  const { isFullscreenEnabled } = useFullscreen();
  const isLandscape = useIsLandscape();
  const permission = useCameraPermission();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value as CameraFrameType;
    const captureOption = CaptureOptions.find(
      option => option.type === selectedType,
    );

    if (captureOption) setCaptureOption(captureOption);
  };

  const handleCapture = React.useCallback(() => {
    const resolution = isLandscape
      ? { width: 1920, height: 1080 }
      : { width: 1080, height: 1350 };

    const imageSrc = cameraRef.current?.getScreenshot(resolution) ?? null;

    if (imageSrc) downloadBase64File(imageSrc);

    setCapturedImages(imageSrc);
  }, [cameraRef, setCapturedImages, isLandscape]);

  const handleUserMediaError = (error: string | DOMException | Error) => {
    console.log('onUserMediaError');

    if (error instanceof DOMException) {
      console.log(error.name);
    } else if (error instanceof Error) {
      console.log(error.message);
      // setMediaError(error.message);
    }
  };

  const videoConstraints = {
    facingMode:
      captureOption.type === CameraFrameType.SELFIE ? 'user' : 'environment',
  };

  return (
    <main className="h-full w-full p-4">
      <section className="flex flex-col items-center justify-center">
        <Select label="Capture type" onChange={handleSelectChange}>
          {CaptureOptions.map(option => (
            <option
              key={option.type}
              value={option.type}
              selected={captureOption.type === option.type}
            >
              {option.description}
            </option>
          ))}
        </Select>

        <CameraCard className="max-w-[448px]">
          <h2 className="text-lg font-semibold mb-8">
            {captureOption.description}
          </h2>

          <p>Fullscreen support: {isFullscreenEnabled ? 'yes' : 'no'}</p>
          <p>Orientation: {isLandscape ? 'landscape' : 'portrait'}</p>
          <p>Permission: {permission.toUpperCase()}</p>

          <Camera ref={cameraRef} />

          {/* <div className="z-10 relative top-0 left-0 w-full mt-8">
            <Webcam
              videoConstraints={videoConstraints}
              ref={cameraRef}
              screenshotQuality={1}
              onUserMediaError={handleUserMediaError}
              mirrored={captureOption.type === CameraFrameType.SELFIE}
              className="w-full"
            />
          </div> */}

          <button className="flex items-center justify-center w-full px-4 py-2 mt-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
            Start process
          </button>

          <button
            className="flex items-center justify-center w-full px-4 py-2 mt-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity"
            onClick={handleCapture}
          >
            <CameraIcon className="w-7 stroke-1" />
          </button>

          {capturedImages && <img src={capturedImages} />}

          {/* {capturedImages.map((image, imageIndex) => (
          <img src={image} key={imageIndex} />
          ))} */}
        </CameraCard>
      </section>
    </main>
  );
};

export default Home;
