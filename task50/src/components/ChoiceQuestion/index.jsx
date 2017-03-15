import React from "react";

import InputWithEditView from "../InputItem/InputWithEdit";
import CheckOrRadioSelectView from "../InputItem/CheckOrRadioSelectView";
import * as topicTypes from "../../constants/topicType";
import Question from "../Question/index";
import { Radio, Checkbox, Icon } from "antd";
import { DELETE } from "../../constants/optionActType";
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
import {observer} from 'mobx-react'
@observer
class ChoiceQuestion extends React.Component {

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
  onOpetions = quesId => (index, actType) => {
    const q = this.props.thisQuestion;
    if (actType == DELETE) {
      q.deleteOption(index);
    } else {
      q.changeOptionPosition(index,actType);
    }
  };
  onHandleInput = ({ id, value,index }) => {
    console.info("onHandleInput " + id + "  value = " + value);
    const option = this.props.thisQuestion.options[index];
    option.setOptionTitle(value);
  };
  render() {
    const {
      thisQuestion,
      isAnswerMode,
      onHandleChange
    } = this.props;
    const {
      type,
      id: quesId,
      options
    } = thisQuestion;
    console.log(options, type);
    return isAnswerMode
      ? this.renderRadios()
      : <div>
          {options.map((option,index) => {
            const { id, title } = option;
            return (
              <div key={id} className="question-items-item">
                <CheckOrRadioSelectView
                  onHandleChange={onHandleChange}
                  id={id}
                  checkbox={type === topicTypes.MULTI_TYPE}
                />
                <InputWithEditView
                  id={id}
                  index={index}
                  isAnswerMode={isAnswerMode}
                  placeHold={title}
                  onHandleInput={this.onHandleInput}
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
