import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import initialState from "./initialState";
import thunk from "./thunk";
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
const routers = routerMiddleware(browserHistory);

const composeEnhancers = typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
    )
  : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, routers) // other store enhancers if any
);
const store = createStore(rootReducer, initialState, enhancer);
const reduxHistory = syncHistoryWithStore(browserHistory, store);
export { store as default, reduxHistory };
