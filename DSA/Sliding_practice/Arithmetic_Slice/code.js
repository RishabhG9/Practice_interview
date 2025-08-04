/**
 * Arithmetic Slice
 */


function numberOfArithmeticSlices(nums) {
  let total = 0;
  let count = 0;

  for (let i = 2; i < nums.length; i++) {
    // Check if last 3 numbers form an arithmetic slice
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      count += 1;
      total += count;
    } else {
      count = 0;
    }
  }

  return total;
}
