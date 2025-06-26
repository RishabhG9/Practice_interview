/**
 * 283. Move Zeroes
 * 
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 * 
 * Input: nums = [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 * 
 * Input: nums = [0]
 * Output: [0]
 */


// Right Pointer check the Non zero element
// Left pointer check the 0 element

const nums = [0, 1, 0, 3, 12];
let left = 0;
for (let right = 0; right < nums.length; right++) {
  if (nums[right] != 0) {
    let temp = nums[right];
    nums[right] = nums[left];
    nums[left] = temp;
    left++;
  }
}

console.log("New Array", nums)