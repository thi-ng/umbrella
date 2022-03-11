import type { IObjectOf, Pair } from "@thi.ng/api";
import { vals } from "@thi.ng/transducers/vals";

export class TrieMap<T> {
    protected next: IObjectOf<TrieMap<T>> = {};
    protected val?: T;
    protected n = 0;

    constructor(pairs?: Iterable<Pair<string, T>>) {
        pairs && this.into(pairs);
    }

    *[Symbol.iterator]() {
        const queue: Pair<string, TrieMap<T>>[] = [["", this]];
        while (queue.length) {
            const [prefix, node] = queue.pop()!;
            if (node.val !== undefined) {
                yield [prefix, node.val];
            } else {
                node.queueChildren(queue, prefix);
            }
        }
    }

    *keys(prefix = "") {
        const queue: Pair<string, TrieMap<T>>[] = [[prefix, this]];
        while (queue.length) {
            const [key, node] = queue.pop()!;
            if (node.val !== undefined) {
                yield key;
            } else {
                node.queueChildren(queue, key);
            }
        }
    }

    *values() {
        const queue: TrieMap<T>[] = [this];
        while (queue.length) {
            const node = queue.pop()!;
            if (node.val !== undefined) {
                yield node.val;
            } else {
                queue.push(...vals(node.next));
            }
        }
    }

    *suffixes(prefix: string, withPrefix = false) {
        const node = this.find(prefix);
        if (node) {
            yield* node.keys(withPrefix ? prefix : "");
        }
    }

    clear() {
        this.next = {};
        this.n = 0;
        this.val = undefined;
    }

    has(key: string) {
        return this.get(key) !== undefined;
    }

    hasPrefix(prefix: string) {
        return !!this.find(prefix);
    }

    get(key: string, notFound?: T): T | undefined {
        const node = this.find(key);
        return node ? node.val : notFound;
    }

    find(key: string) {
        let node: TrieMap<T> | undefined = this;
        for (let i = 0, n = key.length; i < n; i++) {
            node = node!.next[key[i]];
            if (!node) return;
        }
        return node;
    }

    /**
     * Returns longest known prefix for `key`. Returns undefined if given key
     * has no partial matches.
     *
     * @param key - 
     */
    knownPrefix(key: string) {
        let node: TrieMap<T> | undefined = this;
        let prefix: string = "";
        for (let i = 0, n = key.length; i < n; i++) {
            const k = key[i];
            const next: TrieMap<T> | undefined = node!.next[k];
            if (!next) break;
            prefix += k;
            node = next;
        }
        return prefix || undefined;
    }

    hasKnownPrefix(key: string) {
        return !!this.knownPrefix(key);
    }

    set(key: string, val: T) {
        let node: TrieMap<T> = this;
        for (let i = 0, n = key.length; i < n; i++) {
            const k = key[i];
            const next = node.next[k];
            node = !next ? (node.n++, (node.next[k] = new TrieMap<T>())) : next;
        }
        node.val = val;
    }

    into(pairs: Iterable<Pair<string, T>>) {
        for (let [k, v] of pairs) {
            this.set(k, v);
        }
    }

    delete(prefix: string) {
        const n = prefix.length;
        if (n < 1) return false;
        const path: TrieMap<T>[] = [];
        const key: string[] = [];
        let i = 0;
        let node: TrieMap<T> | undefined = this;
        for (; i < n; i++) {
            const k = prefix[i];
            key.push(k);
            path.push(node);
            node = node.next[k];
            if (!node) return false;
        }
        while ((node = path[--i])) {
            delete node.next[key[i]];
            if (--node.n) break;
        }
        return true;
    }

    protected queueChildren(queue: [string, TrieMap<T>][], prefix: string) {
        queue.push(
            ...Object.keys(this.next).map(
                (k) => <Pair<string, TrieMap<T>>>[prefix + k, this.next[k]]
            )
        );
    }
}

export const defTrieMap = <T>(pairs?: Iterable<Pair<string, T>>) =>
    new TrieMap(pairs);
