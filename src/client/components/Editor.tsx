import React, { useRef, useState } from "react";
import AdjustablePane from "./AdjustablePane";
import Description from "./Description";
import Score from "./Score";
import Snipets from "./Snipets";

import "./Editor.css";

type Props = {
  title: string,
  musicKey: string,
  data: string,
  onChangeTitle: (val: string) => void,
  onChangeMusicKey: (val: string) => void,
  onChangeData: (val: string) => void,
}

export default function Editor(props: Props) {

  const [dataEntries, setDataEntries] = useState([props.data]);
  const [historyCursor, setHistoryCursor] = useState(0);
  const [changing, setChanging] = useState(false);
  const [focused, setFocused] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  const dataHistory = {

    add(val: string) {

      setChanging(false);

      if (val === this.getCurrent()) return;

      let entries = dataEntries.slice(historyCursor, historyCursor + 9);
      entries.unshift(val);

      setHistoryCursor(0);
      setDataEntries(entries);
    },

    getCurrent() {
      return dataEntries[historyCursor];
    },

    undo() {

      if (changing) {
        setChanging(false);
        return this.getCurrent();
      }

      let cursor = historyCursor;
      cursor++;

      const result = dataEntries[cursor] ?? null;
      if (result === null) {
        return false;
      } else {
        setHistoryCursor(cursor);
        return result;
      }
    },

    redo() {

      if (changing) {
        return false;
      }

      let cursor = historyCursor;
      cursor--;

      if (cursor < 0) {
        return false;
      }

      const result = dataEntries[cursor] ?? null;
      if (result === null) {
        return false;
      } else {
        setHistoryCursor(cursor);
        return result;
      }
    },
  };

  function changeData(val: string) {
    setChanging(true);
    props.onChangeData(val);
  }

  function insertFromSnipets(chord: string) {

    if (!focused || ref.current === null || chord === "") return;

    const word = `[${chord}]`;

    const old = ref.current.value;
    dataHistory.add(old);

    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;

    const updated =
      old.substring(0, start)
      + word
      + old.substring(end);

    ref.current.value = updated;
    ref.current.setSelectionRange(start, start + word.length);

    props.onChangeData(updated);
    dataHistory.add(updated);
  }

  function select(start: number, end: number) {
    if (ref.current === null) return;
    ref.current.focus();
    ref.current.setSelectionRange(start, end);
  }

  return (
    <div id="editor">

      <section id="left-panes">
        <div id="left-panes-body">

          <section id="input-pane">
            <div id="input-pane-body">
              <Description
                title={props.title}
                musicKey={props.musicKey}
                onChangeTitle={props.onChangeTitle}
                onChangeMusicKey={props.onChangeMusicKey}
              />
              <textarea id="data-input"
                value={props.data}
                ref={ref}
                onChange={(e) => dataHistory.add(e.currentTarget.value)}
                onInput={(e) => changeData(e.currentTarget.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
          </section>

          <AdjustablePane id="preview-pane" direction="north" initSize={300}>
            <div id="preview-pane-body">
              <h4>*** Preview ***</h4>
              <Score data={props.data} onSelectChord={select}/>
            </div>
          </AdjustablePane>
        </div>
      </section>

      <AdjustablePane id="snipets-pane" direction="west" initSize={400}>
        <div id="snipets-pane-body">
          <Snipets ready={focused} onInsert={insertFromSnipets} />
        </div>
      </AdjustablePane>

    </div>
  );
}
