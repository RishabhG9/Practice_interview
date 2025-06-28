/**
 * 203. Remove Linked List Elements
 * 
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.
 * 
 * Input: head = [1,2,6,3,4,5,6], val = 6
 * Output: [1,2,3,4,5]
 * 
 * Input: head = [], val = 1
 * Output: []
 * 
 * Input: head = [7,7,7,7], val = 7
 * Output: []
 */

var removeElements = function (head, val) {
  if (head == null) {
    return head
  }
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;

  while (current && current.next != null) {
    if (current.next.val == val) {
      current.next = current.next.next;
      // current = current.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next;
};