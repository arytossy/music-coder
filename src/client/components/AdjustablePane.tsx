import React, { HTMLAttributes, MouseEvent, PropsWithChildren, Touch, TouchEvent, useRef, useState } from "react";

import "./AdjustablePane.css";

type Props = {
  id?: string,
  direction: "north" | "east" | "south" | "west",
  initSize: number,
};

export default function AdjustablePane(props: PropsWithChildren<Props>) {

  const [isHold, setIsHold] = useState(false);
  const [touch, setTouch] = useState<null | Touch>(null);
  const [startFrom, setStartFrom] = useState(0);
  const [adjustFrom, setAdjustFrom] = useState(0);
  const [size, setSize] = useState(props.initSize);
  const ref = useRef<HTMLDivElement>(null);

  function hold(event: MouseEvent) {

    event.preventDefault();

    if (ref.current === null) return;

    setIsHold(true);

    switch (props.direction) {

      case "north":
      case "south":
        setStartFrom(event.clientY);
        setAdjustFrom(ref.current.clientHeight);
        break;

      case "east":
      case "west":
        setStartFrom(event.clientX);
        setAdjustFrom(ref.current.clientWidth);
        break;
    }
  }

  function holdWithTouch(event: TouchEvent) {

    event.preventDefault();

    if (ref.current === null) return;
    if (event.touches.length !== 1) return;

    const tmp = event.touches[0];
    setTouch(tmp);

    switch (props.direction) {

      case "north":
      case "south":
        setStartFrom(tmp.clientY);
        setAdjustFrom(ref.current.clientHeight);
        break;

      case "east":
      case "west":
        setStartFrom(tmp.clientX);
        setAdjustFrom(ref.current.clientWidth);
        break;
    }
  }

  function adjust(event: MouseEvent) {

    event.preventDefault();

    if (!isHold) return;

    switch (props.direction) {

      case "north":
        setSize(adjustFrom - (event.clientY - startFrom));
        break;
      case "south":
        setSize(adjustFrom + (event.clientY - startFrom));
        break;
      case "east":
        setSize(adjustFrom + (event.clientX - startFrom));
        break;
      case "west":
        setSize(adjustFrom - (event.clientX - startFrom));
        break;
    }
  }

  function adjustWithTouch(event: TouchEvent) {

    event.preventDefault();

    if (!touch) return;
    let tmp: null | Touch = null;
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier === touch.identifier) {
        tmp = event.changedTouches[i];
        break;
      }
    }
    if (tmp === null) return;

    switch (props.direction) {

      case "north":
        setSize(adjustFrom - (tmp.clientY - startFrom));
        break;
      case "south":
        setSize(adjustFrom + (tmp.clientY - startFrom));
        break;
      case "east":
        setSize(adjustFrom + (tmp.clientX - startFrom));
        break;
      case "west":
        setSize(adjustFrom - (tmp.clientX - startFrom));
        break;
    }
  }

  function release(event: MouseEvent) {
    event.preventDefault();
    setIsHold(false);
  }

  function releaseWithTouch(event: TouchEvent) {
    event.preventDefault();
    if (touch === null) return;
    for (let i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier === touch.identifier) {
        setTouch(null);
      }
    }
  }

  let attributes: HTMLAttributes<HTMLDivElement> = {};
  attributes.className = `adjustable-pane ${props.direction}`;
  if (props.id) {
    attributes.id = props.id;
  }
  switch (props.direction) {
    case "north":
    case "south":
      attributes.style = { height: size };
      break;
    case "east":
    case "west":
      attributes.style = { width: size };
      break;
  }

  const adjuster = (
    <div
      className={`adjuster ${props.direction}`}
      onMouseDown={hold}
      onTouchStart={holdWithTouch}
      onTouchMove={adjustWithTouch}
      onTouchEnd={releaseWithTouch}
      onTouchCancel={releaseWithTouch}
    />
  );

  const body = <div className="adjustable-pane-body">{props.children}</div>

  let content = <></>;
  switch (props.direction) {
    case "north":
    case "west":
      content = <>{adjuster}{body}</>;
      break;
    case "south":
    case "east":
      content = <>{body}{adjuster}</>;
      break;
  }

  return (
    <div { ...attributes } ref={ref} >
      {content}
      {isHold ?
        <div
          id="drag-wrapper"
          className={props.direction}
          onMouseMove={adjust}
          onMouseUp={release}
          onMouseLeave={release}
        />
      : null}
    </div>
  );
}
