import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout(props) {
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