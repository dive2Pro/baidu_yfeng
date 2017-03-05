import React, { Component, PropTypes } from "react";
import InputItem from "../InputItem/index";
import * as topicTypes from "../../constants/topicType";
import Question from "../Question/index";

class ChoiceQuestion extends Component {
  render() {
    const {
      thisQuestion,
      message,
      save,
      setEdit,
      setDestory,
      editId,
      onToggle
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
              onToggle={onToggle}
              key={id}
              save={save}
              setDestory={setDestory}
              setEdit={setEdit}
              msg={message[id]}
              editing={id === editId}
              id={id}
            />
          );
        })}
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
  index: PropTypes.number
};
export default Question(ChoiceQuestion);
