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
import type { CameraFrameType } from '../components/CameraFrames';

const Home: NextPage = () => {
  const cameraRef = React.useRef<CameraComponent>(null);
  // const [key, setKey] = React.useState(1);
  const [capturedImages, setCapturedImages] = React.useState<string | null>();
  const [captureOption, setCaptureOption] = React.useState<CaptureOptionProps>(
    CaptureOptions[0],
  );

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current?.getScreenshot();

  //   if (imageSrc) setImages(prev => [...prev, imageSrc]);
  // }, [webcamRef, setImages]);

  // const onUserMediaError = (error: string | DOMException) => {
  //   console.log('onUserMediaError');

  //   if (error instanceof DOMException) {
  //     console.log(error.name);
  //   } else {
  //     document.write(error);
  //   }
  // };

  // React.useEffect(() => {
  //   var orientation =
  //     (screen.orientation || {}).type ||
  //     screen.mozOrientation ||
  //     screen.msOrientation;

  //   setState({ orientation });

  //   if ('permissions' in navigator) {
  //     console.log('permissions!');
  //     navigator.permissions
  //       .query({ name: 'camera' as PermissionName })
  //       .then(function (notificationPerm) {
  //         console.log(notificationPerm);
  //         notificationPerm.onchange = function () {
  //           console.log(
  //             'User decided to change his seettings. New permission: ' +
  //               notificationPerm.state,
  //           );

  //           if (notificationPerm.state === 'prompt') {
  //             setKey(prev => prev + 1);
  //           }
  //         };
  //       });
  //   }
  // }, []);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value as CameraFrameType;
    const captureOption = CaptureOptions.find(
      option => option.type === selectedType,
    );

    if (captureOption) setCaptureOption(captureOption);
  };

  const handleCapture = React.useCallback(() => {
    const imageSrc = cameraRef.current?.getScreenshot() ?? null;
    setCapturedImages(imageSrc);
  }, [cameraRef, setCapturedImages]);

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

        <CameraCard>
          <h2 className="text-lg font-semibold mb-8">
            {captureOption.description}
          </h2>

          <Camera
            ref={cameraRef}
            cameraFrameType={captureOption.type}
            showCameraFrame
          />

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
      {/* <Webcam
        key={key}
        onUserMediaError={onUserMediaError}
        ref={webcamRef}
        mirrored
      />
      <button onClick={capture}>Capture</button>

      {Object.entries(state).map(([key, value]) => (
        <p key={key}>
          <span>
            key: {key} / value: {value}
          </span>
        </p>
      ))}

     */}
    </main>
  );
};

export default Home;
