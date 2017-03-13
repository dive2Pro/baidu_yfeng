import React, { Component, PropTypes } from "react";
import InputWithEdit from './InputWithEdit'
import classnames from "classnames";
class InputItem extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    const { editing } = this.props;
    if (editing) {
      this.inp.focus();
    }
  }

  handleSubmit = () => {
    const { save, setDestory, id } = this.props;
    const val = this.inp.value.trim();
    if (val) {
      save(id, val);
    } else {
      setDestory && setDestory(id);
    }
  };

  handleChange = event => {
    this.setState({
      temp_value: event.target.value
    });
  };

  render() {
    const {
      inputType,
      checked,
      onToggle,
      setEdit,
      msg,
      editing,
      id,
      unCheckable,
      defStr,
      isAnswerMode
    } = this.props;
    const { temp_value } = this.state;
    const clazz = classnames({ editing: editing }, "inputitem");
    return (
      <div className={clazz}>
        <div className="view">
          {/*//todo name */}
          {unCheckable ||
            <input
              type={inputType || "radio"}
              className="toggle"
              checked={checked}
              onChange={e => {
                onToggle({ checked: e.target.checked });
              }}
              name="asd"
            />}
          <label onClick={() => !isAnswerMode && setEdit(id)}>
            {msg || defStr}
          </label>
        </div>
        {/*Warning: InputItem is changing a controlled input of type text to be uncontrolled. 
           Input elements should not switch from controlled to uncontrolled (or vice versa).
           Decide between using a controlled or uncontrolled input element for the lifetime of the component.
           More info: https://fb.me/react-controlled-components*/
        }
        <input
          ref={r => this.inp = r}
          className="edit"
          type="text"
          onChange={this.handleChange}
          onBlur={this.handleSubmit}
          value={editing ? temp_value : msg}
        />
      </div>
    );
  }
}

InputItem.propTypes = {
  save: React.PropTypes.func,
  defStr: React.PropTypes.string,
  editble: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  unCheckable: React.PropTypes.bool,
  isAnswerMode: React.PropTypes.bool.isRequired
};

export default InputWithEdit;
