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
    address : "Mumbai,India",
    getAddress: function(){
    console.log(this.address); 
  }
}
   
var getAddress = obj1.getAddress;
var obj2 = {name:"akshay"};
obj2.getAddress();    

// output = error