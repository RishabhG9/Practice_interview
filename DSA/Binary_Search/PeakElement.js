/**
 * 162. Peak Element
 * an element greater than neighbors
can have multiple peaks, any peak suffices]


 * Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
 */

var findPeakElement = function (nums) {
  let left = 0, right = nums.length - 1

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)

    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1
    }
  }
  return left
};
