/**
 * 11. Containing Most water
 * 
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 * Notice that you may not slant the container.
 * 
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
 * 
 * Input: height = [1,1]
 * Output: 1
 * 
 */


const height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

const maxArea = (height) => {
  let right = height.length - 1, left = 0;
  let maxArea = 0;

  while (left < right) {
    let breath = Math.min(height[left], height[right]);
    let length = Math.abs(right - left);
    let area = breath * length;

    maxArea = Math.max(area, maxArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea
};

console.log(maxArea(height));