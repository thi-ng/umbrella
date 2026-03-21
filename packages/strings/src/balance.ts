import type { IObjectOf, Maybe, Predicate } from "@thi.ng/api";

/**
 * Takes an (optional) object of open/close string pairs and constructs a
 * function which accepts a string-iterable as input and checks if it contains
 * balanced pairs of the configured "parenthesis"-like pairs. Also supports
 * `symmetric` pairs (given as string array), i.e. those where open/close
 * strings are the same.
 *
 * If `skip` is true (default), balancing will be skipped inside the first
 * symmetric pair encountered (e.g. inside a double-quoted "string").
 *
 * @remarks
 * By default checks against these:
 *
 * - pairs: `()`, `{}`, `[]`
 * - symmetric: `'`, `"` (i.e. single and double quotes)
 *
 * This function is NOT a full parser. Pairs are balanced indiscriminately,
 * unaware of any further syntactic constraints (other than pausing balancing of
 * other pairs if `skip` is enabled).
 *
 * @example
 * ```ts tangle:../export/balance.ts
 * import { balance } from "@thi.ng/strings";
 *
 * // using defaults
 * const check = balance();
 *
 * console.log(check("x = ((a[0] + b[0]) * c[0]) / (a[1] - c[1])"));
 * // true
 *
 * console.log(check("x = ((a[0 + b[0])"));
 * // false
 *
 * // by default skip balancing inside strings/symmetric pairs
 * console.log(check(`"1) one, 2) two"`));
 * // true
 *
 * // balance multi-character pairs
 * const check2 = balance({ "BEGIN": "END;" });
 *
 * // ...and supply tokenized input
 * console.log(check2("foo BEGIN a BEGIN b END; bar END;".split(" ")));
 * // true
 *
 * console.log(check2("foo BEGIN a b".split(" ")));
 * // false
 * ```
 *
 * @param pairs
 */
export const balance = (
	pairs: IObjectOf<string> = {
		"(": ")",
		"{": "}",
		"[": "]",
	},
	symmetric: string[] = [`'`, `"`],
	skip = true
): Predicate<Iterable<string>> => {
	const open = new Set();
	const close = new Set();
	const $symmetric = new Set(symmetric);
	const invPair: Record<string, string> = {};
	for (const [k, v] of Object.entries(pairs)) {
		open.add(k);
		close.add(v);
		invPair[v] = k;
	}

	return (src) => {
		const stack: string[] = [];
		let scope: Maybe<string>;
		for (const c of src) {
			if (scope) {
				if (c === scope) scope = undefined;
			} else if ($symmetric.has(c)) {
				if (c === stack[stack.length - 1]) {
					stack.pop();
				} else {
					if (skip) scope = c;
					else stack.push(c);
				}
			} else if (open.has(c)) {
				stack.push(c);
			} else if (close.has(c) && stack.pop() !== invPair[c]) return false;
		}
		return !(stack.length || scope);
	};
};
