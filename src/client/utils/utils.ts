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

export function parse(data: string): ScoreObject {
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
      const tmp3 = (tmp2[0].match(/^[+-]{0,2}[A-G]/) || [""])[0];
      return {
        root: (tmp3.match(/[A-G]$/) || [""])[0],
        accidental: transform((tmp3.match(/^[+-]{0,2}/) || [""])[0]),
        quality: tmp2[0].replace(tmp3, ""),
        base: {
          root: tmp2.length === 2 ? (tmp2[1].match(/[A-G]$/) || [""])[0] : "",
          accidental: tmp2.length === 2 ? transform((tmp2[1].match(/^[+-]{0,2}/) || [""])[0]) : ""
        },
        lyrics: tmp1[1]
      };
    });
    return {blocks: blocks};
  });
  return {lines: lines};
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