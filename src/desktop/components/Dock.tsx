import { appConfig } from '../configs/appConfig';
import { useWindowStore } from '../stores/windowStore';
import type { AppConfig } from '../configs/appConfig';
import AppName from './AppName';
import { getRandomPosition } from '../utils/getRandomPosition';

const Dock = () => {
  const windows = useWindowStore(s => s.windows);
  const openWindow = useWindowStore(s => s.openWindow);
  const focusWindow = useWindowStore(s => s.focusWindow);
  const desktopSize = useWindowStore(s => s.desktopSize);

  const handleAppClick = (app: AppConfig) => {
    const alreadyOpen = windows.some(w => w.id === app.id);
    if (alreadyOpen) {
      focusWindow(app.id);
      return;
    }
    const pos = desktopSize
      ? getRandomPosition(desktopSize.width, desktopSize.height, app.width, app.height)
      : { x: 100, y: 100 };
    openWindow({ id: app.id, x: pos.x, y: pos.y, width: app.width, height: app.height, minimized: false });
  };

  return (
    <div
      className='
      absolute bottom-2 left-1/2 -translate-x-1/2 z-50
      p-2.5 pb-1 rounded-3xl
      flex gap-x-4.5
      bg-[rgba(100,100,100,0.5)] shadow-glass backdrop-blur-md border border-[rgba(170,170,170,0.62)] outline outline-[rgba(50,50,50,0.62)]'
    >
      {appConfig.map(app => {
        const isOpen = windows.some(w => w.id === app.id && !w.minimized);
        return (
          <div key={app.id} onClick={() => handleAppClick(app)} className='relative group flex flex-col items-center'>
            <div className='hidden group-hover:block'>
              <AppName name={app.name} />
            </div>
            <button>
              <img src={app.icon} className='w-22 h-22 rounded-2xl' alt={app.name} />
            </button>
            <div
              className={`w-[0.3rem] h-[0.3rem] rounded-full bg-white mt-3 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
