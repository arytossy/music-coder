import React, { useState } from "react";

type Props = {
  level: "info" | "warn" | "error" | "success",
  message: string,
  timeout: null | number,
}

export default function NoticeBar(props: Props) {

  const [isShown, setIsShown] = useState(true);
  const [status, setStatus] = useState<"hidden" | "visible">("hidden");

  setTimeout(open, 100);

  function open() {
    setStatus("visible");
    if (props.timeout !== null) {
      setTimeout(hide, props.timeout);
    }
  }

  function hide() {
    setStatus("hidden");
    setTimeout(close, 5000);
  }

  function close() {
    setIsShown(false);
  }

  return (
    <>
      {isShown ?
        <div className={`notice-bar ${props.level} ${status}`}>
          <div className="message">{props.message}</div>
          <div className="close-icon"></div>
        </div>
      : null}
    </>
  );
}