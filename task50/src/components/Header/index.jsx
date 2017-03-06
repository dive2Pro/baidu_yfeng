import React, { Component } from "react";
import { Link } from "react-router";
class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/list">❔ 问卷管理</Link>
      </div>
    );
  }
}
export default Header;
