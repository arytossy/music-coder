import React from "react"
import { parse } from "../utils/utils";
import Line from "./Line";
import "./Score.css";

export default function Score(props: {
  data: string,
  offset: number,
  onSelectChord?: (start: number, end: number) => void
}) {

  const score = parse(props.data, props.offset, props.onSelectChord);
  
  return (
    <div id="score">
      {score.lines.map((line, i)=>{return(
        <Line
          key={i}
          blocks={line.blocks}
        />
      )})}
    </div>
  );
}