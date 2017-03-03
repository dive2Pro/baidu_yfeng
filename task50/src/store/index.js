import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import * as topicTypes from '../constants/topicType';
import * as examStateTypes from '../constants/examStateType';
import logger from './logger';
import thunk from './thunk';
const initialState = {
  topic: {
    s1: {
      type: topicTypes.SINGLE_TYPE,
      text: '',
      options: ['nihao', '桃太郎', 'Macgrady']
    }
  },
  exam: {
    e1: {
      state: examStateTypes.UN_RELEASE,
      titleId: 't1',
      time: '2016-9-10'
    },
    e2: {
      state: examStateTypes.RELEASED,
      titleId: 't2',
      time: '2016-9-10'
    },
    e3: {
      state: examStateTypes.OUT_DATE,
      titleId: 't3',
      time: '2016-9-10'
    }
  },
  message: {
    t1: '这是一份',
    t2: '甜菜重算阿萨大三的',
    t3: '份份额额天天，失误'
  }
};
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
  : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk) // other store enhancers if any
);
const store = createStore(rootReducer, initialState, enhancer);
export default store;
