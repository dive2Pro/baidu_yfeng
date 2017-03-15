import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ExamList from "./components/ExamList/index";
import NoMatch from "./components/NoMatch/index";
import { Provider } from "mobx-react";
import { browserHistory } from "react-router";
import { Router, Route, IndexRoute } from "react-router";
import EditorContainer from "./components/Editor/index";
import ExamShowContainer from "./components/ExamShow/index";
require("../styles/index.scss");
import ExamStore from "./mobxStore/index";
import AnswerStore from "./mobxStore/AnswerStore";
const routers = (
  <Router component={App}>
    <IndexRoute component={ExamList} />
    <Route path="/list" component={ExamList} />
    <Route path="/edit(/:examId)" component={EditorContainer} />
    <Route path="/show(/:examId)" component={ExamShowContainer} />
    <Route path="/answer/:examId" component={EditorContainer} />
    <Route path="/" component={ExamList} />
    <Route path="*" component={NoMatch} />
  </Router>
);

ReactDOM.render(
  <Provider ExamStore={ExamStore} AnswerStore={AnswerStore}>
    <Router history={browserHistory}>
      {routers}
    </Router>
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(<NextApp />, document.getElementById("root"));
  });
}
