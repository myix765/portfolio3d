import type { ComponentType } from 'react';
import profileIcon from '../assets/apps/profile_icon.png';
import ProfileApp from '../apps/ProfileApp';
// import portfolioIcon from '../assets/apps/portfolio_icon.png';
// import PortfolioApp from '../apps/PortfolioApp';
import dndCatIcon from '../assets/apps/dndcat_app_icon.png';
import DndCatApp from '../apps/DndCatApp';

export type AppIds = 'profile' | 'portfolio' | 'dndcat';

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
    height: 720,
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
    width: 960,
    height: 720,
    defaultOpen: false,
  },
];
