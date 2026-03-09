import { Html } from '@react-three/drei';
import type { ReactNode } from 'react';

const InteractText = ({
  children,
  position,
  visible,
}: {
  children: ReactNode;
  position: [number, number, number];
  visible: boolean;
}) => {
  return (
    <Html position={position} center pointerEvents='none'>
      <span
        className={`font-courier-prime whitespace-nowrap ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      >
        {children}
      </span>
    </Html>
  );
};

export default InteractText;
