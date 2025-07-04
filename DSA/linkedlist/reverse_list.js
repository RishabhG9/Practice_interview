/**
 * 206. Reverse Linked List
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Input: head = [1,2,3,4,5]
 * Output: [5,4,3,2,1]
 * 
 * Input: head = [1,2]
 * Output: [2,1]
 * 
 * Input: head = []
 * Output: []
 */

var reverseList = function (head) {
    let current = head;
    let previous = null;

    while (current != null) {
        let temp = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }
    return previous
};