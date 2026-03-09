import DndCatDemo from '../assets/apps/dndcat_demo.mp4';
import SkillsSection from '../components/SkillsSection';
import { appConfig } from '../configs/appConfig';

const DndCatApp = () => {
  const dndCatConfig = appConfig.find(app => app.id === 'dndcat');

  return (
    <div className='h-full p-4 flex gap-x-4'>
      <video autoPlay muted loop className='h-full'>
        <source src={DndCatDemo} type='video/mp4' />
      </video>
      <div className='h-full overflow-scroll'>
        <h1>Do Not Disturb The Cat</h1>
        <SkillsSection skills={dndCatConfig?.techStack ?? []} />
      </div>
    </div>
  );
};

export default DndCatApp;
