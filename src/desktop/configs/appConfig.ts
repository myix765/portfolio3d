import type { ComponentType } from 'react';
import profileIcon from '../assets/apps/profile-icon.png';
import ProfileApp from '../apps/ProfileApp';

export type AppIds = 'profile';

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
    width: 896,
    height: 640,
    defaultOpen: true,
  },
];
