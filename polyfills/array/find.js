Array.prototype.myFind = function (callback, thisArg) {
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

  // Looping over array
  for (let i = 0; i < len; i++) {
    // Check for undefined elements in the array
    // Check if callback returns the element and send it back
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
};

// Test Cases
const arr6 = [5, 12, 8, 130, 44];
const found = arr6.myFind((num) => num > 10);
console.assert(found === 12, "Test Case 10 Failed");
