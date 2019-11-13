import { Fn, ICopy, Pair } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays";
import { ISpatialAccel } from "@thi.ng/geom-api";
import { Heap } from "@thi.ng/heaps";
import { EPS } from "@thi.ng/math";
import { distSq, ReadonlyVec, Vec } from "@thi.ng/vectors";

type MaybeKdNode<K extends ReadonlyVec, V> = KdNode<K, V> | null;

const CMP = (a: [number, any], b: [number, any]) => b[0] - a[0];

export class KdNode<K extends ReadonlyVec, V> {
    parent: KdNode<K, V> | null;
    l: KdNode<K, V> | null;
    r: KdNode<K, V> | null;
    d: number;
    k: K;
    v: V;

    constructor(parent: MaybeKdNode<K, V>, dim: number, key: K, val: V) {
        this.parent = parent;
        this.d = dim;
        this.k = key;
        this.v = val;
        this.l = this.r = null;
    }

    *[Symbol.iterator](): IterableIterator<Pair<K, V>> {
        let queue: MaybeKdNode<K, V>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield [n.k, n.v];
                queue.push(n.r, n.l);
            }
        }
    }

    *keys(): IterableIterator<K> {
        let queue: MaybeKdNode<K, V>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield n.k;
                queue.push(n.r, n.l);
            }
        }
    }

    height(): number {
        return (
            1 +
            Math.max(this.l ? this.l.height() : 0, this.r ? this.r.height() : 0)
        );
    }
}

/**
 * https://en.wikipedia.org/wiki/K-d_tree
 *
 * Partially based on:
 * https://github.com/ubilabs/kd-tree-javascript
 *
 */
export class KdTree<K extends ReadonlyVec, V>
    implements ICopy<KdTree<K, V>>, ISpatialAccel<K, V> {
    root: KdNode<K, V> | null;
    dim: number;

    protected _length: number;

    constructor(dim: number, pairs?: Iterable<Pair<K, V>>) {
        this.dim = dim;
        this._length = 0;
        this.root = pairs ? this.buildTree(ensureArray(pairs), 0, null) : null;
    }

    [Symbol.iterator](): IterableIterator<Pair<K, V>> {
        return (this.root || [])[Symbol.iterator]();
    }

    keys(): IterableIterator<K> {
        return this.root ? this.root.keys() : [][Symbol.iterator]();
    }

    get length() {
        return this._length;
    }

    copy() {
        return new KdTree(this.dim, this);
    }

    add(p: K, v: V, eps = EPS) {
        eps *= eps;
        const search = (
            node: MaybeKdNode<K, V>,
            parent: MaybeKdNode<K, V>
        ): MaybeKdNode<K, V> =>
            node
                ? search(p[node.d] < node.k[node.d] ? node.l : node.r, node)
                : parent;
        let parent: MaybeKdNode<K, V>;
        if (this.root) {
            parent = nearest1(p, [eps * eps, null], this.dim, this.root)[1];
            if (parent) {
                return false;
            }
            parent = search(this.root, null)!;
            const dim = parent.d;
            parent[p[dim] < parent.k[dim] ? "l" : "r"] = new KdNode<K, V>(
                parent,
                (dim + 1) % this.dim,
                p,
                v
            );
        } else {
            this.root = new KdNode<K, V>(null, 0, p, v);
        }
        this._length++;
        return true;
    }

    addAll(pts: Iterable<Pair<K, V>>, eps = EPS) {
        let ok = true;
        for (let [k, v] of pts) {
            ok = this.add(k, v, eps) && ok;
        }
        return ok;
    }

    addKey(k: Readonly<K>, eps = EPS) {
        return this.add(k, null!, eps);
    }

    addKeys(ks: Iterable<Readonly<K>>, eps = EPS) {
        let ok = true;
        for (let k of ks) {
            ok = this.add(k, null!, eps) && ok;
        }
        return ok;
    }

    remove(p: Readonly<K>) {
        const node = find(p, this.root, 0);
        if (node) {
            remove(node) && (this.root = null);
            this._length--;
            return true;
        }
        return false;
    }

    has(k: Readonly<K>, eps = EPS) {
        return (
            !!this.root &&
            !!nearest1(k, [eps * eps, null], this.dim, this.root)[1]
        );
    }

    select(q: Readonly<K>, maxNum: number, maxDist?: number): Pair<K, V>[] {
        return this.doSelect(q, (x) => [x.k, x.v], maxNum, maxDist);
    }

    selectKeys(q: Readonly<K>, maxNum: number, maxDist?: number) {
        return this.doSelect(q, (x) => x.k, maxNum, maxDist);
    }

    selectVals(q: Readonly<K>, maxNum: number, maxDist?: number) {
        return this.doSelect(q, (x) => x.v, maxNum, maxDist);
    }

    balanceRatio() {
        return this._length
            ? this.root!.height() / (Math.log(this._length) / Math.LN2)
            : 0;
    }

    protected buildSelection(
        q: Readonly<K>,
        maxNum: number,
        maxDist = Infinity
    ) {
        const nodes = new Heap<[number, KdNode<K, V> | null]>(null, {
            compare: CMP
        });
        maxDist *= maxDist;
        const c: [number, KdNode<K, V> | null] = [maxDist, null];
        for (let i = maxNum; --i >= 0; ) {
            nodes.push(c);
        }
        nearest(q, nodes, this.dim, maxNum, this.root!);
        return nodes.values.sort(CMP);
    }

    protected doSelect<T>(
        q: Readonly<K>,
        f: Fn<KdNode<K, V>, T>,
        maxNum: number,
        maxDist?: number
    ): T[] {
        if (!this.root) return [];
        const res: any[] = [];
        if (maxNum === 1) {
            const sel = nearest1(
                q,
                [maxDist != null ? maxDist * maxDist : Infinity, null],
                this.dim,
                this.root
            )[1];
            sel && res.push(f(sel));
        } else {
            const sel = this.buildSelection(q, maxNum, maxDist);
            for (let n = sel.length; --n >= 0; ) {
                const s = sel[n][1];
                s && res.push(f(s));
            }
        }
        return res;
    }

    protected buildTree(
        points: Pair<K, V>[],
        depth: number,
        parent: KdNode<K, V> | null
    ) {
        const n = points.length;
        if (n === 0) {
            return null;
        }
        this._length++;
        let dim = depth % this.dim;
        if (n === 1) {
            return new KdNode<K, V>(parent, dim, ...points[0]);
        }
        points.sort((a, b) => a[0][dim] - b[0][dim]);
        const med = n >>> 1;
        const node = new KdNode<K, V>(parent, dim, ...points[med]);
        node.l = this.buildTree(points.slice(0, med), depth + 1, node);
        node.r = this.buildTree(points.slice(med + 1), depth + 1, node);
        return node;
    }
}

/**
 * Returns node for point or `undefined` if none found.
 *
 * @param p -
 * @param node -
 * @param epsSq - squared epsilon / tolerance
 */
const find = <K extends ReadonlyVec, V>(
    p: K,
    node: MaybeKdNode<K, V>,
    epsSq: number
): KdNode<K, V> | undefined => {
    if (!node) return;
    return distSq(p, node.k) <= epsSq
        ? node
        : find(p, p[node.d] < node.k[node.d] ? node.l : node.r, epsSq);
};

const findMin = <K extends ReadonlyVec, V>(
    node: MaybeKdNode<K, V>,
    dim: number
): MaybeKdNode<K, V> => {
    if (!node) return null;
    if (node.d === dim) {
        return node.l ? findMin(node.l, dim) : node;
    }
    const q = node.k[dim];
    const l = findMin(node.l, dim);
    const r = findMin(node.r, dim);
    let min = node;
    if (l && l.k[dim] < q) {
        min = l;
    }
    if (r && r.k[dim] < min.k[dim]) {
        min = r;
    }
    return min;
};

/**
 * Returns true if root is to be deleted.
 *
 * @param node -
 */
const remove = <K extends ReadonlyVec, V>(node: KdNode<K, V>) => {
    if (!node.l && !node.r) {
        if (!node.parent) {
            return true;
        }
        const parent = node.parent;
        const pdim = parent.d;
        parent[node.k[pdim] < parent.k[pdim] ? "l" : "r"] = null;
        return;
    }
    let next: MaybeKdNode<K, V>;
    let nextP: K;
    if (node.r) {
        next = findMin(node.r, node.d)!;
        nextP = next.k;
        remove(next);
        node.k = nextP;
    } else {
        next = findMin(node.l, node.d)!;
        nextP = next.k;
        remove(next);
        node.r = node.l;
        node.l = null;
        node.k = nextP;
    }
};

const nearest = <K extends ReadonlyVec, V>(
    q: K,
    acc: Heap<[number, MaybeKdNode<K, V>]>,
    dims: number,
    maxNum: number,
    node: KdNode<K, V>
) => {
    const p = node.k;
    const ndist = distSq(p, q);
    if (!node.l && !node.r) {
        collect(acc, node, maxNum, ndist);
        return;
    }
    const tdist = nodeDist(node, dims, q, p);
    let best = bestChild(node, q);
    nearest(q, acc, dims, maxNum, best!);
    collect(acc, node, maxNum, ndist);
    if (!acc.length || tdist < acc.peek()[0]) {
        best = best === node.l ? node.r : node.l;
        best && nearest(q, acc, dims, maxNum, best);
    }
};

/**
 * Optimized version of `nearest()` for single closest point search.
 *
 * @param q -
 * @param acc -
 * @param dims -
 * @param node -
 */
const nearest1 = <K extends ReadonlyVec, V>(
    q: K,
    acc: [number, MaybeKdNode<K, V>],
    dims: number,
    node: KdNode<K, V>
): [number, MaybeKdNode<K, V>] => {
    const p = node.k;
    const ndist = distSq(p, q);
    if (!node.l && !node.r) {
        collect1(acc, node, ndist);
        return acc;
    }
    const tdist = nodeDist(node, dims, q, p);
    let best = bestChild(node, q);
    nearest1(q, acc, dims, best!);
    collect1(acc, node, ndist);
    if (tdist < acc[0]) {
        best = best === node.l ? node.r : node.l;
        best && nearest1(q, acc, dims, best);
    }
    return acc;
};

const bestChild = <K extends ReadonlyVec, V>(node: KdNode<K, V>, q: K) => {
    const d = node.d;
    return !node.r
        ? node.l
        : !node.l
        ? node.r
        : q[d] < node.k[d]
        ? node.l
        : node.r;
};

const collect = <K extends ReadonlyVec, V>(
    acc: Heap<[number, MaybeKdNode<K, V>]>,
    node: KdNode<K, V>,
    maxNum: number,
    ndist: number
) =>
    (!acc.length || ndist < acc.peek()[0]) &&
    (acc.length >= maxNum
        ? acc.pushPop([ndist, node])
        : acc.push([ndist, node]));

const collect1 = <K extends ReadonlyVec, V>(
    acc: [number, MaybeKdNode<K, V>],
    node: KdNode<K, V>,
    ndist: number
) => ndist < acc[0] && ((acc[0] = ndist), (acc[1] = node));

const TMP: Vec = [];

const nodeDist = <K extends ReadonlyVec, V>(
    node: KdNode<K, V>,
    dims: number,
    q: K,
    p: K
) => {
    for (let i = dims, d = node.d; --i >= 0; ) {
        TMP[i] = i === d ? q[i] : p[i];
    }
    return distSq(TMP, p);
};
