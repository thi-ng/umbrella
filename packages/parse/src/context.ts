import type { ICopy, Nullable } from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isString } from "@thi.ng/checks/is-string";
import type { ContextOpts, IReader } from "./api.js";
import { parseError } from "./error.js";
import { defArrayReader } from "./readers/array-reader.js";
import { defStringReader } from "./readers/string-reader.js";
import { __indent } from "./utils.js";

export class ParseState<T> implements ICopy<ParseState<T>> {
	constructor(
		public p: number,
		public l: number,
		public c: number,
		public done?: boolean,
		public last?: T
	) {}

	copy() {
		return new ParseState<T>(this.p, this.l, this.c, this.done, this.last);
	}
}

export class ParseScope<T> implements ICopy<ParseScope<T>> {
	constructor(
		public id: string,
		public state?: Nullable<ParseState<T>>,
		public children?: Nullable<ParseScope<T>[]>,
		public result?: any
	) {}

	copy() {
		return new ParseScope<T>(
			this.id,
			this.state,
			this.children,
			this.result
		);
	}
}

export class ParseContext<T> {
	public opts: ContextOpts;
	protected _scopes!: ParseScope<T>[];
	protected _curr!: ParseScope<T>;

	protected _maxDepth: number;
	protected _peakDepth!: number;
	protected _debug: boolean;
	protected _retain: boolean;

	constructor(public reader: IReader<T>, opts?: Partial<ContextOpts>) {
		this.opts = { maxDepth: 64, debug: false, retain: false, ...opts };
		this._maxDepth = this.opts.maxDepth!;
		this._debug = this.opts.debug!;
		this._retain = this.opts.retain!;
		this.reset();
	}

	reset() {
		this._curr = new ParseScope("root", new ParseState(0, 1, 1));
		this._scopes = [this._curr];
		this._peakDepth = 1;
		this.reader.isDone(this._curr.state!);
		return this;
	}

	start(id: string) {
		const { _scopes: scopes, _maxDepth } = this;
		if (scopes.length >= _maxDepth) {
			parseError(this, `recursion limit reached ${_maxDepth}`);
		}
		const scope = new ParseScope<T>(
			id,
			scopes[scopes.length - 1].state!.copy()
		);
		scopes.push(scope);
		this._peakDepth = Math.max(this._peakDepth, scopes.length);
		this._debug &&
			console.log(
				`${__indent(scopes.length)}start: ${id} (${scope.state!.p})`
			);
		return (this._curr = scope);
	}

	discard() {
		const scopes = this._scopes;
		const child = scopes.pop()!;
		this._curr = scopes[scopes.length - 1];
		this._debug &&
			console.log(`${__indent(scopes.length + 1)}discard: ${child.id}`);
		return false;
	}

	end() {
		const scopes = this._scopes;
		const child = scopes.pop()!;
		const parent = scopes[scopes.length - 1];
		const cstate = child.state;
		this._debug &&
			console.log(
				`${__indent(scopes.length + 1)}end: ${child.id} (${cstate!.p})`
			);
		child.state = this._retain ? parent.state!.copy() : null;
		parent.state = cstate;
		parent.children?.push(child) ?? (parent.children = [child]);
		this._curr = parent;
		return true;
	}

	addChild(
		id: string,
		result: any = null,
		newState: ParseState<T> | boolean = false
	) {
		const curr = this._curr;
		const child = new ParseScope<T>(
			id,
			this._retain ? curr.state!.copy() : null,
			null,
			result
		);
		this._debug &&
			console.log(
				`${__indent(this._scopes.length + 1)}addChild: ${id} (${
					curr.state!.p
				})`
			);
		curr.children?.push(child) ?? (curr.children = [child]);
		if (newState !== false) {
			newState === true
				? this.reader.next(curr.state!)
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

	/**
	 * Returns max. recursion depth which was actually reached. Will always be
	 * less or equal configured {@link ContextOpts.maxDepth}.
	 */
	get peakDepth() {
		return this._peakDepth;
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
