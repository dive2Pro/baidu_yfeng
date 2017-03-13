import React, { Component } from "react";
import InputItem from "../InputItem/index";
import { Icon } from "antd";
class EditorTitle extends Component {
  state = {};
  //TODO 将该问题的id集中在reducer中管理
  save = ({ id, value }) => {
    this.props.saveMessageFunc({ [id]: value });
  };
  render() {
    const {
      currentExam,
      isAnswerMode,
      handleGoback,
      title,
      titleId
    } = this.props;
    if (!currentExam) return <div />;
    return (
      <div className="editor-title">
        <a className="editor-title-goback" onClick={handleGoback} href="#">
          <Icon type="left" />返回
        </a>
        <InputItem
          onHandleInput={this.save}
          unCheckable={true}
          isAnswerMode={isAnswerMode}
          id={titleId}
          placeHold={title || "这里是标题"}
          isTitle
        />
      </div>
    );
  }
}

export default EditorTitle;
