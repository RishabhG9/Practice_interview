/**
 * QUICK sort
 * 
 * QuickSort is a sorting algorithm based on the Divide and Conquer that picks an element as a 
 * pivot and partitions the given array around the picked pivot by placing the pivot in 
 * its correct position in the sorted array.
 * 
 * 1. Choose a Pivot: Select an element from the array as the pivot. The choice of pivot can vary 
 * (e.g., first element, last element, random element, or median).
 * 
 * 2. Partition the Array: Rearrange the array around the pivot. After partitioning, all elements smaller 
 * than the pivot will be on its left, and all elements greater than the pivot will be on its right. 
 * The pivot is then in its correct position, and we obtain the index of the pivot.
 * 
 * 3. Recursively Call: Recursively apply the same process to the two partitioned sub-arrays (left and right of the pivot).
 * 
 * 4. Base Case: The recursion stops when there is only one element left in the sub-array, as a single element is already sorted.
 */

let unSortArray = [5, 1, 2, 3, 6, 8, 9, 10, 4, 7];

// Space Complexity - nlogn
// time complexity  - nlogn
function quickSortFirstApproach(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    }
    else {
      right.push(arr[i]);
    }

  }
  return [...quickSortFirstApproach(left), pivot, ...quickSortFirstApproach(right)]
}

// console.log("QUICK SORT", quickSortFirstApproach(unSortArray));


function quickSort2ndApproach(arr, low, high) {
  if (low < high) {
    const newPivot = partition(arr, low, high);
    quickSort2ndApproach(arr, low, newPivot - 1);
    quickSort2ndApproach(arr, newPivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low + 1;

  for (let j = low + 1; j <= high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++;
    }
  }
  [arr[low], arr[i - 1]] = [arr[i - 1], arr[low]]
  return i - 1
}

console.log("QUICK SORT 2nd Approach", quickSort2ndApproach(unSortArray, 0, unSortArray.length - 1))