/**
 * Both REST parameter and SPREAD operator were introduced in the ES6 version of javascript.
 * 
 */

/**
 * -------****** Rest parameter ( … ) *******-------------------
 * Using the rest parameter syntax, we can create functions that can take a variable number of arguments.
 * Any number of arguments will be converted into an array using the rest parameter.
 * Rest parameter should always be used at the last parameter of a function:
 */

function addNumber(a, b, c) {
  return a + b + c
}

const result = addNumber(4, 5, 6);
console.log("Result before rest", result)

// But what if there are large numbres of parameters than

function addNumber2(a, b, c, ...others) { //rest operator came from es6 version
  console.log("Rest", others);
  return a + b + c
}

// Rest [7,8,9,10]

const result2 = addNumber2(4, 5, 6, 7, 8, 9, 10)
console.log("Result after rest", result2);


/**
 * ---------------****** SPREAD operator ********-----------
 * Although the syntax of the spread operator is exactly the same as the rest parameter, 
 * the spread operator is used to spreading an array, and object literals. 
 * We also use spread operators where one or more arguments are expected in a function call.
 * 
 */


var names = ["a", "b", "c", "d", "e"];
function getNames(name1, name2, name3) {
  console.log(name1, name2, name3)
}

// NORMAL WAY
getNames(names[0], names[1], names[2]) // a b c

// USING SPREAD OPERATOR
getNames(...names) // a b c

getNames(names)  // [ 'a', 'b', 'c' ] undefined undefined


var students = {
  name: "Rishabh",
  age: "28",
  hobbies: ["Games", "football"]
}

// const age = students.age           // same as below
// const { age } = students // Destructuring

// const { age, ...rest } = students
// console.log(age, rest);   // 28 { name: 'Rishabh', hobbies: [ 'Games', 'football' ] }

// const { ...rest } = students
// console.log(rest) // { name: 'Rishabh', age: '28', hobbies: [ 'Games', 'football' ] }


// change the age of new student object and keep everything same using spread operator
const newStudent = {
  ...students,
  age: 30
}
console.log("New Student", newStudent)  // New Student { name: 'Rishabh', age: 30, hobbies: [ 'Games', 'football' ] }



/**
 * --------Key differences between rest parameter and spread operator:---------
 * Rest parameter is used to take a variable number of arguments and turns them into an array while the spread operator takes an array or an object and spreads it
 * Rest parameter is used in function declaration whereas the spread operator is used in function calls.
 */