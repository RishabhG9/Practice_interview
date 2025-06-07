/**
 * Bubble Sorting
 * 
 * simplest sorting algorithm that works by repeatedly swapping the adjacent elements 
 * if they are in the wrong order. This algorithm is not suitable for large data sets as 
 * its average and worst-case time complexity are quite high
 * 
 * sort the array using multiple passes. After the first pass, the maximum element goes 
 * to end (its correct position). Same way, after second pass, the second largest element
 * goes to second last position and so on
 * 
 * Time complexity : O(n^2)
 * Space complexity : O(1)
 */

let unSortArray = [1, 2, 3, 6, 8, 2, 1, 4, 5, 6, 7, 8, 9, 10];
let i = 0, swapping, temp;
while (i < unSortArray.length - 1) {
  swapping = false;
  for (let j = 0; j < unSortArray.length - i - 1; j++) {
    if (unSortArray[j] > unSortArray[j + 1]) {
      temp = unSortArray[j];
      unSortArray[j] = unSortArray[j + 1];
      unSortArray[j + 1] = temp;
      swapping = true
    }
  }

  if (!swapping) {
    break;
  }
  i++;
}

console.log("Bubble Sort", unSortArray)