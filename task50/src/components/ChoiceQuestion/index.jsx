import React from "react";

import InputWithEditView from "../InputItem/InputWithEdit";
import CheckOrRadioSelectView from "../InputItem/CheckOrRadioSelectView";
import * as topicTypes from "../../constants/topicType";
import Question from "../Question/index";
import { Radio, Checkbox, Icon } from "antd";
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class ChoiceQuestion extends React.Component {
  handleDestory = id => {
    const { thisQuestion } = this.props;
  };
  onHandleRadioGroupChange = e => {
    const id = e.target.value;
  };
  renderRadios = () => {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const { thisQuestion, onHandleChange } = this.props;
    // const inputType = type === topicTypes.SINGLE_TYPE ? "radio" : "checkbox";
    const optionsValues = thisQuestion.options.values();
    const plainOptions = optionsValues.map(option => ({
      value: option.id,
      label: option.title
    }));
    const isRadio = thisQuestion.type === topicTypes.SINGLE_TYPE;

    const Radios = (
      <RadioGroup onChange={this.onHandleRadioGroupChange}>
        {optionsValues.map(option => {
          const { id, title } = option;
          return (
            <Radio key={id} style={radioStyle} value={id}>
              {title}
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
  onOpetions = quesId => (optionId, actType) => {
    this.props.opeOptions(quesId, optionId, actType);
  };
  render() {
    const {
      thisQuestion,
      isAnswerMode,
      onHandleInput,
      onHandleChange
    } = this.props;
    const {
      type,
      id: quesId
    } = thisQuestion;

    return isAnswerMode
      ? this.renderRadios()
      : <div>
          {thisQuestion.options.values().map(option => {
            const { id, title } = option;
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
                  placeHold={title}
                  onHandleInput={onHandleInput}
                  onOpeOptions={this.onOpetions(quesId)}
                />
              </div>
            );
          })}
          <div>
            {!isAnswerMode &&
              <Icon type="plus" onClick={() => thisQuestion.id} />}
          </div>
        </div>;
  }
}
ChoiceQuestion.propTypes = {
  id: React.PropTypes.string, // 是否必填
  require: React.PropTypes.bool,
  // 类型
  type: React.PropTypes.string, // 题目信息
  question: React.PropTypes.object,
  message: React.PropTypes.object,
  saveMessageFunc: React.PropTypes.func,
  index: React.PropTypes.number,
  addOption: React.PropTypes.func,
  deleteOption: React.PropTypes.func
};
export default Question(ChoiceQuestion);
