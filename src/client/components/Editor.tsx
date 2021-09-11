import React, { ChangeEventHandler, ForwardedRef, useState } from "react";
import ChordSnipets from "./ChordSnipets";
import "./Editor.css";

const Editor = React.forwardRef((
  props: {
    data: string,
    setData: (value: string) => void,
    onChange: ChangeEventHandler<HTMLTextAreaElement>
  },
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const [showSnipets, setShowSnipets] = useState(false);
  const [focusedBox, setFocusedBox] = useState<EventTarget & HTMLTextAreaElement | null>(null);

  function handleInsert(value: string): void {
    if (!focusedBox) return;
    const start = focusedBox.selectionStart;
    const end = focusedBox.selectionEnd;
    const old = focusedBox.value;
    props.setData(
      old.substring(0, start)
      + value
      + old.substring(end)
    );
    setTimeout(() => {
      focusedBox.setSelectionRange(start + value.length, start + value.length);
    }, 0);
  }

  return (
    <>
      <button id="show-snipets" onClick={() => setShowSnipets(!showSnipets)} onMouseDown={e=>e.preventDefault()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
          <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
        </svg>
      </button>
      <div id="editor-wrapper">
        <div id="dummy">{props.data}</div>
        <textarea id="editor"
          ref={ref}
          value={props.data}
          onChange={e => props.onChange(e)}
          onFocus={e => setFocusedBox(e.target)}
          onBlur={() => setFocusedBox(null)}
        />
      </div>
      {showSnipets ?
        <ChordSnipets
          onInsert={focusedBox ? ((val) => handleInsert(val)) : null}
          onClose={() => setShowSnipets(false)}
        />
        :
        null}
    </>
  );
});

export default Editor;