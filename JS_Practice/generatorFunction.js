/**
 * Generator Functions
 * 
 * 1. Introduced in the ES6 version, generator functions are a special class of functions.
 * 2. They can be stopped midway and then continue from where they had stopped.
 * 3. Generator functions are declared with the function* keyword instead of the normal function keyword:
 * 
 */

function* genFunc() {
  // Perform operation
}

/**
 * In the case of generator functions, when called, they do not execute the code, instead, they return a generator object. 
 * This generator object handles the execution.
 */

function* genFunc() {
  yield 3;
  yield 4;
}
genFunc(); // Returns Object [Generator] {}

/**
 * The generator object consists of a method called next(), this method when called, 
 * executes the code until the nearest yield statement, and returns the yield value.
 * 
 * Value property represents the yielded value. 
 * Done property tells us whether the function code is finished or not. (Returns true if finished).
 */

genFunc().next(); // Returns {value: 3, done:false}


function* iteratorFunc() {
  let count = 0;
  for (let i = 0; i < 2; i++) {
    count++;
    yield i;
  }
  return count;
}

let iterator = iteratorFunc();
console.log(iterator.next()); // {value:0,done:false}
console.log(iterator.next()); // {value:1,done:false}
console.log(iterator.next()); // {value:2,done:true} // this is return count line code