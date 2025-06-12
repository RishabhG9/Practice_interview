/**
 * Subarray with 0 sum
 * 
 * 1. find if there is a subarray (of size at least one) with 0 sum
 * 2. Return true/false depending upon whether there is a subarray present with 0-sum or not
 * 
 * 
 * APPROACH
 * 
 * --> Declare a variable sum, to store the sum of prefix elements
 * --> Traverse the array and at each index, add the element into the sum and check if this sum exists earlier. 
 *     If the sum exists, then return true
 * --> Also, insert every prefix sum into a map, so that later on it can be found whether the current sum is seen before or not
 * --> At the end return false, as no such subarray is found
 */

// let arr = [4, 2, -3, 1, 6]
// let arr = [4, 2, 0, 1, 6]
// let arr = [1, 2, -1]
let arr = [1, 2, -1,0]


const subArray0Sum = (arr) => {
  let setSum = new Set();
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (sum == 0 || setSum.has(sum)) {
      return true
    }

    setSum.add(sum)
  }
  return false
}

console.log(subArray0Sum(arr))