/**
 * Created by hyc on 17-3-4.
 */

import * as topicTypes from "../constants/topicType";
import * as examStateTypes from "../constants/examStateType";

const initialState = {
  topic: {
    s1: {
      type: topicTypes.SINGLE_TYPE,
      text: "",
      options: ["nihao", "桃太郎", "Macgrady"]
    }
  },
  exam: {
    e1: {
      examState: examStateTypes.UN_RELEASE,
      titleId: "t1",
      time: "2017-9-10",
      questionsId: ["q1", "q2", "q3"],
      id: "e1"
    },
    e2: {
      examState: examStateTypes.RELEASED,
      titleId: "t2",
      time: "2014-9-10",
      questionsId: ["q1", "q2", "q3"],
      id: "e2"
    },
    e3: {
      examState: examStateTypes.OUT_DATE,
      titleId: "t3",
      time: "2015-9-10",
      questionsId: ["q1", "q2", "q3"],
      id: "e3"
    }
  },
  message: {
    e1: {
      t1: "这是一份",
      t2: "甜菜重算阿萨大三的",
      t3: "份份额额天天，失误",
      t4: "什么最多？",
      an1: "就这样，没了",
      an2: "什么爹！！！",
      an3: "走过．．．．．",
      t5: "什么最没用？",
      t6: "什么更儿童？",
      t7: "什么最嘎洒灯？"
    },
    e2: {
      t1: "这是一份",
      t2: "甜菜重算阿萨大三的",
      t3: "份份额额天天，失误",
      t4: "什么最多？",
      an1: "就这样，没了",
      an2: "什么爹！！！",
      an3: "走过．．．．．",
      t5: "什么最没用？",
      t6: "什么更儿童？",
      t7: "什么最嘎洒灯？"
    },
    e3: {
      t1: "这是一份",
      t2: "甜菜重算阿萨大三的",
      t3: "份份额额天天，失误",
      t4: "什么最多？",
      an1: "就这样，没了",
      an2: "什么爹！！！",
      an3: "走过．．．．．",
      t5: "什么最没用？",
      t6: "什么更儿童？",
      t7: "什么最嘎洒灯？"
    }
  },
  user: {
    u1: {
      e1: {},
      e2: {}
    },
    u2: {
      e2: {},
      e3: {}
    },
    u3: {
      e1: {},
      e3: {}
    }
  },
  answer: {
    e1: {
      userIds: ["u1", "u2"],
      questions: {
        q1: { t5: 2, t1: 4 },
        q2: { t6: 2, t7: 2, an1: 1, t5: 6 },
        q3: { t6: 1 }
      }
    },
    e2: {
      userIds: ["u2", "u3"],
      questions: {
        q1: { t5: 2 },
        q2: { t6: 2, t7: 2, an1: 1, t5: 6 }
      }
    },
    e3: {
      userIds: ["u1", "u2", "u3", "u4"],
      questions: {
        q1: { t5: 1, t6: 2, t7: 2 },
        q2: { an1: 3, t5: 2, t7: 4, t6: 1 },
        q3: { c2: 2 }
      }
    }
  },
  question: {
    q1: {
      id: "q1",
      titleId: "t1",
      type: topicTypes.SINGLE_TYPE,
      optionsId: ["t5", "t6", "t7"]
    },
    q2: {
      id: "q2",
      titleId: "t2",
      type: topicTypes.MULTI_TYPE,
      optionsId: ["t5", "t6", "t7", "an1"],
      require: true
    },
    q3: {
      id: "q3",
      titleId: "t3",
      type: topicTypes.TEXT_TYPE,
      contentId: "t5"
    },
    tempIds: []
  }
};

export default initialState;
