import { useState, useEffect } from 'react';

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
}

export const useCursor = (): CursorState => {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setCursorState(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
    };

    const handleMouseDown = (): void => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = (): void => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return cursorState;
};
