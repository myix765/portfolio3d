import type { ReactNode } from 'react';
import SkillsSection from './SkillsSection';

interface ProjectWindowProps {
  project: string;
  demoSrc: string;
  techStack: string[];
  children: ReactNode;
}

const ProjectWindow = ({ project, demoSrc, techStack, children }: ProjectWindowProps) => {
  return (
    <div className='h-full p-4 flex gap-x-4'>
      <video autoPlay muted loop controls controlsList='nodownload' className='h-full'>
        <source src={demoSrc} type='video/mp4' />
      </video>
      <div className='h-full flex flex-col gap-y-4 overflow-scroll'>
        <h1>{project}</h1>
        <SkillsSection skills={techStack} />
        {children}
      </div>
    </div>
  );
};

export default ProjectWindow;
