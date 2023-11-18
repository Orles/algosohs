interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => T | null;
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = -1;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array.from({ length: size });
    }

    enqueue = (item: T) => {
        if (this.length >= this.size || this.tail >= this.size - 1) {
            return;
        }

        this.tail++;
        this.container[this.tail] = item;
        this.length++;
    }

    dequeue = () => {
        if (this.length === 0) {
            return null;
        }
        
        const item = this.container[this.head];
        this.container[this.head] = null;
        this.head++;
        this.length--;

        if (this.length === 0) {
            this.head = 0;
            this.tail = -1;
        }

        return item;
    }

    peak = (): T | null => {
        if (this.length === 0) {
            return null;
        }

        return this.container[this.head];
    }

    clear = (): void => {
        this.head = 0;
        this.tail = -1;
        this.length = 0;
        this.container = Array(this.size).fill(null);
    }

    get elements(): (T | null)[] {
        return this.container.slice();
    }

    get headIndex(): number {
        return this.head;
    }

    get tailIndex(): number {
        return this.tail;
    }
}