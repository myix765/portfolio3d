// minimum inset from WindowManager edges
const SPAWN_PADDING = 20;

export const getRandomPosition = (desktopW: number, desktopH: number, width: number, height: number) => {
  const minX = SPAWN_PADDING;
  const maxX = desktopW - SPAWN_PADDING - width;
  const minY = SPAWN_PADDING;
  const maxY = desktopH - SPAWN_PADDING - height;

  return { x: Math.random() * Math.max(maxX - minX, 0) + minX, y: Math.random() * Math.max(maxY - minY, 0) + minY };
};
