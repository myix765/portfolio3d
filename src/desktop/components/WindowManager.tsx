import { useEffect, useRef, useState } from 'react';
import Window from './Window';
import { useWindowStore } from '../stores/windowStore';
import { windowConfig } from '../configs/windowConfig';

// minimum inset from WindowManager edges
const SPAWN_PADDING = 40;

const getRandomPosition = (desktopW: number, desktopH: number, width: number, height: number) => {
  const minX = SPAWN_PADDING;
  const maxX = desktopW - SPAWN_PADDING - width;
  const minY = SPAWN_PADDING;
  const maxY = desktopH - SPAWN_PADDING - height;

  return { x: Math.random() * Math.max(maxX - minX, 0) + minX, y: Math.random() * Math.max(maxY - minY, 0) + minY };
};

const WindowManager = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [desktopSize, setDesktopSize] = useState<{ width: number; height: number } | null>(null);

  const windows = useWindowStore(s => s.windows);
  const openWindow = useWindowStore(s => s.openWindow);
  const closeWindow = useWindowStore(s => s.closeWindow);
  const focusWindow = useWindowStore(s => s.focusWindow);

  // Set desktop size once the ref is available
  useEffect(() => {
    if (!desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    setDesktopSize({ width: rect.width, height: rect.height });
  }, []);

  // Spawn default open windows
  useEffect(() => {
    if (!desktopSize) return;

    windowConfig
      .filter(w => w.defaultOpen)
      .forEach((config, i) => {
        const pos = getRandomPosition(desktopSize.width, desktopSize.height, config.width, config.height);

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
  }, [desktopSize, openWindow]);

  return (
    <div ref={desktopRef} className='absolute left-0 right-0 bottom-27 top-9 z-10'>
      {desktopSize &&
        windows.map(w => {
          const config = windowConfig.find(c => c.id === w.id);
          if (!config || w.minimized) return null;
          const AppComponent = config.component;

          return (
            <Window
              key={w.id}
              header={config.title}
              initX={w.x}
              initY={w.y}
              initWidth={w.width}
              initHeight={w.height}
              bounds={desktopSize}
              desktopRef={desktopRef}
              z={w.z}
              onClose={() => closeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
            >
              <AppComponent />
            </Window>
          );
        })}
    </div>
  );
};

export default WindowManager;
