import React, { Component } from 'react';
import classnames from 'classnames';
class Modal extends Component {
  handlermaskClick = e => {
    e.stopPropagation();
  };
  render() {
    const { active, cancelFunc } = this.props;
    const clazz = classnames('modal', { active: active });
    return (
      <div className={clazz} onClick={cancelFunc}>
        <div className="modal-mask" onClick={this.handlermaskClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
