/**
 * 138. Copy List with Random Pointer
 * 
 * check leetcode for explaination its big but not that hard
 * 
 * https://leetcode.com/problems/copy-list-with-random-pointer/description/?envType=problem-list-v2&envId=linked-list
 */

var copyRandomList = function (head) {
  if (head == null) return null;

  let oldToCopy = new Map();
  oldToCopy.set(null, null);

  let cur = head;
  // first pass: create copies
  while (cur != null) {
    let copy = new Node(cur.val);
    oldToCopy.set(cur, copy);
    cur = cur.next;
  }

  // second pass: assign next and random
  cur = head;
  while (cur != null) {
    let copy = oldToCopy.get(cur);
    copy.next = oldToCopy.get(cur.next);
    copy.random = oldToCopy.get(cur.random);
    cur = cur.next;
  }

  return oldToCopy.get(head);
};