import React, { ChangeEventHandler } from "react";
import "./Editor.css";

export default function Editor(props: {data: string, onChange: ChangeEventHandler<HTMLTextAreaElement>}) {
  return (
    <div id="editor-wrapper">
      <div id="dummy">{props.data}</div>
      <textarea id="editor"
        value={props.data}
        onChange={e => props.onChange(e)}
      />
    </div>
  );
}