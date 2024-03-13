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
 * Match priorities (highest to lowest):
 *
 * 1. Non-parametric values
 * 2. `?` wildcard (params)
 * 3. `+` wildcard
 *
 * If any higher priority route fails and a compatible lower priority route
 * exists, it will still be attempted to be matched.
 *
 * @example
 * ```ts tangle:../export/wildcards.ts
 * import { Trie } from "@thi.ng/router";
 *
 * const trie = new Trie();
 * trie.set(["a", "?", "c"], "A");
 * trie.set(["a", "b"], "B");
 * trie.set(["a", "+"], "C");
 * trie.set(["+"], "D");
 *
 * // matches A because B doesn't match
 * // and A has higher priority than C
 * console.log(trie.get(["a", "b", "c"]));
 * // A
 *
 * // perfect match B
 * console.log(trie.get(["a", "b"]));
 * // B
 *
 * // matches C because neither A or B matches
 * console.log(trie.get(["a", "b", "d"]));
 * // C
 *
 * // matches D because all others fail
 * console.log(trie.get(["a"]));
 * // D
 * ```
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
		let value: T | undefined;
		let next: Trie<T> | undefined;
		// literal match
		if ((next = this.n[key[i]])) value = next.get(key, i + 1);
		if (value !== undefined) return value;
		// param match
		if ((next = this.n["?"])) value = next.get(key, i + 1);
		// wildcard
		return value !== undefined ? value : this.n["+"]?.v;
	}
}
