import { combineReducers } from 'redux';
import topic from './topic';
import toggle from './toggle';

export default combineReducers({
  topic,
  toggle
});
