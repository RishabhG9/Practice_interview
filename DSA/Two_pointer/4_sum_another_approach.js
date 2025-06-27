/**
 * 18. 4 Sum
 * 
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 * 
 * 0 <= a, b, c, d < n
 * a, b, c, and d are distinct.
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 * 
 * Example 1:
 * Input: nums = [1,0,-1,0,-2,2], target = 0
 * Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * 
 * Example 2:
 * Input: nums = [2,2,2,2,2], target = 8
 * Output: [[2,2,2,2]]
 * 
 * NOTE : 2-pointer + 2 loops: O(n³) and best practical
 */

function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const result = [];

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate i

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // skip duplicate j

      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // skip duplicate left
          while (left < right && nums[left] === nums[left + 1]) left++;
          // skip duplicate right
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return result;
}

let nums = [1, 0, -1, 0, -2, 2], target = 0;
console.log(fourSum(nums, target))
