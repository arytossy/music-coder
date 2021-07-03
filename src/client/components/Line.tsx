import React, { ReactNode } from "react";
import Block from "./Block";

export default function Line(props: {
  blocks: {
    root: string;
    accidental: "" | "♯" | "♭";
    quality: string;
    base: {
        root: string;
        accidental: "" | "♯" | "♭";
    };
    lyrics: string;
  }[]
}) {

  const length = props.blocks.length;
  let elements: ReactNode[] = [];

  props.blocks.map((block, i) => {
    elements.push(
      <Block key={i}
        root={block.root}
        accidental={block.accidental}
        quality={block.quality}
        base={block.base}
        lyrics={block.lyrics}
      />
    );
    if (i + 1 < length) {
      elements.push(<div className="separator" key="i"></div>);
    }
  });

  return (
    <div className="line">{elements}</div>
  );
}