import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import Editor from "../components/Editor";
import Score from "../components/Score";
import { KeyTypeList, NoteList } from "../utils/utils";

export default function CreateScore() {

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [tonic, setTonic] = useState("");
  const [keyType, setKeyType] = useState("");
  const [data, setData] = useState("");

  const editor = useRef<HTMLTextAreaElement>(null);

  function handleSaveClick() {
    if (
      title === "" ||
      tonic === "" ||
      keyType === "" ||
      data === ""
    ) {
      alert("入力されていないところがあります");
      return;
    }

    axios.post("/api/scores", {
      title: title,
      key: `${tonic} ${keyType}`,
      data: data
    })
    .then(res => {
      alert("保存しました");
      history.push(`/scores/${res.data.id}`);
    })
    .catch(e => {
      alert("保存に失敗しました");
      console.error(e);
    });
  }

  function handleSelectChord(start: number, end: number) {
    editor.current?.focus();
    editor.current?.setSelectionRange(start, end);
  }

  return (
    <div id="create-score">
      <table id="description">
        <tbody>
          <tr>
            <th>タイトル：</th>
            <td>
              <input type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>調：</th>
            <td>
              <select
                value={tonic}
                onChange={e => setTonic(e.target.value)}>
                <option value="" disabled>(選択してください)</option>
                {NoteList.slice(7, 23).map((val) => {
                  return (
                    <option value={val} key={val}>{val}</option>
                  );
                })}
              </select>
              <select
                value={keyType}
                onChange={e => setKeyType(e.target.value)}>
                <option value="" disabled>(選択してください)</option>
                {KeyTypeList.map((val) => {
                  return (
                    <option value={val} key={val}>{val}</option>
                  );
                })}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div><button onClick={() => handleSaveClick()}>保存</button></div>
      <Editor
        ref={editor}
        data={data}
        setData={(val) => setData(val)}
        onChange={e => setData(e.target.value)}
      />
      <hr></hr>
      <h3>***Preview***</h3>
      <Score
        data={data}
        offset={0}
        onSelectChord={handleSelectChord}
      />
    </div>
  );
}