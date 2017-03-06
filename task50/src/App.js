import React, { Component } from "react";
import Header from "./components/Header/index";
import { connect } from "react-redux";

// <Editor />
class App extends Component {
  render() {
    return (
      <div>
        <div id="app-title">
          <Header />
        </div>
        <div id="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    state,
    children: ownState.children
  };
};
export default connect(mapStateToProps)(App);
