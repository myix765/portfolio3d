import type { ComponentType } from 'react';
import ProfileApp from '../apps/ProfileApp';
import type { AppIds } from './appConfig';

export interface WindowConfig {
  id: AppIds;
  title: string;
  component: ComponentType;
  width: number;
  height: number;
  defaultOpen?: boolean;
}

export const windowConfig: WindowConfig[] = [
  { id: 'profile', title: 'Profile', component: ProfileApp, width: 896, height: 640, defaultOpen: true },
];
