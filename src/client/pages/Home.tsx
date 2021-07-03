import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

type ScoreIndex = {
  id: string,
  title: string
}[];

export default function Home() {

  const [scores, setScores] = useState<ScoreIndex>([{id: "", title: ""}]);

  useEffect(() => {
    axios.get<ScoreIndex>("/api/scores")
      .then((res) => setScores(res.data))
      .catch((e) => console.error(e));
  }, []);

  function handleDeleteClick(event: MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.id;
    const title = event.currentTarget.dataset.title;
    if (confirm(`以下を削除します！\nタイトル：${title}`))
      axios.delete(`/api/scores/${id}`)
        .then(() => {
          alert("削除しました");
          setScores(scores.filter((score) => score.id !== id));
        })
        .catch(e => console.error(e));
  }

  return (
    <div id="home">
      <Link to="/create-score"><button>新規作成</button></Link>
      <h2>コード譜一覧</h2>
      <ul id="scores-index">
        {scores.map((score) => {
          if (score.id === "") return null;
          return (
            <li key={score.id}>
              <Link to={`/scores/${score.id}`}>{score.title}</Link>
              <div>
                <Link to={`/scores/${score.id}/edit`}><button>編集</button></Link>
                <button
                  data-id={score.id}
                  data-title={score.title}
                  className="danger"
                  onClick={(e) => handleDeleteClick(e)}
                >削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}