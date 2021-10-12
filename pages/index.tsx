import React from 'react';
import type { NextPage } from 'next';
import Webcam from 'react-webcam';

const Home: NextPage = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [key, setKey] = React.useState(1);
  const [images, setImages] = React.useState<string[]>([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) setImages(prev => [...prev, imageSrc]);
  }, [webcamRef, setImages]);

  const onUserMediaError = (error: string | DOMException) => {
    console.log('onUserMediaError');

    if (error instanceof DOMException) {
      console.log(error.name);
    } else {
      document.write(error);
    }
  };

  // React.useEffect(() => {
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

  return (
    <div className="h-full">
      <Webcam
        key={key}
        onUserMediaError={onUserMediaError}
        ref={webcamRef}
        mirrored
      />
      <button onClick={capture}>Capture</button>

      {images.map((image, imageIndex) => (
        <img src={image} key={imageIndex} />
      ))}
    </div>
  );
};

export default Home;
