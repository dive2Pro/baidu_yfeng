import React, { Component } from "react";
import { Modal as AntModal } from "antd";

const ConfirmModal = ({ ...restProps }) => {
  const { children, onHandleOk, onHandleCancel, visible } = restProps;
  return (
    <AntModal
      active={true}
      visible={!!visible}
      cancelText="取消"
      okText="确定"
      onOk={e => {
        onHandleOk && onHandleOk(e);
      }}
      onCancel={e => onHandleCancel && onHandleCancel(e)}
      title="提示"
    >
      {children || "确定要删除此问卷?"}
    </AntModal>
  );
};
ConfirmModal.ProtoTypes = {
  onHandleOk: React.PropTypes.func,
  onHandleCancel: React.PropTypes.func,
  visible: React.PropTypes.bool.isRequired
};
export default ConfirmModal;
