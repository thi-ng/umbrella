import type {
	Fn,
	Fn6,
	FnU,
	Keys,
	NumOrString,
	Predicate,
	Predicate2,
} from "@thi.ng/api";

export type FTerm = Predicate<any>;

export type OTerm = any | null;

export type SPTerm = Predicate<string> | NumOrString | null;

export type SPInputTerm = SPTerm | NumOrString[] | Set<NumOrString>;

export type QueryObj = Record<string, any>;

/**
 * All 27 possible query types.
 *
 * @remarks
 * - l => literal
 * - n => null / wildcard
 * - f => function / predicate
 *
 * @internal
 */
export type QueryType =
	| "lll"
	| "llf"
	| "lln"
	| "lfl"
	| "lff"
	| "lfn"
	| "lnl"
	| "lnf"
	| "lnn"
	| "fll"
	| "flf"
	| "fln"
	| "ffl"
	| "fff"
	| "ffn"
	| "fnl"
	| "fnf"
	| "fnn"
	| "nll"
	| "nlf"
	| "nln"
	| "nfl"
	| "nff"
	| "nfn"
	| "nnl"
	| "nnf"
	| "nnn";

/**
 * @internal
 */
export type QueryImpl = Fn6<
	QueryObj,
	QueryObj,
	SPTerm,
	SPTerm,
	OTerm,
	QueryOpts,
	void
>;

/**
 * @internal
 */
export type QueryImpls = Record<QueryType, QueryImpl>;

/**
 * Takes an object of this structure `{ s1: { p1: o, p2: ... }, s2: { p1: o
 * }...}`, matches all entries using provided `s`(ubject), `p`(redicate) and
 * `o`(object) terms. Returns new object of matched results (format depends
 * on query config given to {@link defQuery}).
 *
 * @remarks
 * If `res` is provided, results will be injected in that object. Otherwise
 * a new result object will be created.
 */
export type ObjQueryFn<T extends QueryObj = QueryObj> = (
	obj: T,
	s: SPInputTerm,
	p: SPInputTerm,
	o: OTerm,
	res?: QueryObj
) => QueryObj;

/**
 * Takes a source array of objects with this structure: [{p1: o, p2: ...},
 * ...]`, and matches each item using provided `p`(redicate) and `o`bject terms.
 * Returns new array of matched results (result object format depends on query
 * config given to {@link defQuery}).
 * @remarks
 * If `res` is provided, results will be appended to that array. Otherwise a new
 * result array will be created.
 */
export type ArrayQueryFn<T extends QueryObj[]> = (
	src: T,
	p: SPInputTerm,
	o: OTerm,
	res?: T
) => T;

/**
 * Similar to {@link ObjQueryFn}, but only collects and returns a set of
 * matching `s` keys.
 */
export type ObjKeyQueryFn<T extends QueryObj> = (
	obj: T,
	s: SPInputTerm,
	p: SPInputTerm,
	o: OTerm,
	res?: Set<string>
) => Set<string>;

/**
 * Similar to {@link ArrayQueryFn}, but only collects and returns a set of
 * indices of matching objects.
 */
export type ArrayKeyQueryFn<T extends QueryObj[]> = (
	src: T,
	p: SPInputTerm,
	o: OTerm,
	res?: Set<number>
) => Set<number>;

/**
 * Conditional return type for {@link defQuery}.
 */
export type QueryFn<T extends QueryObj | QueryObj[]> = T extends QueryObj[]
	? ArrayQueryFn<T>
	: ObjQueryFn<T>;

/**
 * Conditional return type for {@link defKeyQuery}.
 */
export type KeyQueryFn<T extends QueryObj | QueryObj[]> = T extends QueryObj[]
	? ArrayKeyQueryFn<T>
	: ObjKeyQueryFn<T>;

/**
 * Query behavior options.
 */
export interface QueryOpts {
	/**
	 * If false (default), an entire object is included in the solution as soon
	 * as any of its P(redicate)-O(bject) terms matches. If true, only the
	 * successfully matched property values will be included for each result.
	 *
	 * @example
	 * ```ts
	 * import { defQuery } from "@thi.ng/oquery";
	 *
	 * const DB = { a: { id: 1, name: "alice" }, b: { name: "bob" } };
	 *
	 * defQuery({ partial: false })(DB, null, "id", 1)
	 * // { a: { id: 1, name: "alice" } }
	 *
	 * defQuery({ partial: true })(DB, null, "id", 1)
	 * // { a: { id: 1 } }
	 * ```
	 *
	 * @defaultValue false
	 */
	partial: boolean;
	/**
	 * If true (default), any array or Set values in the target object's
	 * O(bject) position will be matched componentwise rather than matched as
	 * array value themselves.
	 *
	 * @remarks
	 * Array or Set terms in S(ubject) or P(redicate) position are of course
	 * ALWAYS matched in a componentwise manner.
	 *
	 * @example
	 * ```ts
	 * import { defQuery } from "@thi.ng/oquery";
	 *
	 * const DB = { a: { knows: ["b","c"] }, b: { knows: ["a","c"] }};
	 * defQuery({ cwise: true })(DB, null, "knows", "b")
	 * // { a: { knows: ["b","c"] } }
	 *
	 * defQuery({ cwise: false })(DB, null, "knows", (x) => x.includes("b"))
	 * // { a: { knows: ["b","c"] } }
	 * ```
	 *
	 * @defaultValue true
	 */
	cwise: boolean;
	/**
	 * Only used if `cwise` is enabled. If true, ALL of the query elements must
	 * match (aka intersection query). If false (default), an array or Set
	 * query term in O(bject) position will succeed if at least ONE of its
	 * elements is matched (aka union query). .
	 *
	 * @defaultValue false
	 */
	intersect: boolean;
	/**
	 * Equality predicate applied for matching literals in O(bject) position.
	 *
	 * @defaultValue thi.ng/equiv#equiv
	 */
	equiv: Predicate2<any>;
}

/**
 * Subset of {@link QueryOpts} applicable to {@link defKeyQuery}.
 */
export interface KeyQueryOpts
	extends Pick<QueryOpts, "cwise" | "intersect" | "equiv"> {}

export interface QueryTerm<T extends QueryObj = QueryObj> {
	/**
	 * Actual query expressed as tuple of `[key, value]` tuple. Predicate
	 * functions can be used in either position.
	 */
	q: [Keys<T> | Predicate<string> | null, any];
	/**
	 * Optional function to post-process query results.
	 */
	post?: FnU<T[]>;
	/**
	 * Query options for this term.
	 */
	opts?: Partial<QueryOpts>;
}

export interface MultiQueryOpts<T extends QueryObj = QueryObj> {
	/**
	 * Max number of query results. Default: unlimited
	 */
	limit: number;
	/**
	 * If given, results are sorted by this key.
	 */
	sort: Keys<T> | Fn<T, any>;
	/**
	 * Only used if {@link MultiQueryOpts.sort} is given. If true, reverses sort
	 * order.
	 */
	reverse: boolean;
}
