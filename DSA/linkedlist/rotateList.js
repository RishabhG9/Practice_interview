/**
 * 61. Rotate List
 * 
 * Given the head of a linked list, rotate the list to the right by k places.
 * 
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 * 
 * Input: head = [0,1,2], k = 4
 * Output: [2,0,1]
 */

var rotateRight = function (head, k) {
  if (head == null) {
    return head
  }
  let current = head;
  let tail = head;

  let count = 1;
  while (tail.next != null) {
    count++;
    tail = tail.next;
  }

  if (count <= k) {
    k = k % count
  }
  if (k == 0) {
    return head
  }

  for (let i = 0; i < count - k - 1; i++) {
    current = current.next;
  }

  let node = current.next;
  tail.next = head
  current.next = null;
  return node
};