import React, { Component } from "react";
import { Link } from "react-router";
import ScrollHoc from "./ScrollHoc";
import classnames from "classnames";
import { Layout, Menu, Icon } from "antd";
const { Header: AntHeader } = Layout;
const Header = ({ overScroll40 }) => {
  const clazz = classnames("header", {
    overScroll40
  });
  return (
    <AntHeader className={clazz}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/list"><Icon type="mail" />问卷管理</Link>
        </Menu.Item>
        <Menu.Item key="2">
          我的问卷
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};
export default ScrollHoc(Header);
