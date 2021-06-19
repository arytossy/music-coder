import React from "react"

export default function Block(props) {
  return (
    <div className="block">
      <div className="chord">
        <span className="root">{props.root}</span>
        <span className="accidental">{props.accidental}</span>
        <span className="quality">{props.quality}</span>
        {props.base.root === "" ? null : <span className="slash">/</span>}
        <span className="base-root">{props.base.root}</span>
        <span className="base-accidental">{props.base.accidental}</span>
      </div>
      <div className="lyrics">
        {props.lyrics}
      </div>
    </div>
  );
}