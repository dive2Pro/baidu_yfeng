import React, { Component } from 'react';
import InputItem from '../InputItem/index';
class EditorTitle extends Component {
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
  render() {
    const {
      currentExam,
      message
    } = this.props;
    return (
      <div className="editor-title">
        {currentExam &&
          <InputItem
            unCheckable={true}
            save={this.save}
            id={currentExam.titleId}
            setEdit={this.setEdit}
            msg={message[currentExam.titleId] || '这里是标题'}
            editing={currentExam.titleId === this.state.editId}
          />}
      </div>
    );
  }
}
export default EditorTitle;
