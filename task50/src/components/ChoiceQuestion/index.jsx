import React, { Component, PropTypes } from "react";

import InputWithEditView from "../InputItem/InputWithEdit";
import CheckOrRadioSelectView from "../InputItem/CheckOrRadioSelectView";
import * as topicTypes from "../../constants/topicType";
import Question from "../Question/index";
import { Radio, Checkbox, Icon } from "antd";
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class ChoiceQuestion extends Component {
  handleDestory = id => {
    const { setDestory, deleteOption, thisQuestion } = this.props;
    setDestory(id);
    deleteOption(thisQuestion.id, id);
  };
  onHandleRadioGroupChange = e => {
    const id = e.target.value;
    const { onHandleChange } = this.props;
    onHandleChange([id]);
  };
  renderRadios = () => {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const { thisQuestion, message, onHandleChange } = this.props;
    // const inputType = type === topicTypes.SINGLE_TYPE ? "radio" : "checkbox";
    const plainOptions = thisQuestion.optionsId.map(id => ({
      value: id,
      label: message[id]
    }));
    const isRadio = thisQuestion.type === topicTypes.SINGLE_TYPE;

    const Radios = (
      <RadioGroup onChange={this.onHandleRadioGroupChange}>
        {thisQuestion.optionsId.map((id, index) => {
          return (
            <Radio style={radioStyle} value={id}>
              {message[id]}
            </Radio>
          );
        })}
      </RadioGroup>
    );

    return (
      <div className="question-items-item">
        {isRadio
          ? Radios
          : <CheckboxGroup
              onChange={onHandleChange}
              options={plainOptions}
              style={radioStyle}
            />}
      </div>
    );
  };
  render() {
    const {
      thisQuestion,
      message,
      isAnswerMode,
      addOption,
      onHandleInput,
      onHandleChange
    } = this.props;
    const {
      type
    } = thisQuestion;

    const inputType = type === topicTypes.SINGLE_TYPE ? "radio" : "checkbox";
    return isAnswerMode
      ? this.renderRadios()
      : <div>
          {thisQuestion.optionsId.map((id, index) => {
            return (
              <div className="question-items-item">
                <CheckOrRadioSelectView
                  onHandleChange={onHandleChange}
                  id={id}
                  checkbox={type === topicTypes.MULTI_TYPE}
                />
                <InputWithEditView
                  id={id}
                  isAnswerMode={isAnswerMode}
                  placeHold={message[id]}
                  onHandleInput={onHandleInput}
                />
              </div>
            );
          })}
          <div>
            {!isAnswerMode &&
              <Icon type="plus" onClick={() => addOption(thisQuestion.id)} />}
          </div>
        </div>;
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
