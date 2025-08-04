/**
 * Minimum Window Substring
 */

function minWindow(s, t) {
  if (s.length < t.length) return "";

  const tFreq = {};   // Frequency of characters in t
  const windowFreq = {}; // Frequency in the current window
  let have = 0, need = 0;

  // Step 1: Build the frequency map for t
  for (let char of t) {
    tFreq[char] = (tFreq[char] || 0) + 1;
  }
  need = Object.keys(tFreq).length;

  // Step 2: Sliding window with two pointers
  let res = [-1, -1]; // Store start and end indices of result window
  let resLen = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    let char = s[right];
    windowFreq[char] = (windowFreq[char] || 0) + 1;

    // If char is in tFreq and we have required count, increment "have"
    if (tFreq[char] && windowFreq[char] === tFreq[char]) {
      have++;
    }

    // Step 3: Try to shrink the window if all characters matched
    while (have === need) {
      // Update result if smaller window found
      if ((right - left + 1) < resLen) {
        res = [left, right];
        resLen = right - left + 1;
      }

      // Remove leftmost character and slide window
      windowFreq[s[left]]--;
      if (tFreq[s[left]] && windowFreq[s[left]] < tFreq[s[left]]) {
        have--;
      }
      left++;
    }
  }

  let [start, end] = res;
  return resLen === Infinity ? "" : s.substring(start, end + 1);
}
