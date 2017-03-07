import React, { Component } from "react";
import Modal from "./index";
import { CONFIRM_MODAL } from "../../constants/toggleTypes";
import { connect } from "react-redux";
import { resetToggled } from "../../actions/toggle";
const ConfirmModal = ({ toggle, ...restProps }) => {
  const { children, confirmFunc, dispatch, actType } = restProps;
  return (
    <Modal
      cancelFunc={() => dispatch(resetToggled(actType || CONFIRM_MODAL))}
      active={toggle[actType || CONFIRM_MODAL]}
      {...restProps}
      confirmFunc={e => {
        confirmFunc(e);
        dispatch(resetToggled(actType || CONFIRM_MODAL));
      }}
    >
      <div>
        {children || "确定要删除此问卷?"}
      </div>
    </Modal>
  );
};

export default connect((state, ownState) => ({
  toggle: state.toggle,
  ownState
}))(ConfirmModal);
