/**
 * IIFE stands for Immediately invoked function
 * 
 * 1. An Immediately Invoked Function ( known as IIFE and pronounced as IIFY) is a function that runs as soon as it is defined.
 * 
 * 2. 
 * function() {
    //Do something;
    }
 * Compiler gives an error since the syntax of declaring a function is wrong in the code above.
  * To remove this error, we add the first set of parenthesis that tells the compiler that the function is not a function declaration, 
  * instead, it’s a function expression.
  * 
  * 3. The second set of parenthesis:
    (function (){
      //Do something;
    })();
  * From the definition of an IIFE, we know that our code should run as soon as it is defined.
  * A function runs only when it is invoked. If we do not invoke the function, the function declaration is returned:
  * Therefore to invoke the function, we use the second set of parenthesis.
  * 
 */

// SYNTAX
(function(){ 
  // Do something;
})();