import type { ParseState, IReader } from "../api";

class StringReader implements IReader<string> {
    constructor(protected input: string) {}

    read(state: ParseState<string>): string {
        return this.input[state.p];
    }

    next(state: ParseState<string>): void {
        if (state.done) return;
        state.last = this.input[state.p];
        if (state.last === "\n") {
            state.l++;
            state.c = 1;
        } else {
            state.c++;
        }
        state.done = ++state.p >= this.input.length;
    }

    isDone(state: ParseState<string>) {
        return (state.done = state.p >= this.input.length);
    }

    format(state: ParseState<string>) {
        return `offset ${state.p} (${state.l}:${state.c})`;
    }
}

export const defStringReader = (input: string) => new StringReader(input);
