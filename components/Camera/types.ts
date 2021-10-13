import { HtmlHTMLAttributes } from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
import { CameraFrameType } from '../CameraFrames';

export type CaptureOptionProps = {
  type: CameraFrameType;
  description: string;
};

export const CaptureOptions: CaptureOptionProps[] = [
  {
    type: CameraFrameType.SELFIE,
    description: 'Selfie',
  },
  {
    type: CameraFrameType.CEDULA,
    description: 'Cédula de Ciudadanía',
  },
];

export type CameraProps = {
  cameraProps?: WebcamProps;
  cameraFrameType?: CameraFrameType;
  showCameraFrame?: boolean;
} & HtmlHTMLAttributes<HTMLDivElement>;

export type CameraComponent = Webcam;
