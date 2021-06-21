import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Score from "../components/Score";

export default class ShowScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      key: "",
      data: "",
      createdAt: null,
      updatedAt: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/scores/${id}`)
      .then((res) => {
        this.setState(res.data);
      })
      .catch((e) => console.error(e));
  }

  handleDeleteClick(e) {
    if (confirm(`以下を削除します！\nタイトル：${this.state.title}`))
      axios.delete(`/api/scores/${this.state.id}`)
        .then(res => {
          alert("削除しました");
          this.props.history.push("/");
        })
        .catch(e => console.error(e));
  }

  render() {
    if (this.state.id === "") {
      return (
        <div id="not-found">
          <p>データが存在しません...</p>
          <Link to="/"><button>戻る</button></Link>
        </div>
      );
    } else {
      return (
        <div id="show-score">
          <table id="description">
            <tbody>
              <tr><th>タイトル：</th><td>{this.state.title}</td></tr>
              <tr><th>調：</th><td>{this.state.key}</td></tr>
            </tbody>
          </table>
          <Link to={`/scores/${this.state.id}/edit`}><button>編集</button></Link>
          <button className="danger" onClick={() => this.handleDeleteClick()}>削除</button>
          <hr></hr>
          <Score data={this.state.data} />
        </div>
      );
    }
  }
}