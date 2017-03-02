import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
class InputItem extends Component {
  componentDidUpdate(prevProps) {
    console.log(this.state);
    const { editing } = this.props;
    if (editing) {
      this.inp.focus();
    }
  }
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
      inputType,
      checked,
      onToggle,
      setEdit,
      msg,
      editing,
      id,
      unCheckable
    } = this.props;
    const { temp_value } = this.state;
    const clazz = classnames({ editing: editing }, 'inputitem');
    return (
      <div className={clazz}>
        <div className="view">
          {unCheckable ||
            <input
              type={inputType || 'radio'}
              className="toggle"
              checked={checked}
              onChange={onToggle}
            />}
          <label onDoubleClick={() => setEdit(id)}>
            {msg}
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

InputItem.propsTypes = {
  save: PropTypes.func,
  defStr: PropTypes.string,
  editble: PropTypes.bool,
  onToggle: PropTypes.func,
  unCheckable: PropTypes.bool
};

export default InputItem;
