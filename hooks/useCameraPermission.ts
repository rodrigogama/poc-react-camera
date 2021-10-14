import React from 'react';

export const useCameraPermission = (): PermissionState => {
  const [permission, setPermission] = React.useState<PermissionState>('prompt');

  React.useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'camera' as PermissionName })
        .then(cameraPermissions => {
          setPermission(cameraPermissions.state);

          cameraPermissions.onchange = () => {
            setPermission(cameraPermissions.state);
          };
        });
    }
  }, []);

  return permission;
};
