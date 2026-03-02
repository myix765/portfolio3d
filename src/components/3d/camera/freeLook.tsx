import type { RefObject } from 'react';
import * as THREE from 'three';

interface RotationState {
  yaw: number;
  pitch: number;
}

/**
 * Smoothly updates a camera's rotation based on current and target rotation states.
 * @param camera - The THREE.js camera to modify.
 * @param current - Current rotation state (will be mutated).
 * @param target - Target rotation state to approach.
 * @param smoothing - Lerp factor (0-1), higher is faster.
 */
export const updateFreeLook = (
  camera: THREE.Camera,
  current: RotationState,
  target: RotationState,
  smoothing: number,
) => {
  current.yaw = THREE.MathUtils.lerp(current.yaw, target.yaw, smoothing);
  current.pitch = THREE.MathUtils.lerp(current.pitch, target.pitch, smoothing);

  // Euler order YXZ:
  // Y first (yaw/horizontal), then X (pitch/vertical), no roll
  camera.rotation.order = 'YXZ';
  camera.rotation.y = current.yaw;
  camera.rotation.x = current.pitch;
};

/**
 * Sets up a mousemove listener that updates a rotation target ref.
 * @param params.canvas - The canvas element to attach the listener to.
 * @param params.target - RefObject pointing to the rotation target state.
 * @param params.horizontalLimit - Maximum yaw rotation in radians.
 * @param params.verticalLimit - Maximum pitch rotation in radians.
 * @returns cleanup function to remove the listener.
 */
export const createFreeLookController = (
  canvas: HTMLCanvasElement,
  target: RefObject<RotationState>,
  horizontalLimit: number,
  verticalLimit: number,
) => {
  const handleMouseMove = (e: MouseEvent) => {
    // bound -1 to 1
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    target.current.yaw = -x * horizontalLimit;
    target.current.pitch = -y * verticalLimit;
  };

  canvas.addEventListener('mousemove', handleMouseMove);

  return () => {
    canvas.removeEventListener('mousemove', handleMouseMove);
  };
};
