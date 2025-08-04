/**
 * Longest substring without repeating character
 */

const s = "dnvopdahdwriybvmnxznzuqadk"


function longestSubstringWithoutRepeating(s) {
  let left = 0;
  let seen = new Set();
  let maxSubstring = "";
  
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    
    if (right - left + 1 > maxSubstring.length) {
      maxSubstring = s.slice(left, right + 1);
    }
  }

  return maxSubstring;
}


console.log(longestSubstringWithoutRepeating(s))