/**
 * 876. Middle of the Linked List
 */

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow
};