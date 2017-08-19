import React, { Component } from 'react';
import './App.css';

import AddProject from "./components/AddProject";
import ProjectsList from "./containers/ProjectsList";
import ProjectPage from "./containers/ProjectPage";

import { Route, Redirect } from "react-router";

function MainComponent() {
  return (
    <div className="App">
      <AddProject />

      <ProjectsList />
    </div>
  );
}

function SomeOtherApp() {
  return <div>Other page</div>
}

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainComponent} />
        <Route path="/project/:id" component={ProjectPage} />
      </div>
    );
  }
}

export default App;
