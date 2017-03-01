import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import * as topicTypes from '../constants/topicType';
const initialState = {
  topic: {
    s1: {
      type: topicTypes.SINGLE_TYPE,
      text: '',
      options: ['nihao', '桃太郎', 'Macgrady']
    }
  }
};
const store = createStore(rootReducer, initialState);
export default store;
