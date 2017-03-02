import React from 'react';
import InputItem from '../InputItem/index';

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
        index
      } = this.props;
      const {
        titleId
      } = question;
      const {
        editId
      } = this.state;
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
        </div>
      );
    }
  }
  return Question;
}
