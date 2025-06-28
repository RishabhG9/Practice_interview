/**
 * 234. Palindrome Linked List
 * 
 * Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 */

var isPalindrome = function (head) {
  let fast = head;
  let slow = head;

  // Finding total number of values plus getting middle point
  while (fast && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next
  }

  // Need to reverse the 2nd half linked list
  let previous = null
  while (slow != null) {
    let node = slow.next;
    slow.next = previous;
    previous = slow;
    slow = node;
  }

  //Checking actual it is palindrome or not
  let left = head, right = previous;

  while (right != null) {
    if (left.val != right.val) {
      return false
    }
    left = left.next;
    right = right.next
  }
  return true
};