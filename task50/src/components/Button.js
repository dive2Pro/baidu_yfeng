/**
 * Created by hyc on 17-3-7.
 */
import React, { Component } from "react";
import { Button as AntButton } from "antd";

export default class Button extends Component {
  render() {
    const {
      onhandleClick,
      disabled,
      children } = this.props;
    return (
      <AntButton disabled={disabled} onClick={onhandleClick}>
        {children}
      </AntButton>
    );
  }
}
