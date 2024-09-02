Function.prototype.myApply = function (context = {}, args) {
  const fn = this;
  // Check if fn is a function or not
  if (typeof fn !== "function") {
    throw new Error("It's not callable.");
  }

  // Check if args is typeof array
  if (!Array.isArray(args)) {
    throw new Error("Second argument must be an array");
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
greet.myApply(undefined, ["Hello", "Akshay"]);

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
printAge.myApply(person1, [27]);
printAge.myApply(person2, [50]);

// Case 3: Non-function call
const invalidFn = {};
invalidFn.myApply = Function.prototype.myApply;
invalidFn.myApply();
