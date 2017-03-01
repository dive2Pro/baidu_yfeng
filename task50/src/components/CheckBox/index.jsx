import React, { Component, PropTypes } from 'react';

class CheckBox extends Component {
  render() {
    const { checked, clazz, changeListener } = this.props;
    return (
      <div>
        <input
          className={clazz}
          checked={checked}
          type="checkbox"
          onChange={changeListener}
        />
      </div>
    );
  }
}

CheckBox.propTypes = {
  changeListener: PropTypes.func,
  checked: PropTypes.bool,
  clazz: PropTypes.string
};
export default CheckBox;
