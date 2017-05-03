import React, { Component } from 'react';
import {
  COLOR_BY_STATE,
  EXAM_DELETED,
  TEXT_BY_STATE,
  RELEASED,
  OUT_DATE
} from '../../constants/examStateType';
import { Link, withRouter } from 'react-router';
import ConfirmModal from '../Modal/ConfirmModal';
import { Table, Popconfirm, Button, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
const CreateExamButton = ({ classname, onClick, text = '新建问卷' }) => {
  return <button className={classname} onClick={onClick}>{text}</button>;
};

const PublishStateText = ({ text, state }) => {
  return <span style={COLOR_BY_STATE[state]}>{text || TEXT_BY_STATE[state]}</span>;
};

const openNomoreExamShow = msg => {
  notification.open({
    message: '提醒',
    description: msg
  });
};

@inject('ExamStore', 'AnswerStore')
@observer
class ExamList extends Component {
  state = { selectedRowKeys: [] };
  @observable isModalOpen = false;
  @observable _selectedRowKeys = [];
  renderCraeteNewExam = () => (
    <div className="newlist">
      <CreateExamButton classname="newlistLarge" onClick={() => this.createNewExam()} />
    </div>
  );
  deleteExam = (...ids) => {
    this.props.ExamStore.deleteExams(...ids);
  };
  createNewExam = () => {
    const { router } = this.props;
    router.push(`/edit/new`);
  };
  routerWillLeave = nextLocation => {
    console.log(nextLocation);
    const { AnswerStore } = this.props;
    const { pathname } = nextLocation;
    if (pathname.startsWith('/show')) {
      const id = pathname.substr(pathname.lastIndexOf('/') + 1);
      const answer = AnswerStore.getAnswer(id);
      if (!answer) {
        openNomoreExamShow('目前的答卷没有回答记录');
        return false;
      }
    }
  };
  handleDeleteConfirm = () => {
    this.deleteExam(...this._selectedRowKeys);
    this._selectedRowKeys = [];
    this.handleSwitchModal();
  };
  componentDidMount() {
    const { router } = this.props;
    router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }
  onSelectChange = selectedRowKeys => {
    this._selectedRowKeys = selectedRowKeys;
  };
  handleSelects = () => {
    if (this._selectedRowKeys.length > 0) {
      this.handleSwitchModal();
    }
  };
  handleCreateNewOne = () => {
    const { ExamStore, router } = this.props;
    const exam = ExamStore.createExam();
    console.log(exam);
    router.push(`/edit/${exam.id}`);
  };
  rendernExamList = () => {
    const { ExamStore } = this.props;
    const exams = ExamStore.exams;
    const data = [];
    exams.values().filter(val => val.examState !== EXAM_DELETED).forEach(examItem => {
      const { title, time, examState, id: examId } = examItem;
      data.push({
        key: examId,
        examTitle: title,
        time,
        status: examState,
        operation: { examId, examState }
      });
    });

    const columns = [
      {
        title: '标题',
        dataIndex: 'examTitle',
        width: '22%',
        key: 'title',
        render: (text, item) => {
          return (
            <Link style={{ color: '#222', fontSize: '1.2em' }} to={`answer/${item.key}`}>
              <span>{text}</span>
            </Link>
          );
        }
      },
      {
        title: '时间',
        dataIndex: 'time',
        width: '15%',
        key: 'time'
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: '15%',
        key: 'status'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '42%',
        key: 'operation',
        render: ({ examId, examState }) => {
          const buttonUnClickable = examState === (RELEASED || OUT_DATE);
          return (
            <div>
              <Button disabled={buttonUnClickable}>
                <Link to={`/edit/${examId}`}>编辑</Link>
              </Button>

              <Popconfirm
                placement="top"
                title={'提示'}
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.deleteExam(examId)}>
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
      selectedRowKeys: this._selectedRowKeys,
      onChange: this.onSelectChange
    };
    const footer = () => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={this.handleSelects}>删除选择</Button>
          <Button onClick={this.handleCreateNewOne}>新建档案</Button>
        </div>
      );
    };
    return (
      <Table
        ref={table => this.table = table}
        footer={footer}
        rowSelection={rowSelection}
        dataSource={data}
        columns={columns}
      />
    );
  };
  handleSwitchModal = () => {
    this.isModalOpen = !this.isModalOpen;
  };
  render() {
    const { ExamStore } = this.props;

    return (
      <div className="examlist">
        {ExamStore.isEmptyStore ? this.renderCraeteNewExam() : this.rendernExamList()}
        <ConfirmModal
          visible={this.isModalOpen}
          onHandleOk={this.handleDeleteConfirm}
          onHandleCancel={this.handleSwitchModal}>
          确定要删除选择的问卷?
        </ConfirmModal>
      </div>
    );
  }
}

export default withRouter(ExamList);
