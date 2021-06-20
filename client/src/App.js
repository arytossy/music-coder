import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShowScore from "./pages/ShowScore";
import "./App.css"
import CreateScore from "./pages/CreateScore";
import EditScore from "./pages/EditScore";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/scores/:id" component={ShowScore}/>
          <Route exact path="/scores/:id/edit" component={EditScore} />
          <Route exact path="/create-score" component={CreateScore} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);