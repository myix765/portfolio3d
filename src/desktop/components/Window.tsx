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
  z: number;
  onClose: () => void;
  onFocus: () => void;
}

const Window = ({
  header,
  children,
  initX,
  initY,
  initWidth,
  initHeight,
  bounds,
  desktopRef,
  z,
  onClose,
  onFocus,
}: WindowProps) => {
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
      className='absolute bg-white rounded-lg shadow-[0_36px_100px_0_rgba(0,0,0,0.4),0_0_3px_0_rgba(0,0,0,0.55)] overflow-clip'
      style={{
        left: resizeState.left,
        top: resizeState.top,
        width: resizeState.width,
        height: resizeState.height,
        zIndex: z,
      }}
      onMouseDown={onFocus}
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
        className='flex items-center px-4 h-9 bg-neutral-300 cursor-move select-none'
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <div className='flex flex-1 gap-2 items-center'>
          <button
            className='bg-red-500 border border-red-700 w-3.5 h-3.5 rounded-full'
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
          />
          <button className='bg-yellow-500 border border-yellow-600 w-3.5 h-3.5 rounded-full' />
          <button className='bg-green-500 border border-green-700 w-3.5 h-3.5 rounded-full' />
        </div>
        <span className='truncate'>{header}</span>
        <div className='flex-1' />
      </div>

      <div className='h-full p-4 overflow-auto'>{children}</div>
    </div>
  );
};

export default Window;
