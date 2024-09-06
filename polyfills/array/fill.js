Array.prototype.myFill = function (value, start = 0, end = this.length) {
  // Check if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  const array = Object(this);
  const len = array.length >>> 0;

  start = Math.max(start >= 0 ? start : len + start, 0);
  end = Math.min(end >= 0 ? end : len + end, len);

  for (let i = start; i < end; i++) {
    array[i] = value;
  }
  return array;
};

// Test Cases
const arr5 = [1, 2, 3, 4];
arr5.myFill(0, 1, 3);
console.assert(
  JSON.stringify(arr5) === JSON.stringify([1, 0, 0, 4]),
  "Test Case 9 Failed"
);
