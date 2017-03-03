import React, { Component } from 'react';
import Question from '../Question/index';

class TextQuestion extends Component {
  state = {};
  handleSubmit = () => {
    const { save, setDestory, id } = this.props;
    console.log('eee');
    const val = this.inp.value.trim();
    if (val) {
      save(id, val);
    } else {
      setDestory(id);
    }
  };

  handleChange = event => {
    this.setState({
      temp_value: event.target.value
    });
  };

  render() {
    const {
      question,
      message,
      setEdit,
      editId
    } = this.props;

    const contentId = question.contentId;
    const editing = editId === contentId;
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
