import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import initialState from "./initialState";
import thunk from "./thunk";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
// import * as crossStore from "store";
import crossStore from "store";
import localStore from "./localStore";
const routers = routerMiddleware(browserHistory);
const storedState = crossStore.get("Baidu_Ife");

const composeEnhancers = typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
  : compose;
const enhancer = composeEnhancers(
  applyMiddleware(localStore, thunk, routers) // other store enhancers if any
);

const store = createStore(rootReducer, storedState || initialState, enhancer);
const reduxHistory = syncHistoryWithStore(browserHistory, store);
export { store as default, reduxHistory };
