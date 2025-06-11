/**
 * K Sized Subarray Maximum
 * 
 * 1. your task is to find the maximum value for each contiguous subarray of size k.
 * 2. output should be an array of maximum values corresponding to each contiguous subarray
 */

/**
 * ****************** ONE APPROACH BUT NOT OPTIMAL *****************
 *  
 *Time Complexity:
Better than brute-force: O(n * k)

Not quite O(n), but performs efficiently in most real-world cases. 
 * 
 *  */


// let arr = [1, 2, 3, 1, 4, 5, 2, 3, 6], k = 3
// let arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k = 4
let arr = [5, 1, 3, 4, 2, 6], k = 1
let result = []

const findMaxElement = (arr, i, k) => {
  let maxElement = arr[i];
  for (let j = i + 1; j < i + k; j++) {
    if (maxElement < arr[j]) {
      maxElement = arr[j]
    }
  }
  return maxElement
}

const findMaxElementsArray = (arr, k) => {
  let i;

  for (i = 0; i < arr.length; i++) {
    if ((i + k) <= arr.length) {
      result.push(findMaxElement(arr, i, k));
    }
  }
  return result;
}

console.log(findMaxElementsArray(arr, k));