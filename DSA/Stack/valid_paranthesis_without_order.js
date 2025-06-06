/**
 * LEETCODE 20
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * An input string is valid if:
 * 
 * Open brackets must be closed by the same type of brackets.
 * Every close bracket has a corresponding open bracket of the same type.
 * 
 * Example 1:
  Input: s = "()"
  Output: true

  Example 2:
  Input: s = "()[]{}"
  Output: true

  Example 3:
  Input: s = "(]"
  Output: false

  Example 4:
  Input: s = "([])"
  Output: true

  Constraints:
  1 <= s.length <= 104
  s consists of parentheses only '()[]{}'.
 */


// -------------THIS approch is useful when order doesnt matter but without stack logic you cant maintain correct order.
let input = "([)]"
let obj = {};
let i = 0, flag = true;
while (i < input.length) {

  function checkOpen(bracket) {
    if (bracket in obj) {
      obj[bracket] += 1
    }
    else {
      obj[bracket] = 1
    }
  }

  function checkClose(bracket) {
    if (bracket in obj) {
      obj[bracket] -= 1
      if (obj[bracket] < 0) {
        flag = false
      }
    }
    else {
      flag = false;
    }
  }

  if (flag === false) {
    break
  }

  switch (input[i]) {
    case '(': checkOpen('(');
      i++;
      break;
    case '{': checkOpen('{')
      i++;
      break;
    case '[': checkOpen('[')
      i++;
      break;
    case ')': checkClose('(')
      i++;
      break;
    case '}': checkClose('{')
      i++;
      break;
    case ']': checkClose('[')
      i++;
      break;
  }
}

if (!flag) {
  console.log("false", obj)
}
else {
  console.log("TRUE", obj)
}

