import React from "react"
import Line from "./Line";
import "./Score.css";

export default function Score(props) {

  function transform(accidental) {
    if (accidental === "+") return "♯";
    if (accidental === "-") return "♭";
    return "";
  }

  function parse(data) {
    const strLines = data.split("\n");
    const lines = strLines.map((strLine) => {
      const strBlocks = strLine.split("[");
      if (strBlocks[0] === "") {
        strBlocks.shift();
      } else {
        strBlocks[0] = "]" + strBlocks[0];
      }
      const blocks = strBlocks.map((strBlock) => {
        const tmp1 = strBlock.split("]");
        const tmp2 = tmp1[0].split("/");
        const tmp3 = (tmp2[0].match(/^[A-G][+-]?/) || [""])[0];
        return {
          root: tmp3.charAt(0),
          accidental: transform(tmp3.charAt(1)),
          quality: tmp2[0].replace(tmp3, ""),
          base: {
            root: tmp2.length === 2 ? tmp2[1].charAt(0) : "",
            accidental: tmp2.length === 2 ? transform(tmp2[1].charAt(1)) : ""
          },
          lyrics: tmp1[1]
        };
      });
      return {blocks: blocks};
    });
    return {lines: lines};
  }

  const score = parse(props.data);
  
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