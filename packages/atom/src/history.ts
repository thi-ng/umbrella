import { IAtom, IReset, ISwap, SwapFn } from "./api";

export class History<T> implements
    IReset<T>,
    ISwap<T> {

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

    reset(val: T) {
        const prev = this.state.deref(),
            curr = this.state.reset(val);
        curr !== prev && this.record(prev);
        return curr;
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        const prev = this.state.deref(),
            curr = this.state.swap.apply(this.state, [fn, ...args]);
        curr !== prev && this.record(prev);
        return curr;
    }

    protected record(state: T) {
        if (this.history.length == this.maxLen) {
            this.history.shift();
        }
        this.history.push(state);
    }
}
