/**
 * Find Lower Bound 
 * 
 * lower bound: first index where element is greater than or equal to target
 */

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 6
function lowerBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left; // first >= target
}



console.log("LowerBound", lowerBound(array, target))