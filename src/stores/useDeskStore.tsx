import { create } from 'zustand';

interface DeskStore {
  cameraState: 'free' | 'focused';
  setCameraState: (value: DeskStore['cameraState']) => void;
}

const useDeskStore = create<DeskStore>(set => ({
  cameraState: 'free',
  setCameraState: value => set({ cameraState: value }),
}));

export default useDeskStore;
