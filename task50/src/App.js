import React, { Component } from "react";
import Header from "./components/Header/index";
import { connect } from "react-redux";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
const { Content: AntContent } = Layout;
class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <AntContent id="app-content">
          {this.props.children}
        </AntContent>
      </Layout>
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
