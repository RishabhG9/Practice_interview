/* 1. Two Sum II
* 
* Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
* You may assume that each input would have exactly one solution, and you may not use the same element twice.
* You can return the answer in any order.
* 
* Input: nums = [2,7,11,15], target = 9
* Output: [0,1]
* Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
* 
* Input: nums = [3,2,4], target = 6
* Output: [1,2]
* 
* Input: nums = [3,3], target = 6
* Output: [0,1]
* 
* NOTE* Array is  sorted so two pointer approach can be performed
* 
*/

let array = [2, 7, 11, 15]
let left = 0, right = array.length - 1;

array.sort((a, b) => a - b)

while (left < right) {
  let sum = array[left] + array[right]

  if (sum > target) {
    right--
  } else if (sum < target) {
    left++
  } else {
    return [left, right] // Returning Indexes of the Variable which sum = target;
  }
} 