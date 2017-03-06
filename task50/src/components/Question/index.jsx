import React from "react";
import InputItem from "../InputItem/index";
import { questionActs } from "../../constants/questionActType";
import classnames from "classnames";

export default function(Component) {
  class Question extends React.Component {
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
    setDestory = id => {
      this.setState({
        editId: null
      });

    };
    render() {
      const {
        thisQuestion,
        message,
        index,
        isLast,
        opeExamQuestionsFunc,
        currentExamId,
        requireable,
        setRequireFunc,
        isAnswerMode,
        onToggle,
        onAnswerText
      } = this.props;

      const {
        titleId,
        id,
        require
      } = thisQuestion;
      const {
        editId
      } = this.state;
      const requireClazz = classnames("question-title-require", {
        visible: requireable
      });
      return (
        <div className="question">
          <div className="question-title">
            <div>Q{index + 1}</div>
            <InputItem
              onToggle={this.onToggle}
              unCheckable={true}
              save={this.save}
              id={titleId}
              setEdit={this.setEdit}
              msg={message[titleId]}
              editing={titleId === editId}
              isAnswerMode={isAnswerMode}
            />
            {!isAnswerMode &&
              <div className={requireClazz}>
                <input type="checkbox" id={id + " - label"} checked={require} />
                <label
                  htmlFor={id + " - label"}
                  onClick={() => setRequireFunc(id, !require)}
                >
                  此题是否必选
                </label>
              </div>}
          </div>
          <div className="question-items">
            <Component
              save={this.save}
              setEdit={this.setEdit}
              setDestory={this.setDestory}
              editId={editId}
              onToggle={onToggle}
              onAnswerText={onAnswerText}
              {...this.props}
            />
          </div>
          <div className="question-act">
            {!isAnswerMode &&
              Object.keys(questionActs).map((act, i) => {
                let content;
                if ((index === 0 && i === 0) || (isLast && i === 1)) {
                  return "";
                } else {
                  content = act;
                }
                return (
                  <div
                    key={i}
                    onClick={() =>
                      opeExamQuestionsFunc(
                        currentExamId,
                        thisQuestion,
                        questionActs[act]
                      )}
                    className="question-act-item"
                  >
                    {content}
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }
  return Question;
}
