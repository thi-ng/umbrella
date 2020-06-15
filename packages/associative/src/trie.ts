import type { IObjectOf } from "@thi.ng/api";
import { map, vals } from "@thi.ng/transducers";

export class Trie<K extends ArrayLike<any>, T> {
    protected next: IObjectOf<Trie<K, T>> = {};
    protected vals?: Set<T>;
    protected n = 0;

    *[Symbol.iterator]() {
        const queue: [string, Trie<K, T>][] = [["", this]];
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
        const queue: [string, Trie<K, T>][] = [[prefix, this]];
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
        const queue: Trie<K, T>[] = [this];
        while (queue.length) {
            const node = queue.pop()!;
            if (node.vals) {
                yield* node.vals;
            } else {
                queue.push(...vals(node.next));
            }
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

    *suffixes(prefix: K, withPrefix = false) {
        const node = this.find(prefix);
        if (node) {
            yield* node.keys("", withPrefix ? prefix.toString() : "");
        }
    }

    get(key: K): Set<T> | undefined {
        const node = this.find(key);
        return node ? node.vals : undefined;
    }

    find(key: K) {
        let node: Trie<K, T> | undefined = this;
        for (let i = 0, n = key.length; i < n; i++) {
            node = node!.next[key[i].toString()];
            if (!node) return;
        }
        return node;
    }

    add(key: K, val: T) {
        let node: Trie<K, T> = this;
        for (let i = 0, n = key.length; i < n; i++) {
            const k = key[i].toString();
            const next = node.next[k];
            node = !next ? (node.n++, (node.next[k] = this.makeChild())) : next;
        }
        if (!node.vals) node.vals = this.makeValueSet();
        node.vals.add(val);
    }

    delete(prefix: K, val?: T) {
        const n = prefix.length;
        if (n < 1) return false;
        const path: Trie<K, T>[] = [];
        const key: string[] = [];
        let i = 0;
        let node: Trie<K, T> | undefined = this;
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

    protected makeChild(): Trie<K, T> {
        return new Trie();
    }

    protected makeValueSet(): Set<T> {
        return new Set<T>();
    }

    protected queueChildren(
        queue: [string, Trie<any, any>][],
        prefix: string,
        sep = ""
    ) {
        prefix = prefix.length ? prefix + sep : prefix;
        queue.push(
            ...map(
                (k) => <[string, Trie<any, any>]>[prefix + k, this.next[k]],
                Object.keys(this.next)
            )
        );
    }
}
