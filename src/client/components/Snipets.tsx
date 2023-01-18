import React, { useEffect, useState } from "react";
import NoteSelector from "./NoteSelector";

import "./Snipets.css";

type Props = {
  ready: boolean,
  onInsert: (chord: string) => void,
};

export default function Snipets(props: Props) {

  const [root, setRoot] = useState("C");
  const [quality, setQuality] = useState("");
  const [base, setBase] = useState<null | string>(null);

  function insert() {
    if (base === null) {
      props.onInsert(`${root}${quality}`);
    } else {
      props.onInsert(`${root}${quality}/${base}`);
    }
  }

  return (
    <div id="snipets" onMouseDown={event => event.preventDefault()}>

      <section id="snipets-body">

        <section id="snipets-root">
          <h5>--- root ---</h5>
          <NoteSelector note={root} onChangeNote={setRoot} />
        </section>

        <section id="snipets-quality">
          <h5>--- quality ---</h5>
          <button className="none-button" onClick={() => setQuality("")}>(none)</button>
          <br />
          <QualitySelector quality={quality} onChange={setQuality} />
        </section>

        <section id="snipets-base">
          <h5>--- base ---</h5>
          <button className="none-button" onClick={() => setBase(null)}>(none)</button>
          <br />
          <NoteSelector note={base} onChangeNote={setBase} />
        </section>

      </section>

      <div className="separator"></div>

      <section id="snipets-footer">
        <div className="preview">
          {base === null ? `${root}${quality}` : `${root}${quality} / ${base}`}
        </div>
        <div className="insert-button">
          <button className="primary" disabled={!props.ready} onClick={insert}>INSERT</button>
        </div>
      </section>
    </div>
  )
}

function QualitySelector(props: { quality: string, onChange: (val: string) => void }) {

  type Triad = "" | "m" | "dim" | "aug";
  type Addition = "" | "7" | "M7" | "9" | "11" | "13";
  type Alter = "add9" | "sus4" | "-5";
  type AlterList = Array<{ code: Alter, display: string, active: boolean }>;

  const initial: { triad: Triad, addition: Addition, alters: AlterList } = {
    triad: "",
    addition: "",
    alters: [
      { code: "add9", display: "add9", active: false },
      { code: "sus4", display: "sus4", active: false },
      { code: "-5", display: "♭5", active: false },
    ],
  };

  const [triad, setTriad] = useState<Triad>(initial.triad);
  const [addition, setAddition] = useState<Addition>(initial.addition);
  const [alters, setAlters] = useState(initial.alters);

  useEffect(() => {

    const matches = props.quality.match(/^(|m|dim|aug)(|7|M7|9|11|13)((add9|sus4|-5)*)$/);

    if (matches !== null) {

      setTriad(matches[1] as Triad);
      setAddition(matches[2] as Addition);

      const alterMatches = matches[3].match(/add9|sus4|-5/g);
      const tmp = alters.slice();
      tmp.forEach(entry => {
        if (alterMatches === null) {
          entry.active = false;
        } else {
          entry.active = alterMatches.includes(entry.code);
        }
      });
      setAlters(tmp);
    }
  }, [props.quality]);

  const triadList: Array<{ code: Triad, display: string }> = [
    { code: "", display: "(M)" },
    { code: "m", display: "m" },
    { code: "dim", display: "dim" },
    { code: "aug", display: "aug" },
  ];

  const additionList: Array<{ code: Addition, display: string }> = [
    { code: "7", display: "7" },
    { code: "M7", display: "M7" },
    { code: "9", display: "9" },
    { code: "11", display: "11" },
    { code: "13", display: "13" },
  ];

  function makeAlter(alters: AlterList) {
    let result = "";
    alters.forEach(entry => {
      if (entry.active) result += entry.code;
    });
    return result;
  }

  function changeTriad(val: Triad) {
    if (triad === val) return;
    setTriad(val);
    props.onChange(`${val}${addition}${makeAlter(alters)}`);
  }

  function changeAddition(val: Addition) {
    if (addition === val) {
      setAddition("");
      props.onChange(`${triad}${""}${makeAlter(alters)}`);
    } else {
      setAddition(val);
      props.onChange(`${triad}${val}${makeAlter(alters)}`);
    }
  }

  function changeAlter(val: Alter) {
    const tmp = alters.slice();
    tmp.forEach(entry => {
      if (entry.code === val) {
        entry.active = !entry.active;
      }
    });
    setAlters(tmp);
    props.onChange(`${triad}${addition}${makeAlter(tmp)}`);
  }

  return (
    <div className="quality-selector">

      {triadList.map(entry => (
        <button
          key={entry.code}
          className={entry.code === triad ? "primary" : "secondary"}
          onClick={() => changeTriad(entry.code)}
        >{entry.display}</button>
      ))}

      <br />

      {additionList.map(entry => (
        <button
          key={entry.code}
          className={entry.code === addition ? "primary" : "secondary"}
          onClick={() => changeAddition(entry.code)}
        >{entry.display}</button>
      ))}

      <br />

      {alters.map(entry => (
        <button
          key={entry.code}
          className={entry.active ? "primary" : "secondary"}
          onClick={() => changeAlter(entry.code)}
        >{entry.display}</button>
      ))}

    </div>
  )
}
