// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { IReader } from "../api.js";
import type { ParseState } from "../context.js";

export class ArrayReader<T> implements IReader<T> {
	constructor(protected _src: ArrayLike<T>) {}

	read(state: ParseState<T>): T {
		return this._src[state.p];
	}

	prev(state: ParseState<T>): Maybe<T> {
		return this._src[state.p - 1];
	}

	next(state: ParseState<T>): void {
		if (state.done) return;
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
