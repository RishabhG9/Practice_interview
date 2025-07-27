/**
 * Currying
 * 
 * Currying is an advanced technique to transform a function of arguments n, to n functions of one or fewer arguments.
 */

function add (a) {
  return function(b){
    return a + b;
  }
}

add(3)(4) 

/* *******************************************  */
function sum(a) {
  return function (b) {
    if (b)
      return sum(a + b)
    else {
      return a
    }
  }

}

console.log(sum(1)(2)(3)(4)())