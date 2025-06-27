/**
 * 21. Merge Two Sorted Lists
 * 
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 * 
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Example 2:
 * Input: list1 = [], list2 = []
 * Output: []
 * 
 * Example 3:
 * Input: list1 = [], list2 = [0]
 * Output: [0]
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var mergeTwoLists = function (list1, list2) {
  let final = new ListNode();
  let tail = final;

  while (list1 != null && list2 != null) {
    if (list1.val < list2.val) {
      final.next = new ListNode(list1.val)
      list1 = list1.next
    } else {
      final.next = new ListNode(list2.val)
      list2 = list2.next
    }
    final = final.next
  }

  if (list1 != null) {
    final.next = list1
  }
  if (list2 != null) {
    final.next = list2
  }
  return tail.next
};


let list1 = [1, 2, 4], list2 = [1, 3, 4];

console.log(mergeTwoLists(list1, list2));
