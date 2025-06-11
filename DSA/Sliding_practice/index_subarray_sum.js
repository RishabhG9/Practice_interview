/**
 * Indexes of Subarray Sum
 * 
 * 1. You need to return the 1-based indices of the leftmost and rightmost 
 * elements of this subarray
 * 2. You need to find the first subarray whose sum is equal to the target.
 * 3. If no such array is possible then, return [-1].
 * 
 * 1 <= arr.size()<= 106
0 <= arr[i] <= 103
0 <= target <= 109
 */

// let arr = [1, 2, 3, 7, 5], target = 12
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 15
let arr = [5, 3, 4], target = 2

const findIndexSubarray = (arr, target) => {
  let sum = arr[0], startIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (sum == target) {
      return [startIndex + 1, i]
    } else if (sum < target) {
      sum += arr[i]
      continue
    } else if (sum > target) {
      sum = sum - arr[startIndex++];
      i--;
      continue
    }
  }
  return [-1]
}


console.log(findIndexSubarray(arr, target))