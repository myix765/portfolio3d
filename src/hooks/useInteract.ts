import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import useDeskStore from '../stores/useDeskStore';
import type { FocusTargets } from '../stores/useDeskStore';

export const useInteract = (target: FocusTargets, enabled: boolean) => {
  const setFocus = useDeskStore(s => s.setFocus);
  const [, get] = useKeyboardControls();
  const prevInteract = useRef(false);

  useFrame(() => {
    const { interact } = get();

    if (enabled) {
      // detect interact key pressed
      // prevInteract prevents multiple firings, only fire on keydown
      if (interact && !prevInteract.current) {
        console.log('E pressed');
        setFocus(target);
      }
      prevInteract.current = interact;
    }
  });
};
