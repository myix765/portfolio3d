import type { ReactNode } from 'react';
import SkillsSection from './SkillsSection';

interface ProjectWindowProps {
  project: string;
  demoSrc: string;
  link?: string;
  techStack: string[];
  isVert?: boolean;
  children: ReactNode;
}

const ProjectWindow = ({ project, demoSrc, link, techStack, isVert = false, children }: ProjectWindowProps) => {
  return (
    <div className={`h-full p-4 flex ${isVert ? 'flex-col items-center' : ''} gap-4`}>
      <video autoPlay muted loop controls controlsList='nodownload' className='h-full max-w-180'>
        <source src={demoSrc} type='video/mp4' />
      </video>
      <div className='h-full w-full flex flex-col gap-y-4 overflow-scroll'>
        <h1>{project}</h1>
        <SkillsSection skills={techStack} />
        {link && <a href={link} target='_blank' rel='noopener noreferrer' />}
        {children}
      </div>
    </div>
  );
};

export default ProjectWindow;
