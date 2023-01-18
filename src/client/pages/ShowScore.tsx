import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ModulateDialog from "../components/ModulateDialog";
import Score from "../components/Score";
import Layout from "./Layout";

export default function ShowScore() {

  const history = useHistory();
  const { id } = useParams<{id: string}>();

  const [score, setScore] = useState({
    id: "",
    title: "",
    key: "",
    data: "",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [offset, setOffset] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get<typeof score>(`/api/scores/${id}`)
      .then((res) => setScore(res.data))
      .catch((e) => console.error(e));
  }, []);

  function deleteScore() {
    if (confirm(`以下を削除します！\nタイトル：${score.title}`))
      axios.delete(`/api/scores/${score.id}`)
        .then(() => {
          alert("削除しました");
          history.push("/");
        })
        .catch(e => console.error(e));
  }

  if (score.id === "") {
    return (
      <div id="not-found">
        <p>データが存在しません...</p>
        <Link to="/"><button className="secondary">戻る</button></Link>
      </div>
    );
  } else {
    return (
      <Layout
        breadcrumb={[
          { text: score.title }
        ]}
        contextMenu={[
          { text: "転調", level: "primary", active: true, callback: () => setShow(true) },
          { text: "編集", level: "primary", active: true, callback: () => history.push(`/scores/${score.id}/edit`) },
          { text: "削除", level: "danger", active: true, callback: deleteScore },
        ]}
      >
        <div id="show-score">
          <table id="description">
            <tbody>
              <tr><th>タイトル：</th><td>{score.title}</td></tr>
              <tr><th>調：</th><td>{score.key}</td></tr>
            </tbody>
          </table>
          <hr></hr>
          <Score data={score.data} offset={offset} />

          {show ?
            <ModulateDialog
              originKey={score.key}
              onClose={() => setShow(false)}
              onModulate={(offset) => setOffset(offset)}
            /> :
            null
          }
        </div>
      </Layout>
    );
  }
}
