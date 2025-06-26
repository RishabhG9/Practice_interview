/**
 * Trapping rain water 42
 * 
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
 * 
 * Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 * Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
 * 
 * Input: height = [4,2,0,3,2,5]
 * Output: 9
 */


const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

let maxLeft = height[0];
let maxRight = height[height.length - 1]
let left = 0, right = height.length - 1;
let sum = 0;
while (left < right) {

  if (height[left] <= height[right]) {
    if (maxLeft < height[left]) {
      maxLeft = height[left]
    } else {
      sum += maxLeft - height[left]
    }
    left++
  }
  else {
    if (maxRight < height[right]) {
      maxRight = height[right]
    } else {
      sum += maxRight - height[right]
    }
    right--
  }

}

console.log("Sum", sum)

