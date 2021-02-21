import { fillRange } from "@thi.ng/arrays";

/**
 * Typed array based Disjoint Set implementation with quick union and
 * path compression, after Sedgewick & Wayne.
 *
 * @remarks
 * - {@link https://en.wikipedia.org/wiki/Disjoint-set_data_structure}
 * - {@link https://algs4.cs.princeton.edu/lectures/15UnionFind-2x2.pdf}
 */
export class DisjointSet {
    roots: Uint32Array;
    ranks: Uint8Array;
    count: number;

    /**
     * Creates new instance with `n` initial singular subsets.
     *
     * @param n - initial capacity, ID range [0..n)
     */
    constructor(n: number) {
        this.roots = fillRange(new Uint32Array(n));
        this.ranks = new Uint8Array(n);
        this.count = n;
    }

    /**
     * Returns canonical ID (tree root) for given `id`. Unless `id`
     * already is unified with some other ID, this will always return
     * `id` itself (since each node is initially its own root).
     *
     * @param id - node ID
     */
    canonical(id: number) {
        const roots = this.roots;
        while (id !== roots[id]) {
            id = roots[id] = roots[roots[id]];
        }
        return id;
    }

    /**
     * Connects combines the trees of the given two node IDs and returns
     * the new resulting canonical tree root ID.
     *
     * @param a - node ID
     * @param b - node ID
     */
    union(a: number, b: number) {
        const rootA = this.canonical(a);
        const rootB = this.canonical(b);
        if (rootA === rootB) {
            return rootA;
        }
        this.count--;
        const ranks = this.ranks;
        const ra = ranks[rootA];
        const rb = ranks[rootB];
        if (ra < rb) {
            return (this.roots[rootA] = rootB);
        }
        ra === rb && ranks[rootA]++;
        return (this.roots[rootB] = rootA);
    }

    /**
     * Returns true, if the given two nodes belong to the same tree /
     * subset.
     *
     * @param a - node ID
     * @param b - node ID
     */
    unified(a: number, b: number) {
        return this.canonical(a) === this.canonical(b);
    }

    /**
     * Returns a `Map` of all subsets (connected components) with their
     * canonical tree root IDs as keys and arrays of node IDs as values.
     *
     * @remarks
     * If only the number of subsets is required, use the `count`
     * property of this class instance instead (O(1), updated with each
     * call to {@link DisjointSet.union}).
     */
    subsets() {
        const sets: Map<number, number[]> = new Map();
        const roots = this.roots;
        for (let i = roots.length; --i >= 0; ) {
            const id = this.canonical(i);
            const s = sets.get(id);
            if (s) {
                s.push(i);
            } else {
                sets.set(id, [i]);
            }
        }
        return sets;
    }
}

/**
 * Creates a new {@link DisjointSet} with capacity `n`.
 *
 * @param n
 */
export const defDisjointSet = (n: number) => new DisjointSet(n);
