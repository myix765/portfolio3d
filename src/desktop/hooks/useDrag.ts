import { useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { toLocalPoint } from '../utils/localPoint';

interface DragProps {
  bounds: { width: number; height: number };
  desktopRef: React.RefObject<HTMLDivElement | null>;
  getSize: () => { width: number; height: number };
  getPos: () => { x: number; y: number };
  onMove: (x: number, y: number) => void;
}

export function useDrag({ bounds, desktopRef, getSize, getPos, onMove }: DragProps) {
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const onMoveRef = useRef(onMove);
  const boundsRef = useRef(bounds);
  const getSizeRef = useRef(getSize);

  useLayoutEffect(() => {
    onMoveRef.current = onMove;
    boundsRef.current = bounds;
    getSizeRef.current = getSize;
  });

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!desktopRef.current) return;
      draggingRef.current = true;

      const rawX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const rawY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const { x, y } = toLocalPoint(desktopRef.current, rawX, rawY);
      const pos = getPos();
      offsetRef.current = { x: x - pos.x, y: y - pos.y };
    },
    [desktopRef, getPos],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current || !desktopRef.current) return;

      const rawX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const rawY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const { x, y } = toLocalPoint(desktopRef.current, rawX, rawY);

      const size = getSizeRef.current();
      const b = boundsRef.current;

      const newX = Math.max(0, Math.min(x - offsetRef.current.x, b.width - size.width));
      const newY = Math.max(0, Math.min(y - offsetRef.current.y, b.height - size.height));

      onMoveRef.current(newX, newY);
    };

    const onMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [desktopRef]);

  return { onMouseDown };
}
