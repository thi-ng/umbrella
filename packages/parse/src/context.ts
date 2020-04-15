import type { ParseScope, IReader } from "./api";
import { peek } from "@thi.ng/arrays";
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
    protected _maxDepth: number;

    constructor(public reader: IReader<T>, opts?: Partial<ContextOpts>) {
        this._scopes = [
            {
                id: "root",
                state: { p: 0, l: 1, c: 1 },
                children: null,
                result: null,
            },
        ];
        opts = { maxDepth: 32, ...opts };
        this._maxDepth = opts.maxDepth!;
    }

    start(type: string) {
        if (this._scopes.length >= this._maxDepth) {
            parseError(this, `recursion limit reached ${this._maxDepth}`);
        }
        const curr = peek(this._scopes);
        const scope: ParseScope<T> = {
            id: type,
            state: { ...curr.state },
            children: null,
            result: null,
        };
        this._scopes.push(scope);
        return scope;
    }

    discard() {
        this._scopes.pop()!;
        return false;
    }

    end() {
        const child = this._scopes.pop()!;
        const parent = peek(this._scopes);
        const cstate = child.state;
        const pstate = parent.state;
        // child.state = pstate;
        child.state = { p: pstate.p, l: pstate.l, c: pstate.c };
        parent.state = cstate;
        const children = parent.children;
        children ? children.push(child) : (parent.children = [child]);
        return true;
    }

    get scope() {
        return peek(this._scopes);
    }

    get state() {
        return peek(this._scopes).state;
    }

    get done() {
        return peek(this._scopes).state.done;
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
