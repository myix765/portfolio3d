import { useCallback, useRef, useEffect } from 'react';

interface DragProps {
  bounds: { width: number; height: number };
  getSize: () => { width: number; height: number };
  getPos: () => { x: number; y: number };
  onMove: (x: number, y: number) => void;
}

export function useDrag({ bounds, getSize, getPos, onMove }: DragProps) {
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      draggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const pos = getPos();
      offsetRef.current = { x: clientX - pos.x, y: clientY - pos.y };
    },
    [getPos],
  );

  const onMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const size = getSize();
      let newX = clientX - offsetRef.current.x;
      let newY = clientY - offsetRef.current.y;

      newX = Math.max(0, Math.min(newX, bounds.width - size.width));
      newY = Math.max(0, Math.min(newY, bounds.height - size.height));

      onMove(newX, newY);
    },
    [bounds, getSize, onMove],
  );

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
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
  }, [onMouseMove, onMouseUp]);

  return { onMouseDown };
}
