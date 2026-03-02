import * as THREE from 'three';
import { focusConfigs } from '../configs/cameraConfigs';
import type { FocusTargets } from '../../stores/useDeskStore';

export function updateFocusLook(camera: THREE.PerspectiveCamera, targetKey: FocusTargets, smoothing: number) {
  const config = focusConfigs[targetKey];

  const targetPosition = new THREE.Vector3(...config.position);
  const targetLookAt = new THREE.Vector3(...config.lookAt);

  camera.position.lerp(targetPosition, smoothing);
  camera.lookAt(targetLookAt);
}
