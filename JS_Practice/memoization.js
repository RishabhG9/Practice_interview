/**
 * Memoization
 * 
 * Memoization is a form of caching where the return value of a function is cached based on its parameters. 
 * If the parameter of that function is not changed, the cached version of the function is returned.
 */

function memoizedAddTo256() {
  var cache = {};

  return function (num) {
    if (num in cache) {
      console.log("cached value");
      return cache[num]
    }
    else {
      cache[num] = num + 256;
      return cache[num];
    }
  }
}
var memoizedFunc = memoizedAddTo256();

memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return