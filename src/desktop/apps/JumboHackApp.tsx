import ProjectWindow from '../components/ProjectWindow';
import { appConfig } from '../configs/appConfig';
import JumboHackDemo from '../assets/apps/jumbohack_demo.mp4';

const JumboHackApp = () => {
  const jumboHackConfig = appConfig.find(app => app.id === 'jumbohack');

  return (
    <ProjectWindow
      project={jumboHackConfig?.name ?? ''}
      demoSrc={JumboHackDemo}
      link='https://jumbohack.org/'
      techStack={jumboHackConfig?.techStack ?? []}
      isVert
    >
      <div>
        <h2>Description:</h2>
        <p className='italic'>Built over the 2025-2026 school year</p>
        <p>
          This site was built for JumboHack, a hackathon held at Tufts University, to provide info about the hackathon
          and allow people to register.
        </p>
      </div>
      <div>
        <h2>Development:</h2>
        <p>
          I built this website as the JumboHack team's tech lead. The website design was based on our hackathon theme of
          "Detective", and all the designs came from our team's amazing designer &#10084;. The animations were all
          custom made by me.
        </p>
        <br />
        <p>The website is built using Next.js and TailwindCSS for styling, and deployed using Cloudflare workers.</p>
      </div>
    </ProjectWindow>
  );
};

export default JumboHackApp;
