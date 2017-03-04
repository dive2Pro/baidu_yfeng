import { combineReducers } from 'redux';
import topic from './topic';
import toggle from './toggle';
import exam from './exam/index';
import message from './message/index';
import question from './question/index';
import answer from './answer/index'
import user from './user/index'
export default combineReducers({
  topic,
  toggle,
  exam,
  message,
  question,
  answer,
  user
});
