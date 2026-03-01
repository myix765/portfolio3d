import { useFrame, useThree } from '@react-three/fiber';
import useDeskStore from '../../../stores/useDeskStore';
import { useEffect, useRef } from 'react';
import { createFreeLookController, updateFreeLook } from './freeLook';
import { updateFocusLook } from './focusLook';
import { freeLookOrigin } from '../configs/cameraConfigs';
import * as THREE from 'three';

const CameraSystem = () => {
  const { camera, gl } = useThree();
  const cameraMode = useDeskStore(s => s.cameraMode);
  const focusTarget = useDeskStore(s => s.focusTarget);

  const freeLookPosition = useRef(freeLookOrigin.position.clone());

  // target euler angles (raw desired values)
  const target = useRef({ yaw: camera.rotation.y, pitch: camera.rotation.x });
  // current smoothed angles
  const current = useRef({ yaw: camera.rotation.y, pitch: camera.rotation.x });

  useEffect(() => {
    const cleanup = createFreeLookController(
      gl.domElement,
      target,
      Math.PI / 3,
      Math.PI / 4,
    );

    return cleanup;
  }, [gl]);

  const cameraBehaviors = {
    free: (camera: THREE.PerspectiveCamera, delta: number) => {
      camera.position.lerp(freeLookPosition.current, 0.1);
      updateFreeLook(camera, current.current, target.current, delta * 10);
    },

    focus: (camera: THREE.PerspectiveCamera, delta: number) => {
      if (!focusTarget) return;
      updateFocusLook(camera, focusTarget, delta * 10);
    },
  };

  useFrame((_, delta) => {
    cameraBehaviors[cameraMode]?.(camera as THREE.PerspectiveCamera, delta);
  });

  return null;
};

export default CameraSystem;
