import { create } from 'zustand';

interface WindowState {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
}

interface WindowStore {
  windows: WindowState[];
  topZ: number;

  openWindow: (w: WindowState) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>(set => ({
  windows: [],
  topZ: 1,

  openWindow: window => set(state => ({ windows: [...state.windows, window], topZ: Math.max(state.topZ, window.z) })),
  closeWindow: id => set(state => ({ windows: state.windows.filter(w => w.id !== id) })),
  focusWindow: id =>
    set(state => {
      const nextZ = state.topZ + 1;
      return { topZ: nextZ, windows: state.windows.map(w => (w.id === id ? { ...w, z: nextZ } : w)) };
    }),
}));
