import React, { Component } from 'react';
import Header from './components/Header/index';
import Editor from './components/Editor/index';
import ExamList from './components/ExamList/index';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Editor />
        <ExamList />
      </div>
    );
  }
}

export default App;
