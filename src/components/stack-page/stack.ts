export class Stack<T> {
    private stack: T[] = [];


    push(item: T): void {
        this.stack.push(item)
    }

    pop(): T | undefined {
        return this.stack.pop();
    }

    clear(): void {
        this.stack = []
    }

    get elements(): T[] {
        return this.stack.slice();
    }


    get size(): number {
        return this.stack.length
    }
}