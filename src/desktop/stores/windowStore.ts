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
  focusedId: string | null;
  desktopSize: { width: number; height: number } | null;

  openWindow: (w: Omit<WindowState, 'z'>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setFocusedId: (id: string | null) => void;
  setDesktopSize: (size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>(set => ({
  windows: [],
  topZ: 1,
  focusedId: null,
  desktopSize: null,

  openWindow: window =>
    set(state => {
      const nextZ = state.topZ + 1;
      return { windows: [...state.windows, { ...window, z: nextZ }], topZ: nextZ, focusedId: window.id };
    }),
  closeWindow: id =>
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
      focusedId: state.focusedId === id ? null : state.focusedId,
    })),
  focusWindow: id =>
    set(state => {
      const nextZ = state.topZ + 1;
      return { topZ: nextZ, focusedId: id, windows: state.windows.map(w => (w.id === id ? { ...w, z: nextZ } : w)) };
    }),
  setFocusedId: id => set({ focusedId: id }),
  setDesktopSize: size => set({ desktopSize: size }),
}));
