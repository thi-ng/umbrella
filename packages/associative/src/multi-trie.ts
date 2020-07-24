import type { Fn0, IObjectOf, Nullable, Pair } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { map, vals } from "@thi.ng/transducers";

export interface MultiTrieOpts<V> {
    /**
     * Custom value set factory (e.g. for using `Set` implementations from this
     * package). Uses native ES6 Set by default.
     */
    vals: Fn0<Set<V>>;
}

export class MultiTrie<K extends ArrayLike<any>, V> {
    protected next: IObjectOf<MultiTrie<K, V>> = {};
    protected vals?: Set<V>;
    protected n = 0;

    constructor(
        pairs?: Nullable<Iterable<Pair<K, V>>>,
        protected opts?: Partial<MultiTrieOpts<V>>
    ) {
        pairs && this.into(pairs);
    }

    *[Symbol.iterator]() {
        const queue: [string, MultiTrie<K, V>][] = [["", this]];
        while (queue.length) {
            const [prefix, node] = queue.pop()!;
            if (node.vals) {
                yield* map((v) => [prefix, v], node.vals);
            } else {
                node.queueChildren(queue, prefix);
            }
        }
    }

    *keys(sep = "", prefix = "") {
        const queue: [string, MultiTrie<K, V>][] = [[prefix, this]];
        while (queue.length) {
            const [key, node] = queue.pop()!;
            if (node.vals) {
                yield key;
            } else {
                node.queueChildren(queue, key, sep);
            }
        }
    }

    *values() {
        const queue: MultiTrie<K, V>[] = [this];
        while (queue.length) {
            const node = queue.pop()!;
            if (node.vals) {
                yield* node.vals;
            } else {
                queue.push(...vals(node.next));
            }
        }
    }

    *suffixes(prefix: K, withPrefix = false, sep = "") {
        const node = this.find(prefix);
        if (node) {
            yield* node.keys(
                sep,
                withPrefix
                    ? isArray(prefix)
                        ? prefix.join(sep)
                        : prefix.toString()
                    : ""
            );
        }
    }

    clear() {
        this.next = {};
        this.n = 0;
        this.vals = undefined;
    }

    has(key: K) {
        return !!this.get(key);
    }

    hasPrefix(prefix: K) {
        return !!this.find(prefix);
    }

    get(key: K): Set<V> | undefined {
        const node = this.find(key);
        return node ? node.vals : undefined;
    }

    find(key: K) {
        let node: MultiTrie<K, V> | undefined = this;
        for (let i = 0, n = key.length; i < n; i++) {
            node = node!.next[key[i].toString()];
            if (!node) return;
        }
        return node;
    }

    /**
     * Returns longest known prefix for `key` as array. If array is
     * empty, the given key has no partial matches.
     *
     * @param key
     */
    knownPrefix(key: K) {
        let node: MultiTrie<K, V> | undefined = this;
        const prefix: K[] = [];
        for (let i = 0, n = key.length; i < n; i++) {
            const k = key[i].toString();
            const next: MultiTrie<K, V> | undefined = node!.next[k];
            if (!next) break;
            prefix.push(k);
            node = next;
        }
        return prefix;
    }

    hasKnownPrefix(key: K) {
        return this.knownPrefix(key).length > 0;
    }

    add(key: K, val: V) {
        let node: MultiTrie<K, V> = this;
        for (let i = 0, n = key.length; i < n; i++) {
            const k = key[i].toString();
            const next = node.next[k];
            node = !next
                ? (node.n++, (node.next[k] = new MultiTrie(null, this.opts)))
                : next;
        }
        if (!node.vals) {
            const ctor = this.opts?.vals;
            node.vals = ctor ? ctor() : new Set<V>();
        }
        node.vals.add(val);
    }

    into(xs: Iterable<[K, V]>) {
        for (let [k, v] of xs) {
            this.add(k, v);
        }
    }

    delete(prefix: K, val?: V) {
        const n = prefix.length;
        if (n < 1) return false;
        const path: MultiTrie<K, V>[] = [];
        const key: string[] = [];
        let i = 0;
        let node: MultiTrie<K, V> | undefined = this;
        for (; i < n; i++) {
            const k = prefix[i].toString();
            key.push(k);
            path.push(node);
            node = node.next[k];
            if (!node) return false;
        }
        // if val is given, remove from set
        // and only collapse path if no other vals for key
        if (val !== undefined) {
            const vals = node.vals;
            if (vals && vals.has(val)) {
                vals.delete(val);
                if (vals.size > 0) return true;
            } else {
                return false;
            }
        }
        // collapse path
        while ((node = path[--i])) {
            delete node.next[key[i]];
            if (--node.n) break;
        }
        return true;
    }

    protected queueChildren(
        queue: [string, MultiTrie<any, any>][],
        prefix: string,
        sep = ""
    ) {
        prefix = prefix.length ? prefix + sep : prefix;
        queue.push(
            ...Object.keys(this.next).map(
                (k) => <[string, MultiTrie<any, any>]>[prefix + k, this.next[k]]
            )
        );
    }
}

export const defMultiTrie = <K extends ArrayLike<any>, V>(
    pairs?: Iterable<Pair<K, V>>,
    opts?: Partial<MultiTrieOpts<V>>
) => new MultiTrie(pairs, opts);
