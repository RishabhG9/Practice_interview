/**
 * Ways to Reach the n'th Stair
 * 
 * 1. There are n stairs, a person standing at the bottom wants to reach the top.
 * 2. The person can climb either 1 stair or 2 stairs at a time. 
 * 3. Your task is to count the number of ways, the person can reach the top 
 * 
 */

// this is Optimal Approach using DP, where remmembering the steps which will not occur 
// again we will just return it directly if its already visited

const countWays = (n, memo) => {
  if (n <= 1) {
    return 1
  }

  if (memo[n] !== -1) {
    return memo[n]
  }

  memo[n] = countWays(n - 1, memo) + countWays(n - 2, memo)
  return memo[n]
}

const n = 5;
let memo = Array(n + 1).fill(-1)

console.log("Countways", countWays(n, memo));



// NORMAL APPROACH

const normalCountWays = (k) => {
  if (k <= 1) {
    return 1
  }

  return normalCountWays(k - 1) + normalCountWays(k - 2)
}

const k = 5;

console.log("Countways normal approach", normalCountWays(k)); 