import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import WindowManager from './components/windows/WindowManager';

const Desktop = () => {
  return (
    <div className='w-480 h-273 bg-[url(/wallpapers/monet-poppy-fields-near-argenteuil.jpg)] bg-cover rounded-sm relative overflow-hidden'>
      <MenuBar />
      <Dock />
      <WindowManager />
    </div>
  );
};

export default Desktop;
