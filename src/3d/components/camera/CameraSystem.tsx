import { useFrame, useThree } from '@react-three/fiber';
import useDeskStore from '../../stores/useDeskStore';
import { useEffect, useRef } from 'react';
import { createFreeLookController, updateFreeLook } from './freeLook';
import { updateFocusLook } from './focusLook';
import { freeLookOrigin } from '../configs/cameraConfigs';
import * as THREE from 'three';

const CameraSystem = () => {
  const { camera, gl } = useThree();
  const cameraMode = useDeskStore(s => s.cameraMode);

  const freeLookPosition = useRef(freeLookOrigin.position.clone());

  // target euler angles (raw desired values)
  const target = useRef({ yaw: camera.rotation.y, pitch: camera.rotation.x });
  // current smoothed angles
  const current = useRef({ yaw: camera.rotation.y, pitch: camera.rotation.x });

  useEffect(() => {
    const cleanup = createFreeLookController(gl.domElement, target, Math.PI / 3, Math.PI / 4);

    return cleanup;
  }, [gl]);

  useFrame((_, delta) => {
    if (cameraMode.type === 'free') {
      camera.position.lerp(freeLookPosition.current, 0.1);
      updateFreeLook(camera as THREE.PerspectiveCamera, current.current, target.current, delta * 10);
    }

    if (cameraMode.type === 'focus') {
      updateFocusLook(camera as THREE.PerspectiveCamera, cameraMode.target, delta * 10);
    }
  }, -1); // add priority to prevent interfering with HTML transform

  return null;
};

export default CameraSystem;
