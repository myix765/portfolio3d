import type { ComponentType } from 'react';
import { profileIcon, dndCatIcon, jumboHackIcon } from './appIcons';
import ProfileApp from '../apps/ProfileApp';
// import portfolioIcon from '../assets/apps/portfolio_icon.png';
// import PortfolioApp from '../apps/PortfolioApp';
import DndCatApp from '../apps/DndCatApp';
import JumboHackApp from '../apps/JumboHackApp';

export type AppIds = 'profile' | 'portfolio' | 'dndcat' | 'jumbohack';

export interface AppConfig {
  id: AppIds;
  name: string;
  icon: string;
  component: ComponentType;
  techStack?: string[];
  width: number;
  height: number;
  defaultOpen?: boolean;
}

export const appConfig: AppConfig[] = [
  {
    id: 'profile',
    name: 'Profile',
    icon: profileIcon,
    component: ProfileApp,
    width: 1080,
    height: 750,
    defaultOpen: true,
  },
  // {
  //   id: 'portfolio',
  //   name: 'Portfolio',
  //   icon: portfolioIcon,
  //   component: PortfolioApp,
  //   width: 1080,
  //   height: 720,
  //   defaultOpen: false,
  // },
  {
    id: 'dndcat',
    name: 'Do Not Disturb The Cat',
    icon: dndCatIcon,
    component: DndCatApp,
    techStack: ['Swift'],
    width: 1000,
    height: 600,
    defaultOpen: false,
  },
  {
    id: 'jumbohack',
    name: 'JumboHack 2026',
    icon: jumboHackIcon,
    component: JumboHackApp,
    techStack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    width: 750,
    height: 880,
    defaultOpen: false,
  },
];
