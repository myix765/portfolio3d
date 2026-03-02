import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useDeskStore, { type FocusTargets } from '../stores/useDeskStore';
import { objectBasePosition, interactTextPosition } from '../components/3d/configs/objectConfigs';

const NDC_THRESHOLD = 0.25;
const projected = new THREE.Vector3();

export const useLookAt = (target: FocusTargets) => {
  const { camera } = useThree();
  const cameraMode = useDeskStore(s => s.cameraMode);
  const [isLooking, setIsLooking] = useState(false);

  const worldPosition = useRef(
    new THREE.Vector3(
      objectBasePosition[0] + interactTextPosition[target][0],
      objectBasePosition[1] + interactTextPosition[target][1],
      objectBasePosition[2] + interactTextPosition[target][2],
    ),
  );

  useFrame(() => {
    if (cameraMode.type === 'focus') {
      setIsLooking(false);
      return;
    }

    projected.copy(worldPosition.current).project(camera);

    setIsLooking(
      projected.z < 1 && // in front of camera
        Math.abs(projected.x) < NDC_THRESHOLD &&
        Math.abs(projected.y) < NDC_THRESHOLD,
    );
  });

  return isLooking;
};
