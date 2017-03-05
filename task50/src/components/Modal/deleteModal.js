import React, { Component } from "react";
import Modal from "./index";
import { DELETE_MODAL } from "../../constants/toggleTypes";
import { connect } from "react-redux";
import { resetToggled } from "../../actions/toggle";
const DeleteModal = ({ toggle, toggleDeleteFunc, ...restProps }) => {
  return (
    <Modal
      cancelFunc={() => toggleDeleteFunc()}
      active={toggle[DELETE_MODAL]}
      {...restProps}
    >
      <div>
        确定要删除此问卷?
      </div>
    </Modal>
  );
};

export default connect(
  (state, ownState) => ({
    toggle: state.toggle,
    ownState
  }),
  dispatch => ({
    toggleDeleteFunc: _ => {
      dispatch(resetToggled(DELETE_MODAL));
    }
  })
)(DeleteModal);
