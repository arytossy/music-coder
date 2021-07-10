import React, { ReactNode } from "react";
import { ScoreLine } from "../utils/utils";
import Block from "./Block";

export default function Line(props: ScoreLine) {

  const length = props.blocks.length;
  let elements: ReactNode[] = [];

  props.blocks.map((block, i) => {
    elements.push(
      <Block key={`block_${i}`}
        root={block.root}
        accidental={block.accidental}
        quality={block.quality}
        base={block.base}
        lyrics={block.lyrics}
      />
    );
    if (i + 1 < length) {
      elements.push(<div className="separator" key={`separator_${i}`}></div>);
    }
  });

  return (
    <div className="line">{elements}</div>
  );
}