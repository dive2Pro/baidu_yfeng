import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: props.defStr
    };
  }

  handleEdit = () => {
    !this.props.editble &&
      this.setState((prestate, props) => {
        return { editing: true };
      });
  };

  componentDidUpdate(prevProps) {
    console.log(this.state);
  }

  handleSubmit = () => {
    this.setState({
      editing: false
    });
    const { save, defStr } = this.props;
    const val = this.inp.value.trim();
    if (val) {
      save(val);
    } else {
      save(defStr);
    }
  };

  handleChange = event => {
    if (this.state.editing) {
      this.setState({
        title: event.target.value
      });
    }
  };

  render() {
    const { title, editing } = this.state;
    const { inputType, checked, onToggle } = this.props;
    const clazz = classnames({ editing: editing }, 'inputitem');
    console.log(clazz);
    return (
      <div className={clazz}>
        <div className="view">
          <input
            type={inputType}
            className="toggle"
            checked={checked}
            onChange={onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {title}
          </label>
        </div>
        <input
          ref={r => this.inp = r}
          className="edit"
          onChange={this.handleChange}
          onBlur={this.handleSubmit}
          value={title}
        />
      </div>
    );
  }
}

InputItem.propsTypes = {
  save: PropTypes.func,
  defStr: PropTypes.string,
  editble: PropTypes.bool,
  onToggle: PropTypes.func
};

export default InputItem;
