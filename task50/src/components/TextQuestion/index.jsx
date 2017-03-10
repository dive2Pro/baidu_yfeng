import React, { Component } from "react";
import Question from "../Question/index";

class TextQuestion extends Component {
  state = {};
  handleSubmit = () => {
    const { save, setDestory, thisQuestion } = this.props;
    const val = this.inp.value.trim();
    const { contentId } = thisQuestion;
    if (val) {
      save(contentId, val);
    } else {
      setDestory(contentId);
    }
  };

  handleChange = event => {
    this.setState({
      temp_value: event.target.value
    });
  };
  componentDidMount() {
    // 生成一个contentId
    const { thisQuestion, setContentIdFunc } = this.props;
    setContentIdFunc(thisQuestion.id);
  }
  componentWillUnmount() {
    const { thisQuestion, saveQuestionFunc } = this.props;

    if (thisQuestion.contentId) {
      // 删除contentId , 用户回答信息放在 answerInfo 中
      delete thisQuestion.contentId;
      saveQuestionFunc(thisQuestion);
    }
  }
  render() {
    const {
      thisQuestion,
      message,
      setEdit,
      editId
    } = this.props;

    const contentId = thisQuestion.contentId;
    const editing = editId && editId === contentId;

    return (
      <div>
        <textarea
          onBlur={this.handleSubmit}
          onFocus={() => setEdit(contentId)}
          onChange={this.handleChange}
          value={editing ? this.state.temp_value : message[contentId]}
          ref={o => this.inp = o}
        />
      </div>
    );
  }
}

export default Question(TextQuestion);
