import axios from "axios";
import React from "react";
import Score from "../components/Score";
import "./ShowScore.css";

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

  handleChange(e) {
    this.setState({data: e.target.value});
  }

  render() {
    return (
      <div id="show-score">
        <table id="description">
          <tbody>
            <tr><th>タイトル：</th><td>{this.state.title}</td></tr>
            <tr><th>調：</th><td>{this.state.key}</td></tr>
          </tbody>
        </table>
        <textarea id="test-output"
          defaultValue={this.state.data}
          onChange={e => this.handleChange(e)}
        ></textarea>
        <hr></hr>
        <Score data={this.state.data} />
      </div>
    );
  }
}