/**
 * Created by hyc on 17-3-7.
 */
import React, { Component } from "react";
import classnames from "classnames";
export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { content, onhandleClick, isUnClickable, children } = this.props;
    const clazz = classnames({
      unuseable: isUnClickable
    });
    return (
      <button className={clazz} onClick={onhandleClick}>
        {children}
      </button>
    );
  }
}
