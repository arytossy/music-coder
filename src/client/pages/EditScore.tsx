import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import NoticeBar from "../components/NoticeBar";
import Layout from "./Layout";

import "./EditScore.css";

export default function EditScore() {

  const history = useHistory();
  const { id } = useParams<{id: string}>();

  const [fetching, setFetching] = useState(true);
  const [title, setTitle] = useState<null | string>(null);
  const [musicKey, setMusicKey] = useState("");
  const [data, setData] = useState("");
  const [changing, setChanging] = useState(false);

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

  useEffect(() => {
    axios.get(`/api/scores/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setMusicKey(res.data.key);
        setData(res.data.data);
      })
      .catch(e => {
        addNotice("error", "データ取得に失敗しました。");
        console.error("データ取得に失敗しました。");
        console.error(e);
      })
      .finally(() => setFetching(false));
  }, []);

  function changeTitle(val: string) {
    setChanging(true);
    setTitle(val);
  }

  function changeMusicKey(val: string) {
    setChanging(true);
    setMusicKey(val);
  }

  function changeData(val: string) {
    setChanging(true);
    setData(val);
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

    axios.put(`/api/scores/${id}`, {
      title: title,
      key: musicKey,
      data: data
    })
    .then(res => {
      setChanging(false);
      addNotice("success", "保存しました！");
    })
    .catch(e => {
      addNotice("error", "保存に失敗しました。");
      console.error("保存に失敗しました。");
      console.error(e);
    });
  }

  function abandon() {
    if (confirm("未保存の内容を破棄して終了します。\nよろしいですか？")) {
      history.push(`/scores/${id}`);
    }
  }

  let content = <></>;

  if (fetching) {
    content = (
      <p>データ取得中...</p>
    )
  } else if (title === null) {
    content = (
      <div id="not-found">
        <p>データが存在しません...</p>
        <Link to="/"><button className="secondary">戻る</button></Link>
      </div>
    );
  } else {
    content = (
      <div id="edit-score">
        <Editor
          title={title}
          musicKey={musicKey}
          data={data}
          onChangeTitle={changeTitle}
          onChangeMusicKey={changeMusicKey}
          onChangeData={changeData}
        />
      </div>
    );
  }

  return (
    <Layout
      breadcrumb={[
        { text: title ?? "", linkTo: `/scores/${id}` },
        { text: "編集" },
      ]}
      contextMenu={[
        { text: "保存", level: "primary", active: changing, callback: save },
        { text: "破棄", level: "danger", active: changing, callback: abandon },
      ]}
    >
      {notices.map(entry => (
        <NoticeBar
          key={entry.id}
          level={entry.level}
          message={entry.message}
          timeout={5000} />
      ))}
      {content}
    </Layout>
  );
}
