import React, { useState } from "react";
import NoteSelector from "./NoteSelector";

import "./Description.css";

type Props = {
  title: string,
  musicKey: string,
  onChangeTitle: (val: string) => void,
  onChangeMusicKey: (val: string) => void,
};

export default function Description(props: Props) {

  const [tonic, setTonic] = useState(props.musicKey.replace(/ (Major|minor)$/, ""));
  const [keyType, setKeyType] = useState(props.musicKey.replace(/^[+-]{0,2}[A-G] /, ""));

  function changeTonic(val: string) {
    if (tonic === val) return;
    setTonic(val);
    if (keyType !== null) props.onChangeMusicKey(`${val} ${keyType}`);
  }

  function changeKeyType(val: string) {
    if (keyType === val) return;
    setKeyType(val);
    if (tonic !== null) props.onChangeMusicKey(`${tonic} ${val}`);
  }

  return (
    <table id="description">
      <tbody>
        <tr>
          <th>タイトル：</th>
          <td>
            <input type="text" value={props.title}
              onChange={e => props.onChangeTitle(e.target.value)}/>
          </td>
        </tr>
        <tr>
          <th>調：</th>
          <td id="music-key-cell">
            <TonicSelector tonic={tonic} onChange={changeTonic} />
            <select id="key-type-selector"
              value={keyType}
              onChange={e => changeKeyType(e.target.value)}
            >
              <option value="Major">Major</option>
              <option value="minor">minor</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function TonicSelector(props: { tonic: string, onChange: (val: string) => void }) {

  const [preview, setPreview] = useState(props.tonic);
  const [open, setOpen] = useState(false);

  function cancel() {
    setPreview(props.tonic);
    setOpen(false);
  }

  function ok() {
    props.onChange(preview);
    setOpen(false);
  }

  return (
    <div id="tonic-selector">
      <input type="text" value={props.tonic} readOnly onClick={() => setOpen(!open)} />
      {open ?
        <div id="tonic-selector-tooltip">
          <NoteSelector note={props.tonic} onChangeNote={setPreview} />
          <div className="preview">{preview}</div>
          <div className="footer">
            <button className="secondary" onClick={cancel}>キャンセル</button>
            <button className="primary" onClick={ok}>OK</button>
          </div>
        </div>
      : null}
    </div>
  );
}
