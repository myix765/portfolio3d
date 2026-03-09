import { appConfig } from '../configs/appConfig';
import useClock from '../hooks/useClock';
import { useWindowStore } from '../stores/windowStore';

const MenuBar = () => {
  const { dateArr, time } = useClock();
  const focusedId = useWindowStore(s => s.focusedId);
  const focusedApp = appConfig.find(c => c.id === focusedId);

  return (
    <div
      className='w-full absolute top-0 z-50 px-3 py-1.5
      bg-[rgba(180,180,180,0.6)] shadow-glass backdrop-blur-md
      flex flex-nowrap justify-between'
    >
      <p>{focusedApp ? focusedApp.name : "Megan's Portfolio"}</p>
      {dateArr && time && (
        <span>
          {dateArr[0]} {dateArr[1]} {dateArr[2].replace(/^0+/, '')} {time}
        </span>
      )}
    </div>
  );
};

export default MenuBar;
