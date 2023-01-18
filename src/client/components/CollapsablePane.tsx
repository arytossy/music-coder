import React, { PropsWithChildren, useState } from "react";

type Props = {
  id?: string,
};

export default function CollapsablePane(props: PropsWithChildren<Props>) {

  const [status, setStatus] = useState<"open" | "close">("open");

  return (
    <div id={props.id} className="collapsable-pane">
      <div className={`collapsable-pane-body ${status}`}>
        {props.children}
      </div>
      <div className="collapsable-pane-footer" onClick={() => setStatus(status === "open" ? "close" : "open")}>
        <div className={`collapsable-pane-icon ${status}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}