import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

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
        <h3>コード譜一覧</h3>
        <ul>
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