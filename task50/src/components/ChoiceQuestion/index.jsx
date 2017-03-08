import React, { Component, PropTypes } from "react";
import InputItem from "../InputItem/index";
import * as topicTypes from "../../constants/topicType";
import Question from "../Question/index";

class ChoiceQuestion extends Component {
  handleDestory = id => {
    const { setDestory, deleteOption, thisQuestion } = this.props;
    setDestory(id);
    deleteOption(thisQuestion.id, id);
  };
  render() {
    const {
      thisQuestion,
      message,
      save,
      setEdit,
      editId,
      onToggle,
      isAnswerMode,
      addOption
    } = this.props;
    const {
      type
    } = thisQuestion;

    const inputType = type === topicTypes.SINGLE_TYPE
      ? "radio"
      : type === topicTypes.MULTI_TYPE ? "checkbox" : "text";
    return (
      <div>
        {thisQuestion.optionsId.map((id, index) => {
          return (
            <InputItem
              inputType={inputType}
              onToggle={({ checked }) => onToggle(id, index, checked)}
              key={id}
              save={save}
              setDestory={() => this.handleDestory(id)}
              setEdit={setEdit}
              msg={message[id]}
              editing={id === editId}
              id={id}
              isAnswerMode={isAnswerMode}
            />
          );
        })}
        <div>
          {!isAnswerMode &&
            <span
              className="question-items-add"
              onClick={() => addOption(thisQuestion.id)}
            >
              +
            </span>}
        </div>
      </div>
    );
  }
}
ChoiceQuestion.propTypes = {
  id: PropTypes.string, // 是否必填
  require: PropTypes.bool,
  // 类型
  type: PropTypes.string, // 题目信息
  question: PropTypes.object,
  message: PropTypes.object,
  saveMessageFunc: PropTypes.func,
  index: PropTypes.number,
  addOption: React.PropTypes.func,
  deleteOption: React.PropTypes.func
};
export default Question(ChoiceQuestion);
