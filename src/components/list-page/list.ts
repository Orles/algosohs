export class LinkedListNode<T> {
    value: T
    next: LinkedListNode<T> | null
    constructor(value: T, next?: LinkedListNode<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }
  
  interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, position: number) => void;
    deleteByIndex: (position: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    getSize: () => void;
  }
  
  export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    public size: number;
  
    constructor(array: T[]) {
      this.head = null;
      this.size = 0;
  
      if (array) {
        array.forEach((value) => this.append(value));
      }
    }
  
    addByIndex(element: T, index: number) {
      if (index < 0 || index > this.size) {
        return;
      }
  
      const newNode = new LinkedListNode(element);
  
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let currentNode = this.head;
        let prevNode = null;
        let currIndex = 0;
  
        while (currIndex < index) {
          prevNode = currentNode;
          currentNode = currentNode!.next;
          currIndex++;
        }
  
        newNode.next = currentNode;
        if (prevNode !== null) {
          prevNode.next = newNode;
        }
      }
  
      this.size++;
    }
  
    deleteByIndex(index: number) {
      if (index < 0 || index >= this.size) {
        return;
      }
  
      let currentNode = this.head;
      let prevNode = null;
      let currIndex = 0;
  
      while (currIndex < index) {
        prevNode = currentNode;
        currentNode = currentNode!.next;
        currIndex++;
      }
  
      if (prevNode === null) {
        this.head = currentNode!.next;
      } else {
        prevNode.next = currentNode!.next;
      }
  
      this.size--;
    }
  
    append(element: T) {
      const newNode = new LinkedListNode(element);
      let current;
  
      if (this.head === null) {
        this.head = newNode;
      } else {
        current = this.head;
        while (current.next !== null) {
          current = current.next;
        }
  
        current.next = newNode;
      }
  
      this.size++;
    }
  
    prepend(element: T) {
      const newNode = new LinkedListNode(element);
  
      if (this.head === null) {
        this.head = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
  
      this.size++;
    }
  
    deleteHead() {
      if (!this.head) {
        return;
      }
      this.head = this.head.next;
      this.size--;
    }
  
    deleteTail() {
      if (!this.head) {
        return;
      }
  
      let currentNode = this.head;
      let prevNode = null;
  
      while (currentNode.next !== null) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
  
      if (prevNode === null) {
        this.head = null;
      } else {
        prevNode.next = null;
      }
  
      this.size--;
    }
  
    toArray(): T[] {
      const result: T[] = [];
      let currentNode = this.head;
  
      while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.next;
      }
  
      return result;
    }
  
    getSize() {
      return this.size;
    }
  }
  