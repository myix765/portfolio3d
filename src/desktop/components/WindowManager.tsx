import { useEffect, useRef } from 'react';
import Window from './Window';
import { useWindowStore } from '../stores/windowStore';
import { windowConfig } from '../configs/windowConfig';

// minimum inset from WindowManager edges within which windows are allowed to spawn
const SPAWN_PADDING = 40;

const getRandomPosition = (desktopW: number, desktopH: number, width: number, height: number) => {
  const minX = SPAWN_PADDING;
  const maxX = desktopW - SPAWN_PADDING - width;

  const minY = SPAWN_PADDING;
  const maxY = desktopH - SPAWN_PADDING - height;

  // Clamp in case the window is larger than the available area
  const x = Math.random() * Math.max(maxX - minX, 0) + minX;
  const y = Math.random() * Math.max(maxY - minY, 0) + minY;

  return { x, y };
};

const WindowManager = () => {
  const ref = useRef<HTMLDivElement>(null);

  const windows = useWindowStore(s => s.windows);
  const openWindow = useWindowStore(s => s.openWindow);
  const focusWindow = useWindowStore(s => s.focusWindow);
  const closeWindow = useWindowStore(s => s.closeWindow);
  // const topZ = useWindowStore(s => s.topZ);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    windowConfig
      .filter(w => w.defaultOpen)
      .forEach((config, i) => {
        const pos = getRandomPosition(rect.width, rect.height, config.width, config.height);

        openWindow({
          id: config.id,
          x: pos.x,
          y: pos.y,
          width: config.width,
          height: config.height,
          z: i + 1,
          minimized: false,
        });
      });
  }, [openWindow]);

  return (
    <div ref={ref} className='absolute left-0 right-0 bottom-27 top-9 z-10 border border-amber-500'>
      {windows.map(w => {
        const config = windowConfig.find(c => c.id === w.id);
        if (!config || w.minimized) return null;
        const AppComponent = config.component;
        return (
          <Window
            key={w.id}
            header={config.title}
            initX={w.x}
            initY={w.y}
            width={w.width}
            height={w.height}
            zIndex={w.z}
            focus={() => focusWindow(w.id)}
            close={() => closeWindow(w.id)}
          >
            <AppComponent />
          </Window>
        );
      })}
    </div>
  );
};

export default WindowManager;
