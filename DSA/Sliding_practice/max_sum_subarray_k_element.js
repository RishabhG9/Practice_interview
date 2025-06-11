/**
 * Maximum Sum of a Subarray with K Elements
 * 
 * 1. Given an array and an integer k, we need to calculate the maximum sum of a 
 *  subarray having size exactly k.
 */

// let arr = [100, 200, 300, 400], k = 2
// let arr = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4 
// let arr = [2, 3], k = 3
// let arr = [5, 2, -1, 0, 3], k = 3
const arr = [1, 4, 2, 10, 2, 3, 1, 0, 20], k = 4;

const count = (arr, k) => {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  return sum
}

const maximumSum = (arr, k) => {
  let startIndex = 0;
  let max_Sum = count(arr, k);
  let temp_sum = max_Sum;
  for (let i = k; i < arr.length; i++) {
    temp_sum += arr[i] - arr[startIndex++]
    if (temp_sum > max_Sum) {
      max_Sum = temp_sum
    }
  }
  return max_Sum
}

if (k === arr.length) { //this is the case when K is equal to length of an array
  console.log(count(arr, k));
} else if (k > arr.length) { // this the case when K is greater than the length of an array which is invalid
  console.log("Invalid");
} else { // this is the normal case where K is smaller than the length of an array
  console.log("Maximum Sum", maximumSum(arr, k));
}

