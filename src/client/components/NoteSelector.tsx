import React, { useEffect, useState } from "react";

import "./NoteSelector.css";

type Props = {
  note: null | string,
  onChangeNote: (val: string) => void,
}

export default function NoteSelector(props: Props) {

  const [natural, setNatural] = useState(props.note?.replace(/^[+-]{0,2}/, "") ?? null);
  const [accidental, setAccidental] = useState(props.note?.replace(/[A-G]$/, "") ?? null);

  useEffect(() => {
    if (props.note === null) {
      setNatural(null);
      setAccidental(null);
    } else {
      const matches = props.note.match(/^([+-]{0,2})([A-G])$/);
      if (matches !== null) {
        setAccidental(matches[1]);
        setNatural(matches[2]);
      }
    }
  }, [props.note])

  type Natural = "C" | "D" | "E" | "F" | "G" | "A" | "B";
  type Accidental = "--" | "-" | "" | "+" | "++";

  const naturalList: Natural[] = [
    "C", "D", "E", "F", "G", "A", "B"
  ];

  const accidentalList: Accidental[] = [
    "--", "-", "", "+", "++"
  ];

  function selectNatural(val: Natural) {
    if (natural === val) return;
    setNatural(val);
    if (accidental === null) {
      setAccidental("");
      props.onChangeNote(`${""}${val}`);
    } else {
      props.onChangeNote(`${accidental}${val}`);
    }
  }

  function selectAccidental(val: Accidental) {
    if (accidental === val) return;
    setAccidental(val);
    if (natural !== null) props.onChangeNote(`${val}${natural}`);
  }

  function getSymbol(code: Accidental) {
    if (code === "--") return "𝄫";
    if (code === "-") return "♭";
    if (code === "") return "(♮)";
    if (code === "+") return "♯";
    if (code === "++") return "𝄪";
    return "";
  }

  return (
    <div className="note-selector">

      {accidentalList.map(entry => (
        <button
          key={entry}
          className={entry === accidental ? "primary" : "secondary"}
          onClick={() => selectAccidental(entry)}
        >{getSymbol(entry)}</button>
      ))}

      <br />

      {naturalList.map(entry => (
        <button
          key={entry}
          className={entry === natural ? "primary" : "secondary"}
          onClick={() => selectNatural(entry)}
        >{entry}</button>
      ))}

    </div>
  )
}
