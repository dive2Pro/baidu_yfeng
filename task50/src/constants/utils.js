/**
 * unique uuid
 */
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4();
}

export function insertElementInArray(arr, v, position) {
  const newArr = arr.slice();
  newArr.splice(position, 0, v);
  return newArr;
}

export function moveElementInArray(arr, v, positionChange) {
  const oldPosition = arr.indexOf(v);
  if (oldPosition < 0) {
    return arr;
  }
  if (positionChange == null) {
    return deleteElementFromArray(arr, v);
  } else {
    positionChange = +positionChange;
  }
  console.info(
    "moveElementInArray  " + v + " posiitonChange " + positionChange
  );
  let diffPosition = oldPosition + positionChange;
  if (diffPosition < 0) {
    diffPosition = 0;
  } else if (diffPosition > arr.length) {
    diffPosition = arr.length;
  }

  const newArr = arr.slice();
  const removed = newArr.splice(oldPosition, 1)[0];
  newArr.splice(diffPosition, 0, removed);
  console.info(arr, "after", newArr, diffPosition);

  return newArr;
}

export function deleteElementFromArray(arr, v) {
  const position = arr.indexOf(v);
  const newArr = arr.slice();
  newArr.splice(position, 1);
  return newArr;
}
export function fromCharCode(code) {
  return String.fromCharCode(code);
}

export function debounce(func) {
  let timer, context, result, args;
  const later = function() {
    result = func.apply(context, args);
  };
  return (...rest) => {
    console.log("rest= ", rest);
    context = this;
    args = rest;
    timer && clearTimeout(timer);
    timer = setTimeout(later, 500);
    return result;
  };
}
