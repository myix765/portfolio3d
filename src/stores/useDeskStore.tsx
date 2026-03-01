import { create } from 'zustand';

export type FocusTargets = 'monitor';

interface DeskStore {
  cameraMode: 'free' | 'focus';
  focusTarget: FocusTargets | null;
  setCameraMode: (value: DeskStore['cameraMode']) => void;
  setFocusTarget: (id: FocusTargets | null) => void;
}

const useDeskStore = create<DeskStore>(set => ({
  cameraMode: 'free',
  focusTarget: null,
  setCameraMode: value => set({ cameraMode: value }),
  setFocusTarget: id => set({ focusTarget: id }),
}));

export default useDeskStore;
