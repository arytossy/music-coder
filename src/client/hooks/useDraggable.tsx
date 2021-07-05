import React, { CSSProperties, DOMAttributes, MouseEvent, Touch, TouchEvent, useState } from "react";

export default function useDraggable(initialPosition: {left: number, top: number}) {
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const [draggerTouch, setDraggerTouch] = useState<Touch | null>(null);
  const [position, setPosition] = useState(initialPosition);

  const wrapperStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: "100vw"
  }

  function handleStartMouseDrag(): void {
    setIsMouseDragging(true);
  }

  function handleStartTouchDrag(event: TouchEvent<HTMLElement>): void {
    const touches = event.touches;
    if (touches.length === 1) {
      setDraggerTouch(touches[0]);
    }
  }

  function handleMouseDragging(event: MouseEvent<HTMLElement>): void {
    if (!isMouseDragging) return;
    setPosition({
      left: position.left + event.movementX,
      top: position.top + event.movementY
    });
  }

  function handleTouchDragging(event: TouchEvent<HTMLElement>): void {
    if (!draggerTouch) return;
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === draggerTouch.identifier) {
        const movementX = touches[i].clientX - draggerTouch.clientX;
        const movementY = touches[i].clientY - draggerTouch.clientY;
        setPosition({
          left: position.left + movementX,
          top: position.top + movementY
        });
        setDraggerTouch(touches[i]);
        return;
      }
    }
  }
  function handleStopMouseDrag(): void {
    setIsMouseDragging(false);
  }

  function handleStopTouchDrag(event: TouchEvent<HTMLElement>): void {
    if (!draggerTouch) return;
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === draggerTouch.identifier) {
        setDraggerTouch(null);
        return;
      }
    }
  }

  const events: DOMAttributes<HTMLElement> = {
    onMouseDown: () => handleStartMouseDrag(),
    onTouchStart: (event) => {event.preventDefault(); handleStartTouchDrag(event);},
    onTouchMove: (event) => {event.preventDefault(); handleTouchDragging(event);},
    onTouchEnd: (event) => handleStopTouchDrag(event),
    onTouchCancel: (event) => handleStopTouchDrag(event)
  }

  const mouseDragWrapper = isMouseDragging ?
    <div
      style={wrapperStyle}
      onMouseMove={(event) => {event.preventDefault(); handleMouseDragging(event);}}
      onMouseUp={() => handleStopMouseDrag()}
      onMouseLeave={() => handleStopMouseDrag()}
    />
    :
    null;
  
  return [position, events, mouseDragWrapper] as const;
}