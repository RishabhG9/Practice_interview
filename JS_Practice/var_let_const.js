/**
 * HOISTING
 * Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.
 * This means that irrespective of where the variables and functions are declared, they are moved on top of the scope. 
 * The scope can be both local and global.
 */

function doSomething(){
  x = 33;
  console.log(x);
  var x;
} 
doSomething(); // Outputs 33 since the local variable “x” is hoisted inside the local scope

var x;
console.log(x); // Outputs "undefined" since the initialization of "x" is not hoisted
x = 23;

hoistedFunction();  // Outputs " Hello world! " even when the function is declared after calling

function hoistedFunction(){ 
  console.log(" Hello world! ");
} 

/**
 * Var
 * 
 * 1. Var is the functional scope declaration
 * 2. Hoisting is possible even if it is not declared, will try to access the variable it will give undefined value.
 * 3, We can declare variable again and again with the same name.
 */


 /* 
 * let and const
 * 1. Introduced in ECMA script 2016 (ES6)
 * 2. let and const is the block scope declaration
 * 3. Let can be re-assign but const cannot be reassign
 * 4. let and const  is also hoisted but not initiallized, Referencing the variable before variable declaration
 *    result in reference error because that variable is in 'Temporal Dead Zone'. 
 * 5. We cannot declare a variable again with the same name.
 */