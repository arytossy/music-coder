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
                  onChange={(e) => this.handleTitleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>調：</th>
              <td>
                <select onChange={e => this.handleMusicRootChange(e)}>
                  <option defaultChecked value="" label="(選択してください)" />
                  {this.musicRoots.map((root) => {
                    return (
                      <option value={root} key={root} label={root} />
                    );
                  })}
                </select>
                <select onChange={e => this.handleMusicKeyChange(e)}>
                  <option defaultChecked value="" label="(選択してください)" />
                  {this.musicKeys.map((musicKey) => {
                    return (
                      <option value={musicKey} key={musicKey} label={musicKey} />
                    );
                  })}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.handleSaveClick()}>保存</button>
        <textarea id="edit-area" onChange={e => this.handleDataChange(e)}></textarea>
        <hr></hr>
        <h3>***Preview***</h3>
        <Score data={this.state.data} />
      </div>
    );
  }
}