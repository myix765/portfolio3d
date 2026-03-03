import type { ReactNode } from 'react';

const HudText = ({ position, children }: { position: string; children: ReactNode }) => {
  return <div className={`absolute ${position} z-100`}>{children}</div>;
};

export default HudText;
