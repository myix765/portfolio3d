import { useCallback, useRef, useState } from 'react';

interface DragState {
  startPointerX: number;
  startPointerY: number;
  startWinX: number;
  startWinY: number;
}

const useDraggable = (initX = 0, initY = 0) => {
  const [pos, setPos] = useState({ x: initX, y: initY });
  const dragState = useRef<DragState | null>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      handleRef.current?.setPointerCapture(e.pointerId);
      dragState.current = { startPointerX: e.clientX, startPointerY: e.clientY, startWinX: pos.x, startWinY: pos.y };
    },
    [pos],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!dragState.current) return;
    setPos({
      x: dragState.current.startWinX + (e.clientX - dragState.current.startPointerX),
      y: dragState.current.startWinY + (e.clientY - dragState.current.startPointerY),
    });
  }, []);

  const onPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  return { pos, handleRef, handleProps: { onPointerDown, onPointerMove, onPointerUp } };
};

export default useDraggable;
