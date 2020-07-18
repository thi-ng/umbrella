import { isArrayLike, isString } from "@thi.ng/checks";
import type { ContextOpts, IReader, ParseScope, ParseState } from "./api";
import { parseError } from "./error";
import { defArrayReader } from "./readers/array-reader";
import { defStringReader } from "./readers/string-reader";
import { indent } from "./utils";

export class ParseContext<T> {
    protected _scopes!: ParseScope<T>[];
    protected _curr!: ParseScope<T>;

    protected _maxDepth: number;
    protected _debug: boolean;
    protected _retain: boolean;

    constructor(public reader: IReader<T>, opts?: Partial<ContextOpts>) {
        opts = { maxDepth: 32, debug: false, retain: false, ...opts };
        this._maxDepth = opts.maxDepth!;
        this._debug = opts.debug!;
        this._retain = opts.retain!;
        this.reset();
    }

    reset() {
        this._curr = {
            id: "root",
            state: { p: 0, l: 1, c: 1 },
            children: null,
            result: null,
        };
        this._scopes = [this._curr];
        this.reader.isDone(this._curr.state!);
        return this;
    }

    start(id: string) {
        if (this._scopes.length >= this._maxDepth) {
            parseError(this, `recursion limit reached ${this._maxDepth}`);
        }
        const scopes = this._scopes;
        const scope: ParseScope<T> = {
            id,
            state: { ...scopes[scopes.length - 1].state! },
            children: null,
            result: null,
        };
        scopes.push(scope);
        this._debug &&
            console.log(
                `${indent(scopes.length)}start: ${id} (${scope.state!.p})`
            );
        return (this._curr = scope);
    }

    discard() {
        const scopes = this._scopes;
        const child = scopes.pop()!;
        this._curr = scopes[scopes.length - 1];
        this._debug &&
            console.log(`${indent(scopes.length + 1)}discard: ${child.id}`);
        return false;
    }

    end() {
        const scopes = this._scopes;
        const child = scopes.pop()!;
        const parent = scopes[scopes.length - 1];
        const cstate = child.state;
        let pstate: ParseState<T>;
        this._debug &&
            console.log(
                `${indent(scopes.length + 1)}end: ${child.id} (${cstate!.p})`
            );
        child.state = this._retain
            ? ((pstate = parent.state!),
              { p: pstate.p, l: pstate.l, c: pstate.c })
            : null;
        parent.state = cstate;
        const children = parent.children;
        children ? children.push(child) : (parent.children = [child]);
        this._curr = parent;
        return true;
    }

    addChild(
        id: string,
        result: any = null,
        newState: ParseState<T> | boolean = false
    ) {
        const curr = this._curr;
        const cstate = curr.state;
        const child: ParseScope<T> = {
            id,
            state: this._retain
                ? { p: cstate!.p, l: cstate!.l, c: cstate!.c }
                : null,
            children: null,
            result,
        };
        this._debug &&
            console.log(
                `${indent(this._scopes.length + 1)}addChild: ${id} (${
                    cstate!.p
                })`
            );
        const children = curr.children;
        children ? children.push(child) : (curr.children = [child]);
        if (newState !== false) {
            newState === true
                ? this.reader.next(cstate!)
                : (this._curr.state = newState);
        }
        return true;
    }

    get scope() {
        return this._curr;
    }

    get state() {
        return this._curr.state!;
    }

    set state(state: ParseState<T>) {
        this._curr.state = state;
    }

    get done() {
        return this._curr.state!.done;
    }

    /**
     * Returns root node.
     */
    get root() {
        return this._scopes[0];
    }

    /**
     * Returns root node's `result` or `undefined`.
     */
    get result() {
        const children = this.root.children;
        return children ? children[0].result : undefined;
    }

    /**
     * Returns root node's children or `undefined`.
     */
    get children() {
        const children = this.root.children;
        return children ? children[0].children : undefined;
    }
}

/**
 * Creates new {@link ParseContext} for given input string, array or
 * reader and context options.
 *
 * @param input -
 * @param opts -
 */
export function defContext(
    input: string,
    opts?: Partial<ContextOpts>
): ParseContext<string>;
export function defContext<T>(
    input: ArrayLike<T>,
    opts?: Partial<ContextOpts>
): ParseContext<T>;
export function defContext<T>(
    input: IReader<T>,
    opts?: Partial<ContextOpts>
): ParseContext<T>;
export function defContext(
    input: string | ArrayLike<any> | IReader<any>,
    opts?: Partial<ContextOpts>
): ParseContext<any> {
    return new ParseContext<string>(
        isString(input)
            ? defStringReader(input)
            : isArrayLike(input)
            ? defArrayReader(input)
            : input,
        opts
    );
}
