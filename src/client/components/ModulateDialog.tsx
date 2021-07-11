import React, { useState } from "react";
import { getModulateOffset, KeyTypeList, NoteList } from "../utils/utils";
import "./ModulateDialog.css";

export default function ModulateDialog(props: {
  originKey: string,
  onClose: () => void,
  onModulate: (offset: number) => void
}) {

  const [tonic, setTonic] = useState(props.originKey.split(" ")[0]);
  const [keyType, setKeyType] = useState(props.originKey.split(" ")[1]);

  function handleExecute() {
    const origin = {
      tonic: props.originKey.split(" ")[0],
      keyType: props.originKey.split(" ")[1]
    }
    const modulate = {
      tonic: tonic,
      keyType: keyType
    }
    props.onModulate(getModulateOffset(origin, modulate));
    props.onClose();
  }

  return (
    <div id="modulate-dialog-wrapper" onClick={(e) => {if (e.target === e.currentTarget) props.onClose()}}>
      <div id="modulate-dialog">
        <div id="modulate-dialog-header">
          <span className="title">転調設定</span>
          <span className="dismiss" onClick={() => props.onClose()}>×</span>
        </div>
        <div id="modulate-dialog-body">
          <p>{props.originKey}</p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </p>
          <p>
            <select value={tonic} onChange={(e) => setTonic(e.target.value)}>
              {NoteList.slice(7, 23).map((note) => {
                return (
                  <option key={note} value={note}>{note}</option>
                );
              })}
            </select>
            <select value={keyType} onChange={(e) => setKeyType(e.target.value)}>
              {KeyTypeList.map((keyType) => {
                return (
                  <option key={keyType} value={keyType}>{keyType}</option>
                );
              })}
            </select>
          </p>
        </div>
        <div id="modulate-dialog-footer">
          <button onClick={() => handleExecute()}>転調</button>
        </div>
      </div>
    </div>
  );

}