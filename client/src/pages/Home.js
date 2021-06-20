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

  componentDidMount() {
    axios.get("api/scores")
      .then((res) => {
        this.setState({scores: res.data});
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <div id="home">
        <Link to="/create-score"><button>新規作成</button></Link>
        <h2>コード譜一覧</h2>
        <ul id="scores-index">
          {this.state.scores.map((score) => {
            return (
              <Link
                key={score.id}
                to={`/scores/${score.id}`}>
                <li>{score.title}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}