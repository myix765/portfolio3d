import type { ComponentType } from 'react';
import ProfileApp from '../apps/ProfileApp';

export interface WindowConfig {
  id: string;
  title: string;
  component: ComponentType;
  width: number;
  height: number;
  defaultOpen?: boolean;
}

export const windowConfig: WindowConfig[] = [
  { id: 'profile', title: 'Profile', component: ProfileApp, width: 896, height: 640, defaultOpen: true },
];
