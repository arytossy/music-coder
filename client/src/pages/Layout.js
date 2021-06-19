import React from "react";

export default function Layout(props) {
  return (
    <div id="app">
      <header>
        <h2>コード譜置き場</h2>
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