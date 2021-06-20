import axios from "axios";
import React from "react";
import Score from "../components/Score";

export default class CreateScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    axios.post("/api/scores", {
      title: current.title,
      key: `${current.musicRoot} ${current.musicKey}`,
      data: current.data
    })
    .then(res => {
      alert("保存しました");
      this.props.history.push(`/scores/${res.data.id}`);
    })
    .catch(e => {
      alert("保存に失敗しました");
      console.error(e);
    });
  }

  render() {
    return (
      <div id="create-score">
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
                  onChange={e => this.handleMusicRootChange(e)}>
                  <option value="" disabled>(選択してください)</option>
                  {this.musicRoots.map((root) => {
                    return (
                      <option value={root} key={root}>{root}</option>
                    );
                  })}
                </select>
                <select
                  value={this.state.musicKey}
                  onChange={e => this.handleMusicKeyChange(e)}>
                  <option value="" disabled>(選択してください)</option>
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