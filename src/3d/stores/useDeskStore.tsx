import { create } from 'zustand';

export type FocusTargets = 'mac';

type CameraMode = { type: 'free' } | { type: 'focus'; target: FocusTargets };

interface DeskStore {
  cameraMode: CameraMode;
  setFree: () => void;
  setFocus: (target: FocusTargets) => void;
}

const useDeskStore = create<DeskStore>(set => ({
  cameraMode: { type: 'free' },
  setFree: () => set({ cameraMode: { type: 'free' } }),
  setFocus: target => set({ cameraMode: { type: 'focus', target } }),
}));

export default useDeskStore;
