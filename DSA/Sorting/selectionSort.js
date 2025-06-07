/**
 * Selection Sort Ascending Order
 * 
 * 1. Find The minimum element in an array and replace it with first element
 * 2. Increase the element index and start searching again for rest of the array values to find
 * second smallest value and swap it with element which is at index 1 now
 * 3. This way it will make it sort
 * 
 * Time complexity : O(n^2)
 * Space complexity : O(1)
 */

let unSortArray = [1, 2, 3, 6, 8, 2, 1, 4, 5, 6, 7, 8, 9, 10];
let i = 0, j, min, temp;

while (i < unSortArray.length) {
  min = i;
  j = i + 1;
  while (j < unSortArray.length) {
    if (unSortArray[min] > unSortArray[j]) {
      // if (unSortArray[min] < unSortArray[j]) { // For Descending Order
      min = j;
    }
    j++;
  }
  temp = unSortArray[i];
  unSortArray[i++] = unSortArray[min];
  unSortArray[min] = temp;
}

console.log("Selection Sort", unSortArray);