import { IAtom } from "./api";

export class History<T> {

    state: IAtom<T>;
    maxLen: number;
    history: T[] = [];
    future: T[] = [];

    constructor(state: IAtom<T>, maxLen = 100) {
        this.state = state;
        this.maxLen = maxLen;
    }

    clear() {
        this.history = [];
        this.future = [];
    }

    record() {
        if (this.history.length == this.maxLen) {
            this.history.shift();
        }
        this.history.push(this.state.deref());
    }

    undo() {
        if (this.history.length) {
            this.future.push(this.state.deref());
            return this.state.reset(this.history.pop());
        }
    }

    redo() {
        if (this.future.length) {
            this.history.push(this.state.deref());
            return this.state.reset(this.future.pop());
        }
    }
}