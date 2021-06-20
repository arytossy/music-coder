import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Score from "../components/Score";

export default class EditScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      musicRoot: "",
      musicKey: "",
      data: ""
    }
  }

  musicRoots = [
    "C","C+","D-","D","D+","E-","E","F","F+","G-","G","G+","A-","A","A+","B-","B"
  ]

  musicKeys = ["Major", "minor"]

  componentDidMount() {
    axios.get(`/api/scores/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          musicRoot: res.data.key.split(" ")[0],
          musicKey: res.data.key.split(" ")[1],
          data: res.data.data
        });
      })
      .catch(e => console.error(e));
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleMusicRootChange(e) {
    this.setState({musicRoot: e.target.value});
  }

  handleMusicKeyChange(e) {
    this.setState({musicKey: e.target.value});
  }

  handleDataChange(e) {
    this.setState({data: e.target.value});
  }

  handleSaveClick() {
    const current = this.state;
    if (
      current.title === "" ||
      current.musicRoot === "" ||
      current.musicKey === "" ||
      current.data === ""
    ) {
      alert("入力されていないところがあります");
      return;
    }

    axios.put(`/api/scores/${current.id}`, {
      title: current.title,
      key: `${current.musicRoot} ${current.musicKey}`,
      data: current.data
    })
    .then(res => {
      alert("保存しました");
    })
    .catch(e => {
      alert("保存に失敗しました");
      console.error(e);
    });
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
        <div id="edit-score">
          <table id="description">
            <tbody>
              <tr>
                <th>タイトル：</th>
                <td>
                  <input type="text"
                    value={this.state.title}
                    onChange={e => this.handleTitleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <th>調：</th>
                <td>
                  <select
                    value={this.state.musicRoot}
                    onChange={e => this.handleMusicRootChange(e)}
                  >
                    {this.musicRoots.map((root) => {
                      return (
                        <option value={root} key={root}>{root}</option>
                      );
                    })}
                  </select>
                  <select
                    value={this.state.musicKey}
                    onChange={e => this.handleMusicKeyChange(e)}
                  >
                    {this.musicKeys.map((musicKey) => {
                      return (
                        <option value={musicKey} key={musicKey}>{musicKey}</option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div><button onClick={() => this.handleSaveClick()}>保存</button></div>
          <textarea id="edit-area"
            value={this.state.data}
            onChange={e => this.handleDataChange(e)}
          />
          <hr></hr>
          <h3>***Preview***</h3>
          <Score data={this.state.data} />
        </div>
      );
    }
  }
}