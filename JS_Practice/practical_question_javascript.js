/**
 *  Question 1
 *  We need to change this block scope variable in that format so that we can get reference error 
 *  or in short we cannot access x and y outside of its scope
 * */

function show1() {
  {
    // (function(){
    //   var x = 9;
    //   var y = 10;
    // })()
    var x = 9;
    var y = 10;
  }
  console.log("QUESTION 1", x, y);
}
show1();
/**
 * OUTPUT
 * 9 10 (General Code)
 * Reason : Because var is global/ functional scope that why it can be accessible outside of the {}
 * There are 2 ways to get the desired output
 * 1st By changing var to "let" or "const", because those are block scope variable they cannot be access outside the scopes
 * 2nd By Using IIFE (immediate Invoking Function expression) without chaning variable declaration type
 * (function(){
      var x = 9;
      var y = 10;
    })()
 */


/**
 *  Question 2
 *  What will be the output
 * */

const obj1 = {
  a: 5,
  b: 10,
  sum() {
    return this.a + this.b
  }
}

const result1 = obj1.sum;
// const result1 = obj1.sum.bind(obj1);
console.log("QUESTION 2", result1());

/**
 * OUTPUT
 * NaN
 * Reason : result1 is just a reference to the "sum" function it is not bound with obj1 that why it is giving NaN. as it is called without any object context, 
 * the value of "this" becomes undefined.
 * Solution is : const result1 = obj1.sum.bind(obj1);
 */


/**
 *  Question 3
 *  What is the output
 * */

console.log("QUESTION 3", 3 + true);

/**
 * OUTPUT
 * 4
 * Reason : "+"" indication concatination also but it checks the other parameter
 * due to implicit conversion true => 1 and false => 0, so it becomes 3+1 = 4 
 */


/**
 *  Question 4
 *  What is the output
 * */
console.log("-------------------QUESTION 4---------------");
console.log("var");
for (var i = 0; i < 5; i++) {
  // setTimeout(() => {
  //   console.log(i)
  // }, 100);
}

/**
 * OUTPUT
 * 5 5 5 5 5
 * Reason : this setTimeout function creates a closure where "i" variable can be access even after for loop gets end. However "i" is declated using var 
 * as it functional scope, so "i" updated each time run in the loop and as soon as this setTimeout async executed it showed the value of "i" which is 5
 */
console.log("let");
for (let i = 0; i < 5; i++) {
  // setTimeout(() => {
  //   console.log(i)
  // }, 100);
}

/**
 * OUTPUT
 * 0 1 2 3 4
 * Reason : But if we declare the variable i using let rather than var so its a block scope variable so everytime i value will be new.
 */



/**
 *  Question 5
 *  What is the output
 * */

console.log("-----QUESTION 5-----")

const obj5a = {};
const obj5b = { key: "b" }
const obj5c = { key: "c" }

obj5a[obj5b] = 123;
obj5a[obj5c] = 456;

console.log(obj5a[obj5b])

/**
 * OUTPUT
 * [object Object] = 456
 * Reason : coz obj5b cannot be converted as key so, it directly assigned to obj5a as a key which was "[object Object]" a STRING
 * So, obj5a[object Object] = 123;
 * obj5a[object Object] = 456;, both were same keys
 */

/**
 *  Question 6
 *  What is the output. Find the  bug if any
 * */

console.log("-----QUESTION 6-------")

function showMessage6(marks6) {
  const message = marks6 || 'Absent';
  // const message = marks6 ?? 'Absent';
  console.log(`Marks ${message}`)
}

showMessage6(29);
showMessage6(0);
showMessage6(46);

/**
 * OUTPUT
 * Actual : 29 Absent 46
 * Expected : 29 0 46
 * Reason : '||' operator checks whether the first value is true or not if its true it will return that otherwise it will return 2nd value.
 * But now we need to replace '||' ==> '??' this expression returns left value only, if there is "null" or "undefined" value in left then 
 * in that case only it will give value of RHS
 * const message = marks6 ?? 'Absent';
 */




/**
 *  Question 7
 *  What is the output
 * */

console.log("--------QUESTION 7-------")

console.log(+true)
console.log(-true);
console.log(-false)
console.log(+false)

/**
 * OUTPUT
 * 1 -1 -0 0
 */


/**
 *  Question 8
 *  What is the output
 * */

console.log("---------QUESTION 8---------------")


console.log([] == "");
console.log({} == "");
console.log({} == {});
console.log([] == {});
console.log([] == []);

/**
 * OUTPUT
 * T F F F F
 * 
 * Reason : 
 * 
 * [] == ""   ===> Loose equality (==) coerces types to compare. [] becomes "" when coerced. "" == "" → true
 * 
 * {} == "" ===> Objects get coerced to "PRIMITIVE DATATYPE". {}.toString() → "[object Object]". "[object Object]" == "" → false
 * 
 * {} == {} ===> Object comparison with == or === compares references, not content. Two different {} objects are not the same in memory.
 * 
 * [] == {} ===> When comparing different object types, JavaScript tries to coerce both to "PRIMITIVE DATATYPE". "" == "[object Object]" → false
 * 
 * [] == [] ===> Object comparison with == or === compares references, not content. Two different {} objects are not the same in memory.
 * 
 * 
 * 
 * Object vs. Primitive	Object → primitive (toString() or valueOf())
 * Object vs. Object	Compared by reference
 * Same Type (e.g., string)	Compared by value
 * Object vs. Object Literal	Reference comparison (unless explicitly coerced)
 */


/**
 *  Question 9
 *  What is the output
 * */

console.log("QUESTION9")

/**
 * Question 10
 * 
 * Can you write a higher-order function that repeats a function n times?
 */

function repeat(fn, n) {
  return function (x) {
    for (let i = 0; i < n; i++) {
      x = fn(x);
    }
    return x;
  }
}

const double = n => n * 2;
const repeatDouble = repeat(double, 3);
console.log(repeatDouble(2)); // 16  (2*2*2*2)


/**
 * Question 11
 * 
 * Write a function sleep(ms) that waits for ms milliseconds using a promise and async/await.
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Start");
  await sleep(2000);
  console.log("2 seconds later");
}

run();
