/**
 * ************** CLOSURE ********
 * Closures are an ability of a function to remember the variables and 
 * functions that are declared in its outer scope (lexical scoping).
 * 
 */
function randomFunc() {
  var obj1 = { name: "Vivian", age: 45 };

  return function () {
    console.log(obj1.name + " is " + "awesome"); // Has access to obj1 even when the randomFunc function is executed

  }
}

var initialiseClosure = randomFunc(); // Returns a function

initialiseClosure();
/* 
 * randomFunc(), instead of destroying the value of obj1 after execution, 
 * saves the value in the memory for further reference. This is the reason why the returning 
 * function is able to use the variable declared in the outer scope even after the function is already executed.
 * 
 * This ability of a function to store a variable for further reference even after it is executed is called Closure
 * 
 */

var sum = function (a) {
  console.log("Live Viewers", a)
  var c = 4;
  return function (b) {  // return anonymous function
    return a + b + c     // a & c is accessible here so this is called lexical scoping, the variable or function can be access from the parent function, 
    // a & c value is not lost its still retain

  }
}
const store = sum(2);
// Now store need to be called which have anonymous function which will return a + b + c, so this is closure, where its remmembering the function or variable
// which has been already executed inside sum function a & c variable but still they are accessible inside the anonymous function this is known as closure
console.log("STORE", store(8));


//  ********** 2nd example *****

var newSum = function (a, b, c) {
  return {
    getSumTwo: function () {
      return a + b
    },
    getSumThree: function () {
      return a + b + c
    }
  }
}

const new_store = newSum(3, 4, 5)
console.log("Store sum two", new_store.getSumTwo())
console.log("store sum three", new_store.getSumThree())

const new_store1 = newSum(9, 10, 11)
console.log("Store sum two", new_store1.getSumTwo())
console.log("store sum three", new_store1.getSumThree())