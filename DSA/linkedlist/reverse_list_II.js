/**
 * 92. Reverse Linked List II
 * 
 * Given the head of a singly linked list and two integers left and right where left <= right, 
 * reverse the nodes of the list from position left to position right, and return the reversed list.
 * 
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 * 
 * Input: head = [5], left = 1, right = 1
 * Output: [5]
 */

var reverseBetween = function (head, left, right) {
    if (head == null) {
        return head
    }

    let result = new ListNode(0);
    result.next = head;
    let previous = result

    for (let i = 1; i < left; i++) {
        previous = previous.next;
    }

    let current = previous.next;
    let reverseTail = current;

    let reverse = null;
    for (let i = 0; i < (right - left + 1); i++) {
        let temp = current.next;
        current.next = reverse;
        reverse = current;
        current = temp
    }

    previous.next = reverse;
    reverseTail.next = current

    return result.next
};