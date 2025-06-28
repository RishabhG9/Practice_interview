/**
 * 237. Delete Node in a Linked List
 * 
 * 
 */

var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next
};