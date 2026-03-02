import type { FocusTargets } from '../../stores/useDeskStore';

export const objectBasePosition: [number, number, number] = [0, 0, 2.5];

// interact text positioning for each object
export const interactTextPosition: Record<FocusTargets, [number, number, number]> = { mac: [0, 1.012, 0.2] };
