import { useEffect, useRef } from 'react';
import Window from './Window';
import { useWindowStore } from '../../stores/windowStore';
import { appConfig } from '../../configs/appConfig';
import { getRandomPosition } from '../../utils/getRandomPosition';

const WindowManager = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const desktopSize = useWindowStore(s => s.desktopSize);
  const setDesktopSize = useWindowStore(s => s.setDesktopSize);

  const windows = useWindowStore(s => s.windows);
  const openWindow = useWindowStore(s => s.openWindow);
  const closeWindow = useWindowStore(s => s.closeWindow);
  const focusWindow = useWindowStore(s => s.focusWindow);
  const setFocusedId = useWindowStore(s => s.setFocusedId);

  // Set desktop size once the ref is available
  useEffect(() => {
    if (!desktopRef.current) return;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDesktopSize({ width, height });
      }
    });

    observer.observe(desktopRef.current);
    return () => observer.disconnect();
  }, [setDesktopSize]);

  // Spawn default open windows
  useEffect(() => {
    if (!desktopSize) return;

    appConfig
      .filter(w => w.defaultOpen)
      .forEach(config => {
        const pos = getRandomPosition(desktopSize.width, desktopSize.height, config.width, config.height);

        openWindow({ id: config.id, x: pos.x, y: pos.y, width: config.width, height: config.height, minimized: false });
      });
  }, [desktopSize, openWindow]);

  return (
    <div
      ref={desktopRef}
      onMouseDown={e => {
        if (e.target === e.currentTarget) setFocusedId(null);
      }}
      className='absolute left-0 right-0 bottom-32.5 top-11 z-10'
    >
      {desktopSize &&
        windows.map(w => {
          const config = appConfig.find(c => c.id === w.id);
          if (!config || w.minimized) return null;
          const AppComponent = config.component;

          return (
            <Window
              key={w.id}
              header={config.name}
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
