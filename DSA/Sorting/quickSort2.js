/**
 * QUICK SORT
 * 
 * 1. Taking First element as Pivot
 */

let unSortArray = [5, 1, 2, 3, 6, 8, 9, 10, 4, 7];

const partition = (arr, low, high) => {
  const pivot = arr[low];
  let i = high;

  for (let j = high; j > low; j--) {
    if (arr[j] > pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i--;
    }
  }
  [arr[i], arr[low]] = [arr[low], arr[i]]
  return i;
}

const quickSort = (arr, low, high) => {
  if (low < high) {
    const pivotIndex = partition(arr, low, high)

    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)
  }
}
quickSort(unSortArray, 0, unSortArray.length - 1);
console.log(unSortArray);