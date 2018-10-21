import { ICopy, IEmpty, Pair } from "@thi.ng/api/api";
import { Heap } from "@thi.ng/heaps/heap";
import { EPS } from "@thi.ng/math/api";
import { ensureArray } from "@thi.ng/transducers/func/ensure-array";
import { IDistance } from "@thi.ng/vectors/api";

export type KdIndexable<T> = IDistance<T> & IEmpty<T>;

const CMP = (a, b) => b[0] - a[0];

export class KdNode<K extends KdIndexable<K>, V> {

    parent: KdNode<K, V>;
    l: KdNode<K, V>;
    r: KdNode<K, V>;
    d: number;
    k: Readonly<K>;
    v: V;

    constructor(parent: KdNode<K, V>, dim: number, key: Readonly<K>, val: V) {
        this.parent = parent;
        this.d = dim;
        this.k = key;
        this.v = val;
        this.l = this.r = null;
    }

    *[Symbol.iterator](): IterableIterator<Pair<K, V>> {
        let queue: KdNode<K, V>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield [n.k, n.v];
                queue.push(n.r, n.l);
            }
        }
    }

    *keys(): IterableIterator<K> {
        let queue: KdNode<K, V>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield n.k;
                queue.push(n.r, n.l);
            }
        }
    }

    height() {
        return 1 + Math.max(
            this.l ? this.l.height() : 0,
            this.r ? this.r.height() : 0
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
export class KdTree<K extends KdIndexable<K>, V>
    implements ICopy<KdTree<K, V>> {

    root: KdNode<K, V>;
    dim: number;

    protected _length: number;

    constructor(dim: number, pairs?: Iterable<Pair<K, V>>) {
        this.dim = dim;
        this._length = 0;
        this.root = pairs ?
            this.buildTree(ensureArray(pairs), 0, null) :
            null;
    }

    [Symbol.iterator](): IterableIterator<Pair<K, V>> {
        return (this.root || [])[Symbol.iterator]();
    }

    keys(): IterableIterator<K> {
        return this.root ?
            this.root.keys() :
            [][Symbol.iterator]();
    }

    get length() {
        return this._length;
    }

    copy() {
        return new KdTree(this.dim, this);
    }

    add(p: Readonly<K>, v: V, eps = EPS) {
        eps *= eps;
        const search = (node: KdNode<K, V>, parent: KdNode<K, V>): KdNode<K, V> | false =>
            node ?
                p.distSq(node.k) > eps ?
                    search(
                        p[node.d] < node.k[node.d] ? node.l : node.r,
                        node
                    ) :
                    false :
                parent;
        const parent = search(this.root, null);
        if (parent === false) return false;
        if (parent == null) {
            this.root = new KdNode<K, V>(null, 0, p, v);
        } else {
            const dim = parent.d;
            parent[p[dim] < parent.k[dim] ? "l" : "r"] =
                new KdNode<K, V>(parent, (dim + 1) % this.dim, p, v);
        }
        this._length++;
        return true;
    }

    addAll(pts: Iterable<Pair<K, V>>, eps = EPS) {
        for (let [k, v] of pts) {
            this.add(k, v, eps);
        }
        return this;
    }

    addKey(k: Readonly<K>, eps = EPS) {
        return this.add(k, null, eps);
    }

    addKeys(ks: Iterable<Readonly<K>>, eps = EPS) {
        for (let k of ks) {
            this.add(k, null, eps);
        }
        return this;
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

    find(q: Readonly<K>, eps = EPS): KdNode<K, V> | undefined {
        return find(q, this.root, eps * eps);
    }

    select(q: Readonly<K>, maxNum: number, maxDist?: number): Pair<K, V>[] {
        const res: Pair<K, V>[] = [];
        const src = this.buildSelection(q, maxNum, maxDist);
        for (let n = src.length; --n >= 0;) {
            const nn = src[n][1];
            nn && res.push([nn.k, nn.v]);
        }
        return res;
    }

    selectKeys(q: Readonly<K>, maxNum: number, maxDist?: number): K[] {
        const res: K[] = [];
        const src = this.buildSelection(q, maxNum, maxDist);
        for (let n = src.length; --n >= 0;) {
            const nn = src[n][1];
            nn && res.push(nn.k);
        }
        return res;
    }

    balanceRatio() {
        return this._length ?
            this.root.height() / (Math.log(this._length) / Math.LN2) :
            0;
    }

    protected buildSelection(q: Readonly<K>, maxNum: number, maxDist?: number) {
        const nodes = new Heap<[number, KdNode<K, V>]>(null, { compare: CMP });
        if (maxDist) {
            maxDist *= maxDist;
            const c: [number, KdNode<K, V>] = [maxDist, null];
            for (let i = maxNum; --i >= 0;) {
                nodes.push(c);
            }
        }
        nearest(q, nodes, this.dim, maxNum, this.root);
        return nodes.values.sort(CMP);
    }

    protected buildTree(points: Pair<K, V>[], depth: number, parent: KdNode<K, V>) {
        const n = points.length;
        if (n === 0) {
            return;
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
 * @param p
 * @param node
 * @param epsSq squared epsilon / tolerance
 */
const find = <K extends KdIndexable<K>, V>(p: K, node: KdNode<K, V>, epsSq: number) => {
    if (!node) return;
    return p.distSq(node.k) <= epsSq ?
        node :
        find(p, p[node.d] < node.k[node.d] ? node.l : node.r, epsSq);
};

const findMin = <K extends KdIndexable<K>, V>(node: KdNode<K, V>, dim: number): KdNode<K, V> => {
    if (!node) return;
    if (node.d === dim) {
        return node.l ?
            findMin(node.l, dim) :
            node;
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
 * @param node
 */
const remove = <K extends KdIndexable<K>, V>(node: KdNode<K, V>) => {
    if (!node.l && !node.r) {
        if (!node.parent) {
            return true;
        }
        const parent = node.parent;
        const pdim = parent.d;
        parent[node.k[pdim] < parent.k[pdim] ? "l" : "r"] = null;
        return;
    }
    let next: KdNode<K, V>;
    let nextP: K;
    if (node.r) {
        next = findMin(node.r, node.d);
        nextP = next.k;
        remove(next);
        node.k = nextP;
    } else {
        next = findMin(node.l, node.d);
        nextP = next.k;
        remove(next);
        node.r = node.l;
        node.l = null;
        node.k = nextP;
    }
};

const nearest = <K extends KdIndexable<K>, V>(q: K, acc: Heap<[number, KdNode<K, V>]>, dims: number, maxNum: number, node: KdNode<K, V>) => {
    const p = node.k;
    const ndist = q.distSq(p);
    if (!node.l && !node.r) {
        if (ndist < acc.peek()[0]) {
            if (acc.length >= maxNum) {
                acc.pushPop([ndist, node]);
            } else {
                acc.push([ndist, node]);
            }
        }
        return;
    }
    const ndim = node.d;
    const tp: K = q.empty();
    for (let i = dims; --i >= 0;) {
        tp[i] = i === ndim ? q[i] : p[i];
    }
    const tdist = tp.distSq(p);
    let best =
        !node.r ?
            node.l :
            !node.l ?
                node.r :
                q[ndim] < p[ndim] ?
                    node.l :
                    node.r;
    nearest(q, acc, dims, maxNum, best);
    if (ndist < acc.peek()[0]) {
        if (acc.length >= maxNum) {
            acc.pushPop([ndist, node]);
        } else {
            acc.push([ndist, node]);
        }
    }
    if (tdist < acc.peek()[0]) {
        best = best === node.l ? node.r : node.l;
        best && nearest(q, acc, dims, maxNum, best);
    }
};