// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { IReader } from "../api.js";
import type { ParseState } from "../context.js";

export class StringReader implements IReader<string> {
	constructor(protected _src: string) {}

	read(state: ParseState<string>): string {
		return this._src[state.p];
	}

	prev(state: ParseState<string>): Maybe<string> {
		return this._src[state.p - 1];
	}

	next(state: ParseState<string>): void {
		if (state.done) return;
		if (this._src[state.p] === "\n") {
			state.l++;
			state.c = 1;
		} else {
			state.c++;
		}
		state.done = ++state.p >= this._src.length;
	}

	isDone(state: ParseState<string>) {
		return (state.done = state.p >= this._src.length);
	}

	format(state: ParseState<string>) {
		return `offset ${state.p} (${state.l}:${state.c})`;
	}
}

export const defStringReader = (input: string) => new StringReader(input);
