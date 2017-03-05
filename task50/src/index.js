import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ExamList from "./components/ExamList/index";
import NoMatch from "./components/NoMatch/index";
import { Provider } from "react-redux";
import store, { reduxHistory } from "./store/index";
import { Router, Route, IndexRoute } from "react-router";
import EditorContainer from "./components/Editor/index";
import ExamShowContainer from "./components/ExamShow/index";

require("../styles/index.scss");

const routers = (
  <Router component={App}>
    <IndexRoute component={ExamList} />
    <Route path="/list" component={ExamList} />
    <Route path="/edit(/:examId)" component={EditorContainer} />
    <Route path="/show(/:examId)" component={ExamShowContainer} />
    <Route path="/" component={ExamList} />
    <Route path="*" component={NoMatch} />
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={reduxHistory}>
      {routers}
    </Router>
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    var NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
