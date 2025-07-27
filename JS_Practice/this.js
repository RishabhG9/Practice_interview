/**
 * This
 * 
 * 1. The “this” keyword refers to the object that the function is a property of.
 * 2. The value of the “this” keyword will always depend on the object that is invoking the function.
 * 3. the “this” keyword is, whenever the function is invoked, check the object before the dot. The value of this . 
 * keyword will always be the object before the dot.
 * 4. If there is no object before the dot-like in example1, the value of this keyword will be the global object.
 */

function doSomething() {
  console.log(this);
}

doSomething();


var obj = {
  name: "vivek",
  getName: function () {
    console.log(this.name);
  }

}

var getName = obj.getName;

var obj2 = { name: "akshay", getName };
obj2.getName();

// output = “akshay”.

var obj1 = {
  address: "Mumbai,India",
  getAddress: function () {
    console.log(this.address);
  }
}

var getAddress = obj1.getAddress;
var obj2 = { name: "akshay" };
obj2.getAddress();

// output = error

// ----------------------------------------------------------
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