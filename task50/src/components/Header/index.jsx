import React, { Component } from "react";
import { Link } from "react-router";
import ScrollHoc from "./ScrollHoc";
import classnames from "classnames";
const Header = ({ overScroll40 }) => {
  const clazz = classnames("header", {
    overScroll40
  });
  return (
    <div className={clazz}>
      <Link to="/list">❔ 问卷管理</Link>
    </div>
  );
};
export default ScrollHoc(Header);
