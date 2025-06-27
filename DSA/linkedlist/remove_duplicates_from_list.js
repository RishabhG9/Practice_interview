/**
 * 83. Remove Duplicates from Sorted List
 * 
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.
 * 
 * Input: head = [1,1,2]
 * Output: [1,2]
 * 
 * Input: head = [1,1,2,3,3]
 * Output: [1,2,3]
 */


var deleteDuplicates = function (head) {
  let tail = head;
  if (head == null) {
    return head
  }
  while (tail.next != null) {
    if (tail.val === tail.next.val) {
      tail.next = tail.next.next
    } else {
      tail = tail.next
    }
  }
  return head

};