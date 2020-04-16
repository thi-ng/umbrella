import type { ParseState, IReader } from "../api";

class ArrayReader<T> implements IReader<T> {
    constructor(protected input: ArrayLike<T>) {}

    read(state: ParseState<T>): T {
        return this.input[state.p];
    }

    next(state: ParseState<T>): void {
        if (state.done) return;
        state.last = this.input[state.p];
        state.done = ++state.p >= this.input.length;
    }

    isDone(state: ParseState<T>) {
        return (state.done = state.p >= this.input.length);
    }

    format(state: ParseState<T>) {
        return `offset ${state.p}`;
    }
}

export const defArrayReader = <T>(input: ArrayLike<T>) =>
    new ArrayReader(input);
