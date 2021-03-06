/**
 * Created by hyc on 17-3-8.
 */
import { saveTempExam, restoreTempExam } from "./answer";
import configureMockStore from "redux-mock-store";
import thunk from "../store/thunk";
import * as toggleTypes from "../constants/toggleTypes";
import * as types from "../constants/actionType";
import initialState from "../store/initialState";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
test("saveTempExam with redux thunk ", () => {
  const initState = {
    ...initialState,
    toggle: {
      [toggleTypes.CURRENT_EXAM]: "e2"
    }
  };
  const expectAction = {};
  const store = mockStore(initState);
  const afterDispatch = store.dispatch(saveTempExam());
  const actions = store.getActions();
  const receiveState = store.getState();
  console.log(receiveState);
  const newStore = mockStore(receiveState);
  // newStore.dispatch(restoreTempExam());
  // const lastState = newStore.getState();
  // console.log(lastState);
});
