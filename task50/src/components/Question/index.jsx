import React from 'react';
import InputItem from '../InputItem/index';
import { questionActs } from '../../constants/questionActType';
import classnames from 'classnames';
export default function(Component) {
  class Question extends React.Component {
    state = {};
    onToggle = () => {
      console.log('onToggle!');
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
      this.setState({
        editId: null
      });
    };
    render() {
      const {
        question,
        message,
        index,
        isLast,
        opeExamQuestionsFunc,
        currentExamId,
        requireable,
        setRequireFunc
      } = this.props;
      const {
        titleId
      } = question;
      const {
        editId
      } = this.state;
      const requireClazz = classnames('question-title-require', {
        visible: requireable
      });
      return (
        <div className="question">
          <div className="question-title">
            <div>Q{index + 1}</div>
            <InputItem
              unCheckable={true}
              save={this.save}
              id={titleId}
              setEdit={this.setEdit}
              msg={message[titleId]}
              editing={titleId === editId}
            />
            <div className={requireClazz}>
              <input
                type="checkbox"
                id={question.id + ' - label'}
                checked={question.require}
              />
              <label
                htmlFor={question.id + ' - label'}
                onClick={() => setRequireFunc(question.id, !question.require)}
              >
                此题是否必选
              </label>
            </div>
          </div>
          <div className="question-items">
            <Component
              save={this.save}
              setEdit={this.setEdit}
              setDestory={this.setDestory}
              editId={editId}
              onToggle={this.onToggle}
              {...this.props}
            />
          </div>
          <div className="question-act">
            {Object.keys(questionActs).map((act, i) => {
              let content;
              if (index === 0 && i === 0 || isLast && i === 1) {
                return '';
              } else {
                content = act;
              }
              return (
                <div
                  key={i}
                  onClick={() =>
                    opeExamQuestionsFunc(
                      currentExamId,
                      question,
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
