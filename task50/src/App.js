import React, { Component } from 'react';
import Header from './components/Header/index';
import Editor from './components/Editor/index';
import ExamList from './components/ExamList/index';
import ExamShow from './components/ExamShow/index';

// <Editor />
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ExamShow />
      </div>
    );
  }
}

export default App;
