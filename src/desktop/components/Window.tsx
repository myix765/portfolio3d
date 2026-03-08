import type { ReactNode, RefObject } from 'react';
import { useDrag } from '../hooks/useDrag';
import { useResize } from '../hooks/useResize';

interface WindowProps {
  header: string;
  children: ReactNode;
  initX: number;
  initY: number;
  initWidth: number;
  initHeight: number;
  bounds: { width: number; height: number };
  desktopRef: RefObject<HTMLDivElement | null>;
}

const Window = ({ header, children, initX, initY, initWidth, initHeight, bounds, desktopRef }: WindowProps) => {
  const {
    resizeState,
    resizeStateRef,
    setResizeState,
    handles,
    handleMouseDown: startResize,
  } = useResize(initWidth, initHeight, initX, initY, bounds, desktopRef);
  const { onMouseDown: startDrag } = useDrag({
    bounds,
    desktopRef,
    getSize: () => ({ width: resizeStateRef.current.width, height: resizeStateRef.current.height }),
    getPos: () => ({ x: resizeStateRef.current.left, y: resizeStateRef.current.top }),
    onMove: (x, y) => setResizeState(prev => ({ ...prev, left: x, top: y })),
  });

  return (
    <div
      className='absolute bg-white rounded-lg shadow-[0_36px_100px_0_rgba(0,0,0,0.4),0_0_3px_0_rgba(0,0,0,0.55)] overflow-visible'
      style={{ left: resizeState.left, top: resizeState.top, width: resizeState.width, height: resizeState.height }}
    >
      {handles.map(({ dir, style }) => (
        <div
          key={dir}
          className='absolute z-10'
          style={{ ...style, position: 'absolute' }}
          onMouseDown={e => startResize(e, dir)}
        />
      ))}

      <div
        className='flex items-center px-3 h-8 bg-gray-100 border-b border-gray-200 rounded-t-lg cursor-move select-none'
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <span className='text-sm font-medium text-gray-700 truncate'>{header}</span>
      </div>

      <div className='p-2 overflow-auto' style={{ height: 'calc(100% - 2rem)' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
