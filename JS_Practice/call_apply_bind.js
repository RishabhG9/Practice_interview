/**
 * CALL APPLY and BIND in JAVASCRIPT
 * 
 * The “this” keyword refers to the object that the function is a property of.
 * The value of the “this” keyword will always depend on the object that is invoking the function.
 */

/**
 * call():
 * This method invokes a method (function) by specifying the owner object.
 * call() method allows an object to use the method (function) of another object.
 * 
 */

let userDetails = {
  name: "Rishabh Gupta",
  age: 28,
  designation: "Software Engineer",
  printDetails: function () {
    console.log(this.name) // this keyword is used for self references
  }
}

// userDetails.printDetails(); // pointing userDetails object

let userDetails2 = {
  name: "XYZ ABC",
  age: 30,
  designation: "Software Developer",
  // If we want to display name then there is no point of writing same function as it is above object
  //  we can resolve it using call function
}

// userDetails.printDetails.call(userDetails2) // but after using call and passing the object reference now this printDetail function is taking referece from UserDetails2 object 

//NOW LET TTAKE SCENERIO IF WE ARE TAKING GENERIC FUNCTION RATHER THAN OBJECT SPECIFIC OR OBJECT METHOD

let student1 = {
  name: "Ramu",
  age: 25,
  designation: "Software Engineer",
}

let student2 = {
  name: "Shamu",
  age: 35,
  designation: "Software Engineer 3",
}

let printDetailsNew = function (state, country) {
  console.log(this.name, state, country) //this keyword is used for self references
}

printDetailsNew.call(student1, "Delhi", "india")


/**
 * apply()
 * call() method takes arguments separately whereas, apply() method takes arguments as an array.
 * 
*/
printDetailsNew.apply(student2, ["Mumbai", "India"])

/**
 * bind():
 * This method returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter.
 * we can use this function as per our need in future
 * 
 */

let newFun = printDetailsNew.bind(student2, "Mumbai", "India")
newFun();   //Shamu Mumbai India
