/**
 * CallBacks
 * 
 * A callback is a function that will be executed after another function gets executed. 
 * In javascript, functions are treated as first-class citizens, they can be used as an argument of 
 * another function, can be returned by another function, and can be used as a property of an object.
 * 
 * Functions that are used as an argument to another function are called callback functions.
 * 
 * JavaScript is a scripting language that is based on events. Instead of waiting for a reply before continuing, 
 * JavaScript will continue to run while monitoring for additional events. 
 * Callbacks are a technique of ensuring that a particular code does not run until another code has completed its execution.
 */

function divideByHalf(sum) {
  console.log(Math.floor(sum / 2));
}

function multiplyBy2(sum) {
  console.log(sum * 2);
}

function operationOnSum(num1, num2, operation) {
  var sum = num1 + num2;
  operation(sum);
}

operationOnSum(3, 3, divideByHalf); // Outputs 3

operationOnSum(5, 5, multiplyBy2); // Outputs 20