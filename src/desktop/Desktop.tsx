import Dock from './components/Dock';
import MenuBar from './components/MenuBar';

const Desktop = () => {
  return (
    <div className='w-480 h-273 bg-[url(/monet-poppy-fields-near-argenteuil.jpg)] bg-cover rounded-sm relative overflow-hidden'>
      <MenuBar />
      <Dock />
    </div>
  );
};

export default Desktop;
