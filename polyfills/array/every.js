Array.prototype.myEvery = function (callback, thisArg) {
  // Check if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  // Check if callback is to run for each element is a function or not
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Convert 'this' into an object ensuring it behaves like an array
  const array = Object(this);

  // Ensure length is a non-negative integer. Convert len to 32-bit unsigned integer
  const len = array.length >>> 0;

  // Looping over original array
  for (let i = 0; i < len; i++) {
    // Check for undefined elements in the array
    // Check if the callback condition is true for every element present in array
    if (i in array && !callback.call(thisArg, array[i], i, array)) {
      return false;
    }
  }
  return true;
};

// Test Cases
const arr4 = [1, 2, 3];
console.assert(
  arr4.myEvery((num) => num > 0),
  "Test Case 7 Failed"
);
console.assert(!arr4.myEvery((num) => num > 2), "Test Case 8 Failed");
