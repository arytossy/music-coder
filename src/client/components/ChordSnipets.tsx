import React, { useState } from "react";
import useDraggable from "../hooks/useDraggable";
import { NoteList, QualityList } from "../utils/utils";
import "./ChordSnipets.css";

export default function ChordSnipets(props: {onInsert: ((value: string) => void) | null, onClose: () => void}) {
  const [position, events, wrapper] = useDraggable({left: 30, top: 30});
  const [root, setRoot] = useState("");
  const [quality, setQuality] = useState("");
  const [base, setBase] = useState("");

  return (
    <div id="chord-snipets" style={position} onMouseDown={(e) => e.preventDefault()}>
      <div id="chord-snipets-header">
        <div id="header-content" {...events}>Chord Snipets</div>
        <div id="dismiss" onClick={() => props.onClose()}>×</div>
      </div>
      <div id="chord-snipets-body">
        <fieldset>
          <legend>Root</legend>
          {NoteList.map((val) => {
            return (
              <button
                className={val === root ? "selected" : ""}
                key={val}
                onClick={() => setRoot(val)}>
                {val}
              </button>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>Quality</legend>
          {QualityList.map((val) => {
            return (
              <button
                className={val === quality ? "selected" : ""}
                key={val === "" ? "none" : val}
                onClick={() => setQuality(val)}>
                {val === "" ? "(none)" : val}
              </button>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>Base</legend>
          {["", ...NoteList].map((val) => {
            return (
              <button
                className={val === base ? "selected" : ""}
                key={`base_${val === "" ? "none" : val}`}
                onClick={() => setBase(val)}>
                {val === "" ? "(none)" : val}
              </button>
            );
          })}
        </fieldset>
      </div>
      <div id="chord-snipets-footer">
        <button
          disabled={props.onInsert ? false : true}
          onClick={() => {
            if (props.onInsert) {
              props.onInsert(`[${root}${quality}${base === "" ? "" : "/"+base}]`)
            }
          }}>
          INSERT
        </button>
      </div>
    {wrapper}
    </div>
  );
}