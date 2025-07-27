/**
 * Arrow Function
 * 
 * Arrow functions were introduced in the ES6 version of javascript. 
 * They provide us with a new and shorter syntax for declaring functions. Arrow functions can only be used as a function expression.
 * 
 * Arrow functions are declared without the function keyword. 
 * If there is only one returning expression then we don’t need to use the return keyword as well in an arrow function as shown in the example above. 
 * Also, for functions having just one line of code, curly braces { } can be omitted.
 */

//----------------------------------------------------------------
// Traditional Function Expression
var add = function (a, b) {
  return a + b;
}

// Arrow Function Expression
var arrowAdd = (a, b) => a + b;

// -----------------------------------------------------------------

// Traditional function expression
var multiplyBy2 = function (num) {
  return num * 2;
}
// Arrow function expression
var arrowMultiplyBy2 = num => num * 2;

// -----------------------------------------------------------------

var obj1 = {
  valueOfThis: function () {
    return this;
  }
}
var obj2 = {
  valueOfThis: () => {
    return this;
  }
}

obj1.valueOfThis(); // Will return the object obj1
obj2.valueOfThis(); // Will return window/global object

/**
 * The biggest difference between the traditional function expression and the arrow function is the handling of 
 * this keyword. By general definition, this keyword always refers to the object that is calling the function. 
 * As you can see in the code above, obj1.valueOfThis() returns obj1 since this keyword refers to the object calling the function.
 * 
 * 
 * In the arrow functions, there is no binding of this keyword. This keyword inside an arrow function does 
 * not refer to the object calling it. It rather inherits its value from the parent scope which is the 
 * window object in this case. Therefore, in the code above, obj2.valueOfThis() returns the window objec
 */