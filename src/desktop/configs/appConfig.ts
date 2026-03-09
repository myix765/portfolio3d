import type { ComponentType } from 'react';
import profileIcon from '../assets/apps/profile_icon.png';
import portfolioIcon from '../assets/apps/portfolio_icon.png';
import ProfileApp from '../apps/ProfileApp';
import PortfolioApp from '../apps/PortfolioApp';

export type AppIds = 'profile' | 'portfolio';

export interface AppConfig {
  id: AppIds;
  name: string;
  icon: string;
  component: ComponentType;
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
  {
    id: 'portfolio',
    name: 'Portfolio',
    icon: portfolioIcon,
    component: PortfolioApp,
    width: 1080,
    height: 720,
    defaultOpen: false,
  },
];
