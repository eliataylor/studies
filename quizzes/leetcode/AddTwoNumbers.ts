
/*
2. Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 Input: l1 = [0], l2 = [0]
Output: [0]

 Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

 */

// Definition for singly-linked list.
class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0;

    // Traverse both lists while there are digits to process
    while (l1 !== null || l2 !== null || carry > 0) {
        // Get values from the current nodes (0 if null)
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;

        // Calculate sum and new carry
        const sum = x + y + carry;
        carry = Math.floor(sum / 10);

        // Create a new node with the digit value (sum mod 10)
        current.next = new ListNode(sum % 10);
        current = current.next;

        // Move to next nodes if they exist
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }

    return dummyHead.next;
}
