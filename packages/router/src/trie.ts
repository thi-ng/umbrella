import { illegalArgs } from "@thi.ng/errors";

/**
 * Trie data structure for storing & matching route patterns with wildcards.
 *
 * @remarks
 * Wildcard handling:
 *
 * - `?` - matches any single item
 * - `+` - matches 1 or more items following (only to be used in final position)
 *
 * `?` has priority over `+`
 *
 * Wildcards ONLY match items which aren't defined by other branches. E.g. given
 * these patterns:
 *
 * - trie.set(["a", "?", "c"], "A")
 * - trie.set(["a", "b"], "B")
 *
 * ...the `?` wildcard in first pattern will NOT match ["a","b","c"], because
 * ["a","b"] is defined (but without "c")
 */
export class Trie<T> {
	n: Record<string, Trie<T>> = {};
	v?: T;

	constructor(key?: string[], v?: T | undefined, i = 0) {
		if (key && v !== undefined) {
			if (i < key.length) this.set(key, v, i);
			else this.v = v;
		}
	}

	set(key: string[], v: T, i = 0) {
		if (i >= key.length) {
			this.v = v;
			return;
		}
		let k = key[i];
		if (k === "+" && i < key.length - 1)
			illegalArgs("`+` only allowed in tail position");
		if (k[0] === "?") k = "?";
		const next = this.n[k];
		if (next) next.set(key, v, i + 1);
		else this.n[k] = new Trie(key, v, i + 1);
	}

	get(key: string[], i = 0): T | undefined {
		if (i >= key.length) return this.v;
		const next = this.n[key[i]] || this.n["?"];
		return next ? next.get(key, i + 1) : this.n["+"]?.v;
	}
}
