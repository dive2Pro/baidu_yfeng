import React, { Component } from "react";
import Header from "./components/Header/index";
import Editor from "./components/Editor/index";
import ExamList from "./components/ExamList/index";
import ExamShow from "./components/ExamShow/index";

// <Editor />
class App extends Component {
  render() {
    return (
      <div>
        <div id="app-title">
          <Header />
        </div>
        <div id="app-content">
          <ExamShow />
        </div>
      </div>
    );
  }
}

export default App;
