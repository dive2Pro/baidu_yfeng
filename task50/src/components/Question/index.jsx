import React, { PropTypes } from "react";
import InputWithEditView from "../InputItem/index";
import { questionActs } from "../../constants/questionActType";
import classnames from "classnames";
import { observer } from "mobx-react";
export default function(Component) {
  @observer class Question extends React.Component {
    state = {};
    static propTypes = {
      thisQuestion: React.PropTypes.object,
      message: React.PropTypes.object,
      index: React.PropTypes.number,
      isLast: React.PropTypes.bool,
      opeExamQuestionsFunc: React.PropTypes.func,
      currentExamId: React.PropTypes.string,
      requireable: React.PropTypes.bool,
      setRequireFunc: React.PropTypes.func,
      isAnswerMode: React.PropTypes.bool,
      onToggle: React.PropTypes.func,
      onAnswerText: React.PropTypes.func,
      saveMessageFunc: React.PropTypes.func
    };
    onHandleInput = ({ id, value }) => {
      this.props.thisQuestion.setQuestionTitle(value);
    };
    render() {
      const {
        thisQuestion,
        index,
        isLast,
        isAnswerMode,
        onToggle,
        requireable
      } = this.props;

      const {
        title,
        id,
        isRequire
      } = thisQuestion;

      const requireClazz = classnames("question-title-require", {
        visible: requireable
      });

      return (
        <div className="question">
          <div className="question-title">
            <div>Q{index + 1}</div>
            <InputWithEditView
              onHandleInput={this.onHandleInput}
              id={id}
              placeHold={title}
              isAnswerMode={isAnswerMode}
              isTitle
            />
            {!isAnswerMode &&
              <div className={requireClazz}>
                <input type="checkbox" id={id + " - label"} checked={require} />
                <label
                  htmlFor={id + " - label"}
                  onClick={() => thisQuestion.setQuestionRequire(!isRequire)}
                >
                  此题是否必选
                </label>
              </div>}
          </div>
          <div className="question-items">
            <Component
              onToggle={onToggle}
              onAnswerText={() => {}}
              onHandleChange={() => {}}
              {...this.props}
            />
          </div>
          {!isAnswerMode &&
            <div className="question-act">
              {Object.keys(questionActs).map((act, i) => {
                let content;
                if ((index === 0 && i === 0) || (isLast && i === 1)) {
                  return "";
                } else {
                  content = act;
                }
                return (
                  <a
                    href="#"
                    key={i}
                    onClick={() => {
                      thisQuestion.changeQuestion({
                        index,
                        actType: questionActs[act]
                      });
                    }}
                    className="question-act-item"
                  >
                    {content}
                  </a>
                );
              })}
            </div>}
        </div>
      );
    }
  }

  return Question;
}
