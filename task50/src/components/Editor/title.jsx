import React, { Component } from "react";
import InputItem from "../InputItem/index";
import { Icon } from "antd";
import { observer } from "mobx-react";

const EditorTitle = observer(function EditTitle({ ...props }) {
  const { isAnswerMode, handleGoback, currentExam } = props;

  const save = ({ id, value }) => {
    console.log(value);
    currentExam.changeTitle(value);
  };

  return (
    <div className="editor-title">
      <a className="editor-title-goback" onClick={handleGoback} href="#">
        <Icon type="left" />返回
      </a>
      <InputItem
        onHandleInput={save}
        unCheckable={true}
        isAnswerMode={isAnswerMode}
        id={currentExam.id}
        placeHold={currentExam.title || "这里是标题"}
        isTitle
      />
    </div>
  );
});

export default EditorTitle;
