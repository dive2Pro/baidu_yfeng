import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/index";
import {
  COLOR_BY_STATE,
  EXAM_DELETED,
  TEXT_BY_STATE,
  RELEASED,
  OUT_DATE
} from "../../constants/examStateType";
import { Link } from "react-router";
import ConfirmModal from "../Modal/ConfirmModal";
import { Table, Popconfirm, Button } from "antd";
import { CONFIRM_MODAL } from "../../constants/toggleTypes";

const CreateExamButton = ({ classname, onClick, text = "新建问卷" }) => {
  return <button className={classname} onClick={onClick}>{text}</button>;
};

const PublishStateText = ({ text, state }) => {
  return (
    <span style={COLOR_BY_STATE[state]}>{text || TEXT_BY_STATE[state]}</span>
  );
};
class ExamList extends Component {
  state = { selectedRowKeys: [] };

  renderCraeteNewExam = () => (
    <div className="newlist">
      <CreateExamButton
        classname="newlistLarge"
        onClick={() => this.createNewExam()}
      />
    </div>
  );
  deleteExam = (...ids) => {
    const { changeExamStateFunc } = this.props;
    ids.forEach(id => changeExamStateFunc(id, EXAM_DELETED));
  };
  createNewExam = () => {
    const { router } = this.props;
    router.push(`/edit/new`);
  };

  handleDeleteConfirm = () => {
    this.deleteExam(...this.state.selectedRowKeys);
  };

  flatDateToString = time => {
    let timing = time;
    if (time instanceof Date) {
      timing = time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDay();
    }
    return timing;
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  rendernExamList = () => {
    const { exam, message: allMessages, toggleFunc } = this.props;
    const data = [];
    Object.keys(exam)
      .filter(key => exam[key].examState !== EXAM_DELETED)
      .forEach(key => {
        const examItem = exam[key];
        const message = allMessages[examItem.id];
        const { titleId, time, examState, id: examId } = examItem;
        data.push({
          key: examId,
          examTitle: message[titleId],
          time,
          status: examState,
          operation: { examId, examState }
        });
      });

    const columns = [
      {
        title: "标题",
        dataIndex: "examTitle",
        width: "22%",
        key: "title",
        render: (text, item) => {
          return <Link to={`answer/${item.key}`}><span>{text}</span></Link>;
        }
      },
      {
        title: "时间",
        dataIndex: "time",
        width: "15%",
        key: "time"
      },
      {
        title: "状态",
        dataIndex: "status",
        width: "15%",
        key: "status"
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: "42%",
        key: "operation",
        render: ({ examId, examState }) => {
          const buttonUnClickable = examState === (RELEASED || OUT_DATE);
          return (
            <div>
              <Button disabled={buttonUnClickable}>
                <Link to={`/edit/${examId}`}>编辑</Link>
              </Button>

              <Popconfirm
                placement="top"
                title={"提示"}
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.deleteExam(examId)}
              >
                <Button disabled={buttonUnClickable}>
                  删除
                </Button>
              </Popconfirm>
              <Button>
                <Link to={`/show/${examId}`}>查看数据</Link>
              </Button>
            </div>
          );
        }
      }
    ];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    const footer = () => {
      return <Button onClick={() => toggleFunc(CONFIRM_MODAL)}>删除选择</Button>;
    };
    return (
      <Table
        footer={footer}
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
      />
    );
  };
  render() {
    const { exam } = this.props;
    const haveExam = exam &&
      Object.keys(exam).some(key => {
        return exam[key].examState !== EXAM_DELETED;
      });

    return (
      <div className="examlist">
        {!haveExam ? this.renderCraeteNewExam() : this.rendernExamList()}
        <ConfirmModal
          actType={CONFIRM_MODAL}
          confirmFunc={this.handleDeleteConfirm}
        >
          确定要删除选择的问卷?
        </ConfirmModal>
      </div>
    );
  }
}
const mapStateToProps = (state, routerState) => {
  return {
    exam: state.exam,
    message: state.message,
    toggle: state.toggle,
    router: routerState.router
  };
};
const mapDispatchToProps = dispatch => ({
  setExamCheckedFunc: bindActionCreators(actions.setExamChecked, dispatch),
  changeExamStateFunc: bindActionCreators(actions.changeExamState, dispatch),
  geneExamFunc: bindActionCreators(actions.geneExam, dispatch),
  toggleFunc: bindActionCreators(actions.toggle, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
