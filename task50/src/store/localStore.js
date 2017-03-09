/**
 * Created by hyc on 17-3-9.
 */
import crossStore from "store";
import {
  SAVE_TEMP_EXAM,
  SAVE_ANSWER,
  CHANGE_EXAM_STATE
} from "../constants/actionType";
const localStore = store => next => action => {
  const isActionFunc = typeof action !== "function";
  if (!crossStore.enabled) {
  } else if (
    isActionFunc &&
    action.type === (SAVE_TEMP_EXAM || SAVE_ANSWER || CHANGE_EXAM_STATE)
  ) {
    crossStore.set("Baidu_Ife", store.getState());
  }
  if (isActionFunc) {
  } else {
  }
  next(action);
};
export default localStore;
