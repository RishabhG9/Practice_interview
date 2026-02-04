/**
 * Index File for Notes at base level
 */

function findAnagramPairs(words) {
  const map = new Map();
  const result = [];

  // Step 1: Group by sorted characters
  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }

  // Step 2: Generate all unique unordered pairs from each group
  for (const group of map.values()) {
    if (group.length >= 2) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          result.push([group[i], group[j]]);
        }
      }
    }
  }

  return result;
}

// ✅ Sample Input
const input = ["listen", "silent", "enlist", "google", "gogole", "abc", "bca", "cab", "xyz", "yxz", "zxy", "foo"];

// ✅ Run and Output
console.log(findAnagramPairs(input));
