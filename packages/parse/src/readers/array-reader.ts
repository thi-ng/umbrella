import type { ParseState, IReader } from "../api.js";

class ArrayReader<T> implements IReader<T> {
	constructor(protected _src: ArrayLike<T>) {}

	read(state: ParseState<T>): T {
		return this._src[state.p];
	}

	next(state: ParseState<T>): void {
		if (state.done) return;
		state.last = this._src[state.p];
		state.done = ++state.p >= this._src.length;
	}

	isDone(state: ParseState<T>) {
		return (state.done = state.p >= this._src.length);
	}

	format(state: ParseState<T>) {
		return `offset ${state.p}`;
	}
}

export const defArrayReader = <T>(input: ArrayLike<T>) =>
	new ArrayReader(input);
