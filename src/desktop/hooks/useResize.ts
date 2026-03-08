import { useState, useRef, useCallback, useEffect } from 'react';

type ResizeDirection = 'n' | 'e' | 's' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

interface ResizeState {
  width: number;
  height: number;
  top: number;
  left: number;
}

export const useResize = (
  initialWidth: number,
  initialHeight: number,
  initialX: number,
  initialY: number,
  bounds: { width: number; height: number } | null,
) => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    width: initialWidth,
    height: initialHeight,
    top: initialY,
    left: initialX,
  });

  const resizeDir = useRef<ResizeDirection>(null);
  const startMouse = useRef({ x: 0, y: 0 });
  const startSize = useRef<ResizeState>({ width: initialWidth, height: initialHeight, top: initialY, left: initialX });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeDir.current || !bounds) return;

      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      let { width, height, top, left } = startSize.current;

      if (resizeDir.current.includes('e')) width = Math.min(bounds.width - left, Math.max(100, width + dx));
      if (resizeDir.current.includes('s')) height = Math.min(bounds.height - top, Math.max(60, height + dy));
      if (resizeDir.current.includes('w')) {
        const rawWidth = startSize.current.width - dx;
        const clampedWidth = Math.max(100, Math.min(startSize.current.width + startSize.current.left, rawWidth));
        left = startSize.current.left + (startSize.current.width - clampedWidth);
        width = clampedWidth;
      }
      if (resizeDir.current.includes('n')) {
        const rawHeight = startSize.current.height - dy;
        const clampedHeight = Math.max(60, Math.min(startSize.current.height + startSize.current.top, rawHeight));
        top = startSize.current.top + (startSize.current.height - clampedHeight);
        height = clampedHeight;
      }

      setResizeState({ width, height, top, left });
    },
    [bounds],
  );

  const handleMouseUp = useCallback(() => {
    resizeDir.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDirection) => {
      e.stopPropagation();
      e.preventDefault();
      resizeDir.current = dir;
      startMouse.current = { x: e.clientX, y: e.clientY };
      startSize.current = { ...resizeState };
    },
    [resizeState],
  );

  const handles: { dir: ResizeDirection; style: React.CSSProperties }[] = [
    { dir: 'n', style: { top: -3, left: '10%', right: '10%', height: 6, cursor: 'n-resize' } },
    { dir: 's', style: { bottom: -3, left: '10%', right: '10%', height: 6, cursor: 's-resize' } },
    { dir: 'e', style: { right: -3, top: '10%', bottom: '10%', width: 6, cursor: 'e-resize' } },
    { dir: 'w', style: { left: -3, top: '10%', bottom: '10%', width: 6, cursor: 'w-resize' } },
    { dir: 'ne', style: { right: -3, top: -3, width: 12, height: 12, cursor: 'ne-resize' } },
    { dir: 'nw', style: { left: -3, top: -3, width: 12, height: 12, cursor: 'nw-resize' } },
    { dir: 'se', style: { right: -3, bottom: -3, width: 12, height: 12, cursor: 'se-resize' } },
    { dir: 'sw', style: { left: -3, bottom: -3, width: 12, height: 12, cursor: 'sw-resize' } },
  ];

  return { resizeState, setResizeState, handles, handleMouseDown };
};
