/**
 * Slice Function Inbuilt
 */

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log("Splice", array.slice(3, 6));  // [4,5,6,7,8]
console.log(array) // [1,2,3,9,10]


const customSlice = (array, left, right) => {
  let result = []
  for (let i = left; i < right; i++) {
    result.push(array[i]);
  }

  return result
}

const newArray = customSlice(array, left, right);
console.log("New Array", newArray);
console.log("array",arra)