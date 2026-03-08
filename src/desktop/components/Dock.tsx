import { appConfig } from '../configs/appConfig';
import AppName from './AppName';

const Dock = () => {
  return (
    <div
      className='
      absolute bottom-2 left-1/2 -translate-x-1/2 z-50
      p-2.5 pb-4 rounded-3xl
      flex gap-x-4.5
      bg-[rgba(100,100,100,0.5)] shadow-glass backdrop-blur-md border border-[rgba(170,170,170,0.62)] outline outline-[rgba(50,50,50,0.62)]'
    >
      {appConfig.map(app => (
        <div className='relative group'>
          <div className='hidden group-hover:block'>
            <AppName name={app.name} />
          </div>
          <img key={app.id} src={app.icon} className='w-18 h-18 rounded-2xl' alt={app.name} />
        </div>
      ))}
    </div>
  );
};

export default Dock;
