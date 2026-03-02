import { create } from 'zustand';

export type FocusTargets = 'mac';

interface DeskStore {
  cameraMode: 'free' | 'focus';
  focusTarget: FocusTargets | null;
  setCameraMode: (value: DeskStore['cameraMode']) => void;
  setFocusTarget: (target: FocusTargets | null) => void;
}

const useDeskStore = create<DeskStore>(set => ({
  cameraMode: 'free',
  focusTarget: null,
  setCameraMode: value => set({ cameraMode: value }),
  setFocusTarget: target => set({ focusTarget: target }),
}));

export default useDeskStore;
