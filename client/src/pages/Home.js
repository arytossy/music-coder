import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [{id: "", title: ""}]
    }
  }

  getScores() {
    axios.get("api/scores")
      .then((res) => {
        this.setState({scores: res.data});
      })
      .catch((e) => console.error(e));
  }

  componentDidMount() {
    this.getScores();
  }

  handleDeleteClick(e) {
    if (confirm(`以下を削除します！\nタイトル：${e.target.dataset.title}`))
      axios.delete(`/api/scores/${e.target.dataset.id}`)
        .then(res => {
          alert("削除しました");
          this.getScores();
        })
        .catch(e => console.error(e));
  }

  render() {
    return (
      <div id="home">
        <Link to="/create-score"><button>新規作成</button></Link>
        <h2>コード譜一覧</h2>
        <ul id="scores-index">
          {this.state.scores.map((score) => {
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
                    onClick={(e) => this.handleDeleteClick(e)}
                  >削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}