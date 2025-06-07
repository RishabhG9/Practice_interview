/**
 * Insertion Sort
 * 
 * We start with the second element of the array as the first element is assumed to be sorted.
 * Compare the second element with the first element if the second element is smaller then swap them.
 * Move to the third element, compare it with the first two elements, and put it in its correct position
 * 
 * Time complexity : O(n^2)
 * Space complexity : O(1)
 * 
 */

let unSortArray = [1, 2, 3, 6, 8, 2, 1, 4, 5, 6, 7, 8, 9, 10];
let i = 1, j, min, temp;

while (i < unSortArray.length) {
  j = i
  while (j > 0 && unSortArray[j] < unSortArray[j - 1]) {
    temp = unSortArray[j];
    unSortArray[j] = unSortArray[j - 1];
    unSortArray[j - 1] = temp;
    j--;
  }
  i++;
}

console.log("Insertion Sort", unSortArray)