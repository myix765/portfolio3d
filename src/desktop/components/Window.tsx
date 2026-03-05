import type { ReactNode } from 'react';
import useDraggable from '../hooks/useDraggable';

const Window = ({ children, initX, initY }: { children: ReactNode; initX: number; initY: number }) => {
  const { pos, handleRef, handleProps } = useDraggable(initX, initY);

  return (
    <div className='absolute w-4xl h-160 bg-amber-300 rounded-xl' style={{ left: pos.x, top: pos.y }}>
      <div ref={handleRef} {...handleProps} className='header w-full bg-amber-700'>
        header
      </div>
      {children}
    </div>
  );
};

export default Window;
