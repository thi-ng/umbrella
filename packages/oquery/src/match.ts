import type { Fn, NumOrString, Predicate } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { numericOp, stringOp, type Operator } from "@thi.ng/compare";
import type { QueryObj, QueryOpts, QueryTerm } from "./api.js";

export interface MatchMultipleOpts<T> {
	/**
	 * If true, performs union query. I.e. only one of the provided matches
	 * needs to succeed.
	 */
	union: boolean;
	/**
	 * Transformation function to extract an array of values to be matched from
	 * a query item.
	 */
	value: Fn<any, T[]>;
}

/**
 * Syntax sugar for {@link matchMultiple} using string arrays. Matches set of
 * given strings against an item's chosen field of strings and by default only
 * succeeds if all provided strings can be matched.
 *
 * @remarks
 * Any provided string prefixed with `!` is treated as an exclusion and any item
 * which contains any of these exclusions is automatically rejected, even if
 * other strings could be matched.
 *
 * See {@link matchMultiple} for more details & code example.
 *
 * @param key
 * @param matches
 * @param opts
 * @returns
 */
export const matchStrings = <T extends QueryObj = QueryObj>(
	key: QueryTerm["q"][0],
	matches: string[],
	opts?: Partial<MatchMultipleOpts<string>>
) => {
	const [includes, excludes] = matches.reduce(
		(acc, x) => {
			x[0] === "!" ? acc[1].push(x.substring(1)) : acc[0].push(x);
			return acc;
		},
		<string[][]>[[], []]
	);
	return matchMultiple<T, string>(key, includes, excludes, opts);
};

/**
 * Returns a {@link QueryTerm} for use with {@link query} to perform set-like
 * intersection or union queries with optional negation/exclusions. Matches set
 * of given values against an item's chosen field of values and by default only
 * succeeds if all provided `includes` can be matched (aka intersection query)
 * and there're no values from `excludes` present.
 *
 * @remarks
 * If the `union` option is true, only one of the provided values needs to
 * match. Exclusions _always_ take precedence.
 *
 * Note: See {@link matchStrings} for a syntax sugar of this function, aimed at
 * matching `string[]` options.
 *
 * @example
 * ```ts
 * const DB = [
 *   { id: 1, tags: ["a", "b"] },
 *   { id: 2, tags: ["c", "b"] },
 *   { id: 3, tags: ["c", "a"] },
 * ];
 *
 * // tag intersection
 * query(DB, [matchStrings("tags", ["a", "b"])])
 * // [ { id: 1, tags: ["a", "b"] } ]
 *
 * // tag union
 * query(DB, [matchStrings("tags", ["a", "b"])])
 * // here returns full DB...
 * // since each item either has `a` and/or `b` tags
 *
 * // tag exclusion (require `a`, disallow `b`)
 * query(DB, [matchStrings("tags", ["a", "!b"])])
 * // [ { id: 3, tags: ["c", "a"] } ]
 * ```
 *
 * @param key
 * @param matches
 * @param opts
 */
export const matchMultiple = <T extends QueryObj = QueryObj, V = any>(
	key: QueryTerm["q"][0],
	includes: V[],
	excludes: V[],
	opts: Partial<MatchMultipleOpts<V>> = {}
): QueryTerm<T> => {
	const { union = false, value: valueFn } = opts;
	return excludes.length
		? {
				q: [
					key,
					(values: any) => {
						const $values = valueFn ? valueFn(values) : <V[]>values;
						for (let x of excludes) {
							if ($values.includes(x)) return false;
						}
						let match = false;
						for (let x of includes) {
							if ($values.includes(x)) {
								match = true;
								if (union) break;
							} else if (!union) {
								match = false;
								break;
							}
						}
						return match;
					},
				],
				opts: { cwise: false },
		  }
		: { q: [key, includes], opts: { intersect: !union } };
};

/**
 * Returns a {@link QueryTerm} to match a key's value against a regexp or string
 * expression.
 *
 * @remarks
 * If `expr` is a regexp it will be used as is, but if given a string the
 * following rules apply:
 *
 * - if `expr` is the sole `*` it will match any non-null value
 * - if `expr` starts with `=`, `!=`, `<`, `<=`, `>=` or `>`, values will be
 *   matched using comparators. If the following chars in `expr` are numeric,
 *   the comparisons will be done as numbers otherwise as strings. Whitespace
 *   between operator and value are ignored.
 *
 * @example
 * ```ts
 * const DB = [
 *   { id: "aaa", score: 32 },
 *   { id: "bbbb", score: 60 },
 *   { id: "c", score: 15 },
 * ];
 *
 * query(DB, [matchPattern("id", /[a-z]{4,}/)]);
 * // [{ id: "bbbb", score: 60 }]
 * query(DB, [matchPattern("id", ">= c")]);
 * // [{ id: "c", score: 15 }]
 *
 * query(DB, [matchPattern("score", "<50")]);
 * // [{ id: "a", score: 32 }, { id: "c", score: 15 }]
 * ```
 *
 * @param key
 * @param expr
 * @param opts
 */
export const matchPattern = <T extends QueryObj = QueryObj>(
	key: QueryTerm["q"][0],
	expr: string | RegExp,
	opts?: Partial<QueryOpts>
): QueryTerm<T> => {
	let re: RegExp;
	if (expr instanceof RegExp) {
		re = expr;
	} else {
		if (expr === "*") return { q: [key, (x: any) => x != null], opts };
		if (/^[<>=!]/.test(expr)) {
			const op = /^[<>=!]+/.exec(expr)![0];
			const arg = expr.substring(op.length).trim();
			const argN = parseFloat(arg);
			return matchCompare(
				key,
				<Operator>op,
				isNaN(argN) ? arg : argN,
				opts
			);
		}
		re = new RegExp(expr, "i");
	}
	return {
		q: [
			key,
			(x: any) => (isString(x) || isNumber(x)) && re.test(String(x)),
		],
		opts,
	};
};

/**
 * Same as the comparison expression case of {@link matchPattern}, only
 * accepting different args.
 *
 * @param key
 * @param match
 * @param opts
 */
export const matchCompare = <T extends QueryObj = QueryObj>(
	key: QueryTerm["q"][0],
	op: Operator | Predicate<any>,
	arg: NumOrString,
	opts?: Partial<QueryOpts>
): QueryTerm<T> => ({
	q: [key, isNumber(arg) ? numericOp(op, arg) : stringOp(op, arg)],
	opts,
});
