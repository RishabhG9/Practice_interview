var maxSlidingWindow = function (nums, k) {
  let left = 0;
  let result = [];

  for (let i = k - 1; i < nums.length; i++) {
    const temp = nums.slice(left, i + 1).sort((a, b) => a - b);
    result.push(temp.pop())
    left++
  }

  return result
};


var maxSlidingWindow2 = function (nums, k) {
  let left = 0;
  let result = [];

  for (let i = k - 1; i < nums.length; i++) {
    const temp = nums.slice(left, i + 1);
    result.push(Math.max(...temp))
    left++
  }

  return result
};