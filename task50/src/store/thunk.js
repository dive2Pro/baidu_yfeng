export default function(store) {
  return next => action => {
    if (typeof action !== 'function') {
      next(action);
    } else {
      action(store.dispatch, store.getState);
    }
  };
}
