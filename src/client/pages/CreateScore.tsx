import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Editor from "../components/Editor";
import NoticeBar from "../components/NoticeBar";
import Layout from "./Layout";

import "./CreateScore.css";

export default function CreateScore() {

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [musicKey, setMusicKey] = useState("");
  const [data, setData] = useState("");

  type Notice = {
    id: number,
    level: "info" | "warn" | "error" | "success",
    message: string,
  }

  const [noticeId, setNoticeId] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);

  function addNotice(level: "info" | "warn" | "error" | "success", message: string) {
    let id = noticeId;
    let tmp = notices.slice();
    tmp.push({ id, level, message });
    setNoticeId(++id);
    setNotices(tmp);
  }

  function save() {

    const empties: string[] = [];
    if (title === "") empties.push("タイトル");
    if (musicKey === "") empties.push("調");
    if (data === "") empties.push("コード譜");
    if (empties.length > 0) {
      addNotice("warn", `入力されていないところがあります。[${empties.join("], [")}]`);
      return;
    }

    axios.post(`/api/scores`, {
      title: title,
      key: musicKey,
      data: data
    })
    .then(res => {
      addNotice("success", "保存しました！");
      setTimeout(() => history.push(`/scores/${res.data.id}/edit`), 3000);
    })
    .catch(e => {
      addNotice("error", "保存に失敗しました。");
      console.error("保存に失敗しました。");
      console.error(e);
    });
  }

  function abandon() {
    if (confirm("未保存の内容を破棄して終了します。\nよろしいですか？")) {
      history.push(`/`);
    }
  }

  return (
    <Layout
      breadcrumb={[
        { text: "新規作成" },
      ]}
      contextMenu={[
        { text: "保存", level: "primary", active: true, callback: save },
        { text: "破棄", level: "danger", active: true, callback: abandon },
      ]}
    >
      {notices.map(entry => (
        <NoticeBar
          key={entry.id}
          level={entry.level}
          message={entry.message}
          timeout={5000} />
      ))}
      <div id="create-score">
        <Editor
          title={title}
          musicKey={musicKey}
          data={data}
          onChangeTitle={setTitle}
          onChangeMusicKey={setMusicKey}
          onChangeData={setData}
        />
      </div>
    </Layout>
  );
}
