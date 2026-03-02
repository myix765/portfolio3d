export const controls = { interact: ['KeyE'], escape: ['Escape'] } as const;

export const keyMap = Object.entries(controls).map(([name, keys]) => ({
  name,
  keys: [...keys],
}));
