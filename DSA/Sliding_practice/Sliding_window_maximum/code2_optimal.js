var maxSlidingWindow = function (nums, k) {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Step 1: Remove indices out of the window
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // Step 2: Remove smaller values from the end of the deque
    while (deque.length && nums[i] > nums[deque[deque.length - 1]]) {
      deque.pop();
    }

    // Step 3: Push current index
    deque.push(i);

    // Step 4: Store result starting from i = k - 1
    if (i >= k - 1) {
      result.push(nums[deque[0]]); // front of deque is max
    }
  }

  return result;
};