import React, { useState } from "react";
import Adjuster from "./Adjuster";
import NoticeBar from "./NoticeBar";
import Score from "./Score";

import "./Editor_v2.css";

export default function Editor_v2() {

  const [title, setTitle] = useState("");
  const [tonic, setTonic] = useState("");
  const [keyType, setKeyType] = useState("");
  const [data, setData] = useState("")

  type Notice = {
    key: number,
    level: "info" | "warn" | "error" | "success",
    message: string
  }

  const [notices, setNotices] = useState<Notice[]>([]);

  function handleStartAdjustingRightPane() {

  }

  function handleAdjustRightPane() {

  }

  function handleStartAdjustingPreviewPane() {

  }

  function handleAdjustPreviewPane() {

  }

  return (
    <div id="editor">

      <section id="left-pane">

        {notices.map(notice => <NoticeBar {...notice} timeout={5000} />)}

        <section id="input-pane">

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

        </section>

        <Adjuster direction="horizontal" onStartHeld={handleStartAdjustingRightPane} onMove={handleAdjustRightPane} />

        <section id="preview-pane">
          <h3>*** Preview ***</h3>
          <div id="preview-score">
            <Score/>
          </div>
        </section>

      </section>

      <Adjuster direction="vertical" onStartHeld={handleStartAdjustingPreviewPane} onMove={handleAdjustPreviewPane} />

      <section id="right-pane">

      </section>

    </div>
  )
}