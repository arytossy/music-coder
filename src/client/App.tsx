import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShowScore from "./pages/ShowScore";
import CreateScore from "./pages/CreateScore";
import EditScore from "./pages/EditScore";

import "./App.css"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/scores/:id" component={ShowScore}/>
          <Route exact path="/scores/:id/edit" component={EditScore} />
          <Route exact path="/create-score" component={CreateScore} />
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
