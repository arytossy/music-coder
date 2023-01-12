import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

type Props = {
  breadcrumb: Array<{ text: string, linkTo?: string }>,
  contextMenu: Array<{ text: string, level: "primary" | "secondary" | "danger" }>
}

export default function Layout(props: {children: ReactNode}) {
  return (
    <div id="app">
      <header>
        <Link to="/"><h1>コード譜置き場</h1></Link>
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