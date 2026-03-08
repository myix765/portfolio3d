import profileIcon from '../assets/apps/profile-icon.png';

export type AppIds = 'profile';

interface AppConfig {
  id: AppIds;
  name: string;
  icon: string;
}

export const appConfig: AppConfig[] = [{ id: 'profile', name: 'Profile', icon: profileIcon }];
