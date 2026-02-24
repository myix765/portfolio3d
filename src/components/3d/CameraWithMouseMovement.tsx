import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraWithMouseMovement — simulates sitting at a desk and looking around.
 *
 * Controls:
 *  - Click to lock pointer (Pointer Lock API)
 *  - Move mouse to look around
 *  - Escape to unlock
 *
 * Props:
 *  - horizontalLimit  radians: max yaw left/right   (default: Math.PI / 3  = 60°)
 *  - verticalLimit    radians: max pitch up/down     (default: Math.PI / 4  = 45°)
 *  - sensitivity      mouse sensitivity multiplier   (default: 0.002)
 *  - smoothing        lerp factor 0-1, 1 = instant   (default: 0.1)
 */
const CameraWithMouseMovement = ({
  horizontalLimit = Math.PI / 3,
  verticalLimit = Math.PI / 4,
  smoothing = 0.1,
}) => {
  const { camera, gl } = useThree();

  // Target euler angles (raw desired values)
  const target = useRef({ yaw: 0, pitch: 0 });
  // Current smoothed angles
  const current = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position as -1 to 1 within the canvas
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Map directly to angle limits
      target.current.yaw = -x * horizontalLimit;
      target.current.pitch = -y * verticalLimit;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [gl, horizontalLimit, verticalLimit]);

  useFrame(() => {
    // Smoothly interpolate current angles toward target
    current.current.yaw = THREE.MathUtils.lerp(
      current.current.yaw,
      target.current.yaw,
      smoothing,
    );
    current.current.pitch = THREE.MathUtils.lerp(
      current.current.pitch,
      target.current.pitch,
      smoothing,
    );

    // Apply to camera using Euler order YXZ:
    // Y first (yaw/horizontal), then X (pitch/vertical), no roll
    camera.rotation.order = 'YXZ';
    camera.rotation.y = current.current.yaw;
    camera.rotation.x = current.current.pitch;
  });

  return null;
};

export default CameraWithMouseMovement;
