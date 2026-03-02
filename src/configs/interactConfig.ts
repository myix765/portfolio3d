export const controls = { interact: ['KeyE'] } as const;

export const keyMap = Object.entries(controls).map(([name, keys]) => ({
  name,
  keys: [...keys],
}));
