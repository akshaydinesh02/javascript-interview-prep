Function.prototype.myCall = function (context = {}, ...args) {
  const fn = this;
  // Check if fn is a function or not
  if (typeof fn !== "function") {
    throw new Error("It's not callable.");
  }

  // Create a unique symbol
  const key = Symbol();

  // Add function to the context
  context[key] = fn;

  // Call the function
  const result = context[key](...args);

  // Remove function from context object after function call is done
  delete context[key];

  // Return result
  return result;
};

// Tests
// Case 1: undefined context
function greet(greeting, name) {
  console.log(`${greeting}, ${name}`);
}
greet.myCall(undefined, "Hello", "Akshay");

// Case 2: Custom object
let person1 = {
  name: "Akshay Dinesh",
};

let person2 = {
  name: "Elon musk",
};

function printAge(age) {
  console.log(`${this.name} is ${age} years old.`);
}
printAge.myCall(person1, 27);
printAge.myCall(person2, 50);

// Case 3: Non-function call
const invalidFn = {};
invalidFn.myCall = Function.prototype.myCall;
invalidFn.myCall();
