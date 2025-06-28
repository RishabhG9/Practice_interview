/**
 * 143. Reorder Linkedlist
 * 
 * You are given the head of a singly linked-list. The list can be represented as: 
 * L0 → L1 → … → Ln - 1 → Ln
 * Reorder the list to be on the following form:
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 * You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 * 
 * Input: head = [1,2,3,4]
 * Output: [1,4,2,3]
 * 
 * Input: head = [1,2,3,4,5]
 * Output: [1,5,2,4,3]
 */

var reorderList = function (head) {
  let fast = head;
  let slow = head;

  // Finding total number of values plus getting middle point
  while (fast && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next
  }

  // Need to reverse the 2nd half linked list
  let secondHalf = slow.next;
  slow.next = null
  let previous = null
  while (secondHalf != null) {
    let node = secondHalf.next;
    secondHalf.next = previous;
    previous = secondHalf;
    secondHalf = node;
  }

  // Now merge two half
  firstHalf = head;
  secondHalf = previous

  while (secondHalf != null) {
    let temp1 = firstHalf.next;
    let temp2 = secondHalf.next

    firstHalf.next = secondHalf
    secondHalf.next = temp1;

    firstHalf = temp1;
    secondHalf = temp2;
  }
};