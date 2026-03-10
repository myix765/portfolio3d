import DndCatDemo from '../assets/apps/dndcat_demo.mp4';
import ProjectWindow from '../components/ProjectWindow';
import { appConfig } from '../configs/appConfig';

const DndCatApp = () => {
  const dndCatConfig = appConfig.find(app => app.id === 'dndcat');

  return (
    <ProjectWindow project={dndCatConfig?.name ?? ''} demoSrc={DndCatDemo} techStack={dndCatConfig?.techStack ?? []}>
      <div>
        <h2>Description:</h2>
        <p className='italic'>Built in January 2024</p>
        <p>
          Pomodoro timer but with a cat! When you work the cat sleeps, so don&apos;t get distracted and reach for your
          phone. If you do, you&apos;ll wake up the cat and it won&apos;t be happy! You&apos;ll get a cat punch
          reminding you to get back to work. <span className='font-semibold'>DO NOT DISTURB THE CAT!</span>
        </p>
      </div>
      <div>
        <h2>Development:</h2>
        <p>
          This app was built with Swift and the SwiftUI framework. To detect whether the user picks up the phone, I used
          the CoreMotion library to access gyroscope data and check if the phone was rapidly rotated, similar to the
          motion of a phone being picked up off a table. The app architecture follows the MVVM pattern.
        </p>
        <br />
        <p>All assets were drawn by me.</p>
      </div>
    </ProjectWindow>
  );
};

export default DndCatApp;
