import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import Window from './components/Window';

const Desktop = () => {
  return (
    <div className='w-480 h-273 bg-[url(/wallpapers/monet-poppy-fields-near-argenteuil.jpg)] bg-cover rounded-sm relative overflow-hidden'>
      <MenuBar />
      <Dock />
      <Window initX={200} initY={200} header='header'>
        hello
      </Window>
    </div>
  );
};

export default Desktop;
