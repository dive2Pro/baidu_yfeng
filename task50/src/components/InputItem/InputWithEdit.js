/**
 * Created by hyc on 17-3-11.
 */
import { Icon, Input } from "antd";
import React from "react";

export default class InputWithEdit extends React.Component {
  state = { inputVisible: false };
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    placeHold: React.PropTypes.string.isRequired,
    onHandleInput: React.PropTypes.func
  };
  handleInput = e => {
    this.setState({ temp_input: e.target.value });
  };
  handleInputEnter = e => {
    const { id, onHandleInput, placeHold } = this.props;
    const v = e.target.value;
    onHandleInput && onHandleInput({ id, value: v });
    this.setState({ temp_input: placeHold });
    this.setState(preState => {
      return { inputVisible: !preState.inputVisible };
    });
  };
  handleChangeInputMode = () => {
    const {} = this.props;
    this.setState(preState => {
      return { inputVisible: !preState.inputVisible };
    });
  };
  render() {
    const { id, placeHold, isAnswerMode } = this.props;
    const { temp_input, inputVisible } = this.state;
    return (
      <div className="_inputitem_edit">
        <label
          style={{ display: !inputVisible ? "block" : "none" }}
          htmlFor={`_input_${id}`}
        >
          {placeHold}
        </label>
        <Input
          style={{ display: inputVisible ? "block" : "none" }}
          ref={r => this[`_input_ref_${id}`] = r}
          id={`_input_${id}`}
          placeholder={placeHold}
          value={temp_input || placeHold}
          onBlur={this.handleInputEnter}
          onPressEnter={this.handleInputEnter}
          onChange={this.handleInput}
        />
        {!isAnswerMode &&
          <Icon type="edit" onClick={this.handleChangeInputMode} />}
      </div>
    );
  }
}
