import React, { PropTypes } from "react";
import InputItem from "../InputItem/index";
import { questionActs } from "../../constants/questionActType";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setContentId,
  opeExamQuestions,
  saveQuestion,
  addOption,
  deleteOption
} from "../../actions/index";
export default function(Component) {
  class Question extends React.Component {
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
      this.props.saveMessageFunc({ [id]: "" });
      this.setState({
        editId: null
      });
    };

    render() {
      const {
        thisQuestion,
        index,
        isLast,
        opeExamQuestionsFunc,
        currentExamId,
        requireable,
        setRequireFunc,
        isAnswerMode,
        onToggle,
        onAnswerText,
        title
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
      const requireInputClazz = classnames({
        checked: require
      });
      return (
        <div className="question">
          <div className="question-title">
            <div>Q{index + 1}</div>
            <InputItem
              onToggle={this.onToggle}
              unCheckable={true}
              id={titleId}
              msg={title}
              editing={editId && titleId === editId}
              isAnswerMode={isAnswerMode}
              save={this.save}
              setDestory={this.setDestory}
              setEdit={this.setEdit}
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
              editId={editId}
              onToggle={onToggle}
              onAnswerText={onAnswerText}
              {...this.props}
              save={this.save}
              setEdit={this.setEdit}
              setDestory={this.setDestory}
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
            </div>}
        </div>
      );
    }
  }
  const mapDispatchToProps = dispatch => ({
    setContentIdFunc: bindActionCreators(setContentId, dispatch),
    opeExamQuestionsFunc: bindActionCreators(opeExamQuestions, dispatch),
    saveQuestionFunc: bindActionCreators(saveQuestion, dispatch),
    addOptionFunc: bindActionCreators(addOption, dispatch),
    deleteOptionFunc: bindActionCreators(deleteOption, dispatch)
  });
  return connect(null, mapDispatchToProps)(Question);
}
