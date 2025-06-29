var a = 10
function abc() {
  a = 3
  console.log(a);
  var a
  a = 20
}

console.log(a);
abc()
console.log(a);


var b = 10
{ b = 20 }
console.log(b);