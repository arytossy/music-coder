import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShowScore from "./pages/ShowScore";
import "./App.css"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/scores/:id" component={ShowScore}/>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);