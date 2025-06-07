/**
 * LEETCODE 20
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * An input string is valid if:
 * 
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
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

let s = "()[]{}";
let stackCheck = [];
let top = -1, flag = true, i = 0;
if (s.length % 2 == 0) {
  while (i < s.length) {
    if (!flag) {
      break;
    }

    if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
      stackCheck.push(s[i]);
      top++;
      i++;
      continue;
    }
    else {

      switch (s[i]) {
        case ')': if (stackCheck[top] == '(') {
          stackCheck.pop();
          top--;
          i++;
        } else {
          flag = false
        }
          break;
        case '}': if (stackCheck[top] == '{') {
          stackCheck.pop();
          top--;
          i++;
        } else {
          flag = false
        }
          break;
        case ']': if (stackCheck[top] == '[') {
          stackCheck.pop();
          top--;
          i++
        } else {
          flag = false
        }
          break;
      }
    }

  }
  if (stackCheck.length > 0) {
    flag = false
  }
}
else {
  flag = false
}


if (flag) {
  console.log("TRUE")
}
else {
  console.log("FALSE")
}