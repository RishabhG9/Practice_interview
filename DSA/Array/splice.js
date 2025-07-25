/**
 * Splice Inbuilt Function
 */

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// console.log("Splice", array.splice(3, 5));  // [4,5,6,7,8]

// console.log(array) // [1,2,3,9,10]


const spliceCustomFunction = (array, left, right) => {
  const result = []
  const temp = []
  for (let i = 0; i < array.length; i++) {
    if (i >= left && i < left + right) {
      result.push(array[i])
    } else {
      temp.push(array[i])
    }
  }
  array.length = 0;
  for (let i = 0; i < temp.length; i++) {
    array.push(temp[i])
  }
  return result
}

const newArray = spliceCustomFunction(array, 3, 5)
console.log("New Array", newArray);
console.log("old array ", array);