import axios from "axios";
import React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  componentDidMount() {
    axios.get("api")
      .then((res) =>{
        console.log("response:");
        console.log(res.data);
        this.setState({message: res.data.message});
      })
      .catch((e) => {console.error("error!"); console.error(e)});
  }

  render() {
    return (
      <div id="app">
        <h1>Hello, World!</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default hot(module)(App);