import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import useDeskStore from '../stores/useDeskStore';
import type { FocusTargets } from '../stores/useDeskStore';

export const useInteract = (target: FocusTargets, enabled: boolean) => {
  const cameraMode = useDeskStore(s => s.cameraMode);
  const setFocus = useDeskStore(s => s.setFocus);
  const setFree = useDeskStore(s => s.setFree);
  const [, get] = useKeyboardControls();
  const prevInteract = useRef(false);
  const prevEscape = useRef(false);

  useFrame(() => {
    const { interact, escape } = get();

    if (enabled) {
      // detect interact key pressed
      // prevInteract prevents multiple firings, only fire on keydown
      if (interact && !prevInteract.current) {
        setFocus(target);
      }
      prevInteract.current = interact;
    }

    if (cameraMode.type === 'focus') {
      if (escape && !prevEscape.current) {
        setFree();
      }
    }
    prevEscape.current = escape;
  });
};
