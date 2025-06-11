/**
 * K Sized Subarray Maximum
 * 
 * 1. your task is to find the maximum value for each contiguous subarray of size k.
 * 2. output should be an array of maximum values corresponding to each contiguous subarray
 * 
 * 
 * Remove indices outside the window.
 * Remove indices whose values are smaller than current element.
 * Push the current index.
 * When the window is fully formed (i ≥ k - 1), add the max (front of deque) to result.
 * 
 * time complexity : O(n)
 * space complexity : O(k)
 */

// let arr = [1, 2, 3, 1, 4, 5, 2, 3, 6], k = 3
let arr = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13], k = 4
// let arr = [5, 1, 3, 4, 2, 6], k = 3
let result = []


const maxElementArray = (arr, k) => {
  let indexes = [];

  for (let i = 0; i < arr.length; i++) {

    // Removing those index from starting (shift) which are out of window (K length subarray)
    while (indexes.length > 0 && indexes[0] <= i - k) {
      indexes.shift();
    }

    // removing thoses index from end (pop) which are smaller than current element i
    while (indexes.length > 0 && arr[indexes[indexes.length - 1]] < arr[i]) {
      indexes.pop()
    }

    // pushing current index to indexes array
    indexes.push(i);

    // If window is of size k, store the max (at front of indexes array (deque))
    if (i >= k - 1) {
      result.push(arr[indexes[0]]);
    }
  }
  return result;
}

console.log(maxElementArray(arr, k));