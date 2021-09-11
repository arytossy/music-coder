type AccidentalSymbols = "" | "♯" | "♭" | "𝄪" | "𝄫"

export type ScoreBlock = {
  root: string;
  accidental: AccidentalSymbols;
  quality: string;
  base: {
      root: string;
      accidental: AccidentalSymbols;
  };
  lyrics: string;
  handler?: () => void
}

export type ScoreLine = {blocks: ScoreBlock[]};

export type ScoreObject = {lines: ScoreLine[]};

export function transform(accidental: string): AccidentalSymbols {
  if (accidental === "+") return "♯";
  if (accidental === "-") return "♭";
  if (accidental === "++") return "𝄪";
  if (accidental === "--") return "𝄫";
  return "";
}

export function parse(
  data: string,
  offset: number,
  handler?: (start: number, end: number) => void
): ScoreObject {
  let cursor = 0;
  const strLines = data.split("\n");
  const lines = strLines.map((strLine) => {
    const strBlocks = strLine.split("[");
    if (strBlocks[0] === "") {
      strBlocks.shift();
    } else {
      strBlocks[0] = "]" + strBlocks[0];
      cursor -= 2;
    }
    const blocks = strBlocks.map((strBlock) => {
      const $fullChord$lyrics = strBlock.split("]");
      const $chord$base = $fullChord$lyrics[0].split("/");
      let note = ($chord$base[0].match(/^[+-]{0,2}[A-G]/) || [""])[0];
      const quality = $chord$base[0].replace(note, "");
      let base = $chord$base[1] ? $chord$base[1] : "";
      note = modulate(note, offset);
      base = modulate(base, offset);
      const currentCursor = cursor;
      const block = {
        root: (note.match(/[A-G]$/) || [""])[0],
        accidental: transform((note.match(/^[+-]{0,2}/) || [""])[0]),
        quality: quality,
        base: {
          root: (base.match(/[A-G]$/) || [""])[0],
          accidental: transform((base.match(/^[+-]{0,2}/) || [""])[0])
        },
        lyrics: $fullChord$lyrics[1],
        handler: handler ?
          () => handler(currentCursor, currentCursor + $fullChord$lyrics[0].length + 2) :
          undefined
      };
      cursor += strBlock.length + 1;
      return block;
    });
    cursor++;
    return {blocks: blocks};
  });
  return {lines: lines};
}

export function getModulateOffset(
  origin: {tonic: string, keyType: string},
  modulate: {tonic: string, keyType: string}
) {
  const tonicOffset = 
  NoteList.indexOf(modulate.tonic as typeof NoteList[number]) -
  NoteList.indexOf(origin.tonic as typeof NoteList[number]);

  const keyTypeOffset = 
    origin.keyType === modulate.keyType ?
      0 :
      origin.keyType === "Major" ?
        -3 :
        3

  return tonicOffset + keyTypeOffset;
}

function modulate(note: string, offset: number) {
  if (note === "") return "";
  const originIndex = NoteList.indexOf(note as typeof NoteList[number]);
  return NoteList[originIndex + offset];
}

export const NoteList = [
  "--G",
  "--D",
  "--A",
  "--E",
  "--B",
  "-F",
  "-C",
  "-G",
  "-D",
  "-A",
  "-E",
  "-B",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "+F",
  "+C",
  "+G",
  "+D",
  "+A",
  "+E",
  "+B",
  "++F",
  "++C",
  "++G",
  "++D",
  "++A"
] as const

export const KeyTypeList = ["Major", "minor"] as const

export const QualityList = [
  "",
  "m",
  "7",
  "m7",
  "M7",
  "mM7",
  "add9",
  "sus4",
  "7-5",
  "dim",
  "dim7",
  "arg"
]