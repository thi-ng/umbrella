import type {
    Fn6,
    IObjectOf,
    NumOrString,
    Predicate,
    Predicate2,
} from "@thi.ng/api";

export type FTerm = Predicate<any>;

export type OTerm = any | null;

export type SPTerm = Predicate<string> | NumOrString | null;

export type SPInputTerm = SPTerm | NumOrString[] | Set<NumOrString>;

export type QueryObj = IObjectOf<any>;

/**
 * All 27 possible query types.
 *
 * @remarks
 * - l => literal
 * - n => null / wildcard
 * - f => function / predicate
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

export type QueryImpl = Fn6<
    QueryObj,
    QueryObj,
    SPTerm,
    SPTerm,
    OTerm,
    QueryOpts,
    void
>;

export type QueryImpls = Record<QueryType, QueryImpl>;

/**
 * Query function overloads.
 */
export interface QueryFn {
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
    (
        obj: QueryObj,
        s: SPInputTerm,
        p: SPInputTerm,
        o: OTerm,
        res?: QueryObj
    ): QueryObj;

    /**
     * Takes a source array of objects with this structure: [{p1: o, p2: ...},
     * ...]`, and matches each using provided `p`(redicate) and `o`bject terms.
     * Returns new array of matched results (result object format depends on
     * query config given to {@link defQuery}).
     * @remarks
     * If `res` is provided, results will be appended to that array. Otherwise
     * a new result array will be created.
     */
    (obj: QueryObj[], p: SPInputTerm, o: OTerm, res?: any[]): QueryObj[];
}

export interface QueryOpts {
    /**
     * If true, the full object is included in the solution as soon as any of
     * its P(redicate)-O(bject) terms matches. If false, only successfully
     * matched property values will be included for each result.
     *
     * @example
     * ```ts
     * const DB = { a: { id: 1, name: "alice" }, b: { name: "bob" } };
     *
     * defQuery({ full: true })(DB, null, "id", 1)
     * // { a: { id: 1, name: "alice" } }
     *
     * defQuery({ full: false })(DB, null, "id", 1)
     * // { a: { id: 1 } }
     * ```
     *
     * @defaultValue true
     */
    full: boolean;
    /**
     * If true (default), any array values in the target object's O(bject)
     * position will be inspected elementwise rather than matched as array value
     * themselves.
     *
     * @example
     * ```ts
     * const DB = { a: { knows: ["b","c"] }, b: { knows: ["a","c"] }};
     * defQuery({ inspect: true })(DB, null, "knows", "b")
     * // { a: { knows: ["b","c"] } }
     *
     * defQuery({ inspect: false })(DB, null, "knows", (x) => x.includes("b"))
     * // { a: { knows: ["b","c"] } }
     * ```
     */
    inspect: boolean;
    /**
     * Equality predicate applied for matching literals in O(bject) position.
     *
     * @defaultValue thi.ng/equiv#equiv
     */
    equiv: Predicate2<any>;
}
