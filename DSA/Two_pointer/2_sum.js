/**
 * 1. Two Sum
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
 * NOTE* Array is not sorted so two pointer approach cannot be performed
 * 
 */
let array = [2, 7, 11, 15], target = 9;
// let left = 0, right = array.length - 1
const obj = {};

const findTwoSum = () => {
  for (let i = 0; i < array.length; i++) {
    const value = target - array[i];

    if (value in obj) {
      return [obj[value], i]
    }
    obj[array[i]] = i
  }

  return null
}

console.log("Two Sum",findTwoSum());