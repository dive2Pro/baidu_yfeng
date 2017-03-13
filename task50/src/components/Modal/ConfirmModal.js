import React, { Component } from "react";

import { Modal as AntModal } from "antd";
import { CONFIRM_MODAL } from "../../constants/toggleTypes";
import { connect } from "react-redux";
import { resetToggled } from "../../actions/toggle";
const ConfirmModal = ({ toggle, ...restProps }) => {
  const { children, confirmFunc, dispatch, actType } = restProps;
  return (
    <AntModal
      active={toggle[actType || CONFIRM_MODAL]}
      visible={toggle[actType || CONFIRM_MODAL]}
      cancelText="取消"
      okText="确定"
      onOk={e => {
        confirmFunc && confirmFunc(e);
        dispatch(resetToggled(actType || CONFIRM_MODAL));
      }}
      onCancel={() => dispatch(resetToggled(actType || CONFIRM_MODAL))}
      title="提示"
    >
      {children || "确定要删除此问卷?"}
    </AntModal>
  );
};
ConfirmModal.ProtoTypes = {
  confirmFunc: React.PropTypes.func,
  actType: React.PropTypes.string
};
export default connect((state, ownState) => ({
  toggle: state.toggle,
  ownState
}))(ConfirmModal);
