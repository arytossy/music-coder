import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

type Props = {
  breadcrumb?: Array<{
    text: string,
    linkTo?: string
  }>,
  contextMenu?: Array<{
    text: string,
    level: "primary" | "secondary" | "danger",
    active: boolean,
    callback: () => void
  }>
}

export default function Layout(props: PropsWithChildren<Props>) {
  return (
    <div id="app">
      <header>
        <div id="breadcrumb">
          <Link to="/"><h1>コード譜置き場</h1></Link>
          {props.breadcrumb?.map(entry => (
            <div key={entry.text}>
              <span className="breadcrumb-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                </svg>
              </span>
              {entry.linkTo
                ? <Link to={entry.linkTo}><span className="breadcrumb-node">{entry.text}</span></Link>
                : <span className="breadcrumb-node">{entry.text}</span>
              }
            </div>
          ))}
        </div>
        <div id="context-menu">
          {props.contextMenu?.map(entry => (
            <button
              key={entry.text}
              className={entry.level}
              disabled={!entry.active}
              onClick={entry.callback}
            >{entry.text}</button>
          ))}
        </div>
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        <small>管理者: arytossy</small>
      </footer>
    </div>
  );
}
