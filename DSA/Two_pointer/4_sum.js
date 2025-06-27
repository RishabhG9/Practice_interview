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
 * NOTE :  Generalized k-sum recursion: O(n³) and very reusable
 */

function kSum(nums, target, k, start) {
  const res = [];
  if (k == 2) {
    let left = start, right = nums.length - 1;
    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum == target) {
        res.push([nums[left], nums[right]]);
        while (left < right && nums[left] == nums[left + 1]) left++;
        while (left < right && nums[right] == nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < target) left++;
      else right--;
    }
  } else {
    for (let i = start; i < nums.length - k + 1; i++) {
      if (i > start && nums[i] == nums[i - 1]) continue;
      const subsets = kSum(nums, target - nums[i], k - 1, i + 1);
      for (const subset of subsets) {
        res.push([nums[i], ...subset]);
      }
    }
  }
  return res;
}


nums.sort((a, b) => a - b);
return kSum(nums, target, 4, 0);