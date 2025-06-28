/**
 * 234. Palindrome Linked List
 * 
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 * 
 */

var isPalindrome = function (head) {
  var arr = [];
  while (head != null) {
    arr.push(head.val);
    head = head.next
  }
  console.log(arr)
  let left = 0, right = arr.length - 1, flag = 1
  while (left < right) {
    if (arr[left] != arr[right]) {
      flag = 0;
      break
    }
    left++;
    right--;
  }
  if (flag == 0) {
    return false
  }
  else {
    return true
  }
};