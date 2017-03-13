import React, { Component } from "react";
import classnames from "classnames";
class Modal extends Component {
  handlermaskClick = e => {
    e.stopPropagation();
  };
  render() {
    const { active, cancelFunc, confirmFunc } = this.props;
    const clazz = classnames("modal", { active: active });
    return (
      <div className={clazz} onClick={cancelFunc}>
        <div className="modal-mask" onClick={this.handlermaskClick}>
          <div className="modal-content">
            <div className="modal-content-title">
              <h3>提示</h3>
              <span onClick={cancelFunc}>X</span>
            </div>
            <div className="modal-content-main">
              {this.props.children}
            </div>
            <div className="modal-content-bottom">
              <button onClick={confirmFunc}>确定</button>
              <button onClick={cancelFunc}>取消</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  cancelFunc: React.PropTypes.func,
  confirmFunc: React.PropTypes.func,
  clazz: React.PropTypes.string,
  children: React.PropTypes.element.isRequired,
  active: React.PropTypes.bool.isRequired
};
export default Modal;
