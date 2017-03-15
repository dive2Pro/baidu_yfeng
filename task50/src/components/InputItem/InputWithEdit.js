/**
 * Created by hyc on 17-3-11.
 */
import { Icon, Input, Menu, Dropdown } from "antd";
import React from "react";
import * as actTypes from '../../constants/optionActType'
export default class InputWithEdit extends React.Component {
  state = { inputVisible: false };
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    placeHold: React.PropTypes.string.isRequired,
    onHandleInput: React.PropTypes.func,
    onOpeOptions: React.PropTypes.func
  };
  handleInput = e => {
    this.setState({ temp_input: e.target.value });
  };
  handleInputEnter = e => {
    const { id, onHandleInput,index } = this.props;
    const v = e.target.value;
    onHandleInput && onHandleInput({ id, value: v,index });
    this.setState({ temp_input: "" });
    this.setState(() => {
      return { inputVisible: false };
    });
  };
  handleOpeOptions = ({ key }) => {
    const { onOpeOptions,index } = this.props;
    switch (+key) {
      case 0:
        this.handleChangeInputMode();
        break;
      default:
        onOpeOptions(index, key);
    }
  };

  handleChangeInputMode = () => {
    this.setState(preState => {
      return { inputVisible: !preState.inputVisible };
    });
  };
  renderActs = () => {
    const { isTitle } = this.props;
    const editAct = (
      <a
        className="ant-dropdown-link"
        href="#"
        onClick={this.handleChangeInputMode}
      >
        <Icon type="edit" />
      </a>
    );
    const menus = (
      <Menu onClick={this.handleOpeOptions}>
        <Menu.Item key={actTypes.MODIFY}>修改</Menu.Item>
        <Menu.Item key={actTypes.UPPER}>上移</Menu.Item>
        <Menu.Item key={actTypes.LOWER}>下移</Menu.Item>
        <Menu.Item key={actTypes.DELETE}>删除</Menu.Item>
      </Menu>
    );
    return isTitle
      ? editAct
      : <Dropdown overlay={menus}>
          <a className="ant-dropdown-link" href="#">
            <Icon type="down" />
          </a>
        </Dropdown>;
  };
  componentDidUpdate(){
    if(this.state.inputVisible){
      const {id} =this.props;
      this[`_input_ref_${id}`].focus();
    }
  }
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
        {!isAnswerMode && this.renderActs()}
      </div>
    );
  }
}
