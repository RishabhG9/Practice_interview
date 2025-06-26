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

//NEED TO COMPLETE ITS TIME Complexity is O(n) but space Complexity O(n)

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

const maxLeft = [0], maxRight = [0];
let left = 1, right = height.length - 2;

while (left < height.length) {

  if (height[left - 1] > maxLeft[maxLeft.length - 1]) {
    maxLeft.push(height[left - 1])
  } else {
    maxLeft.push(maxLeft[maxLeft.length - 1])
  }
  left++

  if (height[right + 1] > maxRight[0]) {
    // console.log("greater", height[right + 1])
    maxRight.unshift(height[right + 1])
  } else {
    // console.log("maxRight true", maxRight, maxRight[maxRight.length - 1])
    maxRight.unshift(maxRight[0])
  }
  right--;
}

let sum = 0, i = 0;
while (i < height.length) {
  let waterTrap = Math.min(maxLeft[i], maxRight[i]) - height[i]
  if (waterTrap >= 0) {
    sum += waterTrap;
  }
  i++
}
// return sum

console.log("Sum", sum)