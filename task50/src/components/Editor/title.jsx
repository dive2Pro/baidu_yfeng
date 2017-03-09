import React, { Component } from "react";
import InputItem from "../InputItem/index";
class EditorTitle extends Component {
  state = {};
  //TODO 将该问题的id集中在reducer中管理
  save = (id, str) => {
    this.props.saveMessageFunc({ [id]: str });
    this.setState({
      editId: null
    });
  };
  setEdit = id => {
    this.setState(_ => ({
      editId: id
    }));
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
        <div className="editor-title-goback" onClick={handleGoback}>
          {"< "}返回
        </div>
        <InputItem
          unCheckable={true}
          save={this.save}
          isAnswerMode={isAnswerMode}
          id={titleId}
          setEdit={this.setEdit}
          msg={title || "这里是标题"}
          editing={titleId === this.state.editId}
        />

      </div>
    );
  }
}

export default EditorTitle;
