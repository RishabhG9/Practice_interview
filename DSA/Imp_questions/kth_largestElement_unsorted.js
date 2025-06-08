/**
 * ----------215 : Kth largest element in an unsorted array without implementing sorting-----------
 * 
 * 1. QuickSelect is a partition-based selection algorithm
 * 2. Doesn’t sort the whole array.
 * 3. Narrows down to only the part of the array where the kth largest element could be.
 * 4. Achieves O(n) average time complexity.
 * 
 * ******* Its not suitable for high number of "K" giving me Time limit exceed in Leetcode but its working in VS code 
 * where K = 5000 and array length is >10000
 */


const partition = (nums, low, high) => {
  let pivot = nums[low];
  let i = low + 1;

  for (let j = low + 1; j <= high; j++) {
    if (nums[j] > pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[low], nums[i - 1]] = [nums[i - 1], nums[low]]
  return i - 1;
}

const quickSelect = (nums, low, high, k) => {
  if (low <= high) {
    const pivotIndex = partition(nums, low, high)

    if (pivotIndex == k) {
      return nums[pivotIndex]
    } else if (pivotIndex > k) {
      return quickSelect(nums, low, pivotIndex - 1, k);
    } else {
      return quickSelect(nums, pivotIndex + 1, high, k);
    }
  }
}

let unSortArray = [5, 1, 2, 3, 6, 8, 7, 8, 9, 10, 4, 7];
let k = 5;

console.log("Kth LARGEST ELEMENT IN UNSORTED ARRAY", quickSelect(unSortArray, 0, unSortArray.length - 1, k - 1)); // k-1 because 0 Index array structure
