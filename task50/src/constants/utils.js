/**
 * unique uuid
 */
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4();
}

export function moveElementInArray(arr, v, positionChange) {
  const oldPosition = arr.indexOf(v);
  if (oldPosition < 0) {
    return arr;
  }
  let diffPosition = oldPosition + positionChange;
  if (diffPosition < 0) {
    diffPosition = 0;
  } else if (diffPosition > arr.length) {
    diffPosition = arr.length;
  }

  const newArr = arr.slice();
  const removed = newArr.splice(oldPosition, 1)[0];
  newArr.splice(diffPosition, 0, removed);
  return newArr;
}

export function deleteElementFromArray(arr, v) {
  const position = arr.indexOf(v);
  const newArr = arr.slice();
  newArr.splice(position, 1);
  return newArr;
}
export function fromCharCode(code) {
  return String.fromCharCode(code)
}