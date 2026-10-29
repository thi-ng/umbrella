// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Maybe, Predicate } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { arrayZipper, type Location } from "@thi.ng/zipper";

export interface SanitizeOpts {
	/**
	 * Array of element attribute names or regex patterns to remove
	 */
	removeAttribs: (string | RegExp | Predicate<string>)[];
	/**
	 * Array of element attribute names or regex patterns to keep. Takes
	 * precedence over names/patterns defined in
	 * {@link SanitizeOpts.removeAttribs}.
	 */
	keepAttribs: (string | RegExp | Predicate<string>)[];
	/**
	 * Array of element/tag names to remove. Note: Matching elements will be
	 * removed completely, incl. sub-trees.
	 */
	removeElements: string[];
	/**
	 * Array of element element names to keep. Takes precedence over
	 * names/patterns defined in {@link SanitizeOpts.removeElements}.
	 */
	keepElements: string[];
}

/**
 * Takes a pre-normalized hiccup tree and sanitzes it by removing user defined
 * attributes and/or elements. Returns updated result. Does NOT mutate original.
 *
 * @param tree
 * @param opts
 */
export const sanitize = (tree: any[], opts?: Partial<SanitizeOpts>) => {
	opts = {
		...opts,
	};
	if (opts.keepElements && !opts.keepElements.includes(tree[0])) return null;
	if (opts.removeElements?.includes(tree[0])) return null;

	const keepMatchers: Maybe<Predicate<string>[]> =
		opts.keepAttribs?.map(__coerceMatcher) ?? undefined;
	const removeMatchers: Maybe<Predicate<string>[]> =
		opts.removeAttribs?.map(__coerceMatcher) ?? undefined;
	let zipper = arrayZipper(tree);
	let loc: Maybe<Location<any>>;
	while ((loc = zipper.next) != null) {
		const node = loc.node;
		if (isArray(node)) {
			if (opts.keepElements) {
				if (!opts.keepElements.includes(node[0])) {
					loc = loc.remove();
				}
			} else if (opts.removeElements?.includes(node[0])) {
				loc = loc.remove();
			}
		} else if ((keepMatchers || removeMatchers) && isPlainObject(node)) {
			loc = loc.update(sanitizeAttribs, keepMatchers, removeMatchers);
		}
		zipper = loc;
	}
	return zipper.root;
};

/** @internal */
const __coerceMatcher = (
	x: string | RegExp | Predicate<string>
): Predicate<string> =>
	isFunction(x) ? x : isString(x) ? (y) => x === y : (y) => x.test(y);

/**
 * Takes a plain object and array of predicate functions. Returns new object
 * with all keys removed which are matching at least one of the predicates.
 *
 * @remarks
 * Helper function for {@link sanitize}.
 *
 * @param attribs
 * @param keep
 * @param remove
 */
export const sanitizeAttribs = (
	attribs: IObjectOf<any>,
	keep?: Predicate<string>[],
	remove?: Predicate<string>[]
) => {
	const result: IObjectOf<any> = {};
	for (let k in attribs) {
		if ((!keep || keep?.some((f) => f(k))) && !remove?.some((f) => f(k))) {
			result[k] = attribs[k];
		}
	}
	return result;
};
