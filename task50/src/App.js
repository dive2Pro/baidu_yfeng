import React, { Component } from "react";
import Header from "./components/Header/index";
import { Layout } from "antd";
import "antd/dist/antd.min.css";
const { Content: AntContent } = Layout;
import DevTools from 'mobx-react-devtools'

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header />
        <AntContent id="app-content">
          {this.props.children}
        </AntContent>
        <DevTools/>
      </Layout>
    );
  }
}

export default App;
