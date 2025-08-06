const findAverage = (left, right, arr, k) => {
  let sum = 0;
  while (left <= right) {
    sum += arr[left++]
  }
  return Math.floor(sum / k)
}

var numOfSubarrays = function (arr, k, threshold) {
  let left = 0;
  let count = 0;

  for (let right = k - 1; right < arr.length; right++) {
    if (threshold <= findAverage(left, right, arr, k)) {
      count++;
    }
    left++;
  }
  return count
};