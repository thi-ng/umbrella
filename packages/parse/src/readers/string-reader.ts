import type { ParseState, IReader } from "../api.js";

class StringReader implements IReader<string> {
	constructor(protected _src: string) {}

	read(state: ParseState<string>): string {
		return this._src[state.p];
	}

	next(state: ParseState<string>): void {
		if (state.done) return;
		state.last = this._src[state.p];
		if (state.last === "\n") {
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
