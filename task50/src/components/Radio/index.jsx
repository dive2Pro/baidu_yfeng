import React, { Component, PropTypes } from 'react';

class Radio extends Component {
  render() {
    const { clazz, checked, changeListener } = this.props;
    return (
      <div>
        <input
          className={clazz}
          checked={checked}
          type="radio"
          onChange={changeListener}
        />
      </div>
    );
  }
}

Radio.propTypes = {
  changeListener: PropTypes.func,
  checked: PropTypes.bool,
  clazz: PropTypes.string
};
export default Radio;
