import type { IReader, ParseScope } from "./api";
import { parseError } from "./error";
import { defStringReader } from "./string-reader";

interface ContextOpts {
    /**
     * Max recursion depth failsafe.
     *
     * @defaultVal 32
     */
    maxDepth: number;
}

export class ParseContext<T> {
    protected _scopes: ParseScope<T>[];
    protected _curr: ParseScope<T>;
    protected _maxDepth: number;

    constructor(public reader: IReader<T>, opts?: Partial<ContextOpts>) {
        opts = { maxDepth: 32, ...opts };
        this._maxDepth = opts.maxDepth!;
        this._curr = {
            id: "root",
            state: { p: 0, l: 1, c: 1 },
            children: null,
            result: null,
        };
        this._scopes = [this._curr];
        reader.isDone(this._curr.state);
    }

    start(type: string) {
        if (this._scopes.length >= this._maxDepth) {
            parseError(this, `recursion limit reached ${this._maxDepth}`);
        }
        const scopes = this._scopes;
        const scope: ParseScope<T> = {
            id: type,
            state: { ...scopes[scopes.length - 1].state },
            children: null,
            result: null,
        };
        scopes.push(scope);
        return (this._curr = scope);
    }

    discard() {
        const scopes = this._scopes;
        scopes.pop();
        this._curr = scopes[scopes.length - 1];
        return false;
    }

    end() {
        const scopes = this._scopes;
        const child = scopes.pop()!;
        const parent = scopes[scopes.length - 1];
        const cstate = child.state;
        const pstate = parent.state;
        child.state = { p: pstate.p, l: pstate.l, c: pstate.c };
        parent.state = cstate;
        const children = parent.children;
        children ? children.push(child) : (parent.children = [child]);
        this._curr = parent;
        return true;
    }

    get scope() {
        return this._curr;
    }

    get state() {
        return this._curr.state;
    }

    get done() {
        return this._curr.state.done;
    }
}

/**
 * Creates new {@link ParseContext} for given input string and context options.
 *
 * @param input -
 * @param opts -
 */
export const defContext = (input: string, opts?: Partial<ContextOpts>) =>
    new ParseContext<string>(defStringReader(input), opts);
