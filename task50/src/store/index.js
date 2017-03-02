import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import * as topicTypes from '../constants/topicType';
import logger from './logger';
import thunk from './thunk';
const initialState = {
  topic: {
    s1: {
      type: topicTypes.SINGLE_TYPE,
      text: '',
      options: ['nihao', '桃太郎', 'Macgrady']
    }
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
