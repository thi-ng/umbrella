import { Heap } from "@thi.ng/heaps/heap";
import { EPS } from "@thi.ng/math/api";
import { ensureArray } from "@thi.ng/transducers/func/ensure-array";
import { IDistance } from "@thi.ng/vectors/api";
import { IEmpty } from "@thi.ng/api/api";

export type KdIndexable<T> = IDistance<T> & IEmpty<T>;

export class KdNode<T extends KdIndexable<T>> {

    parent: KdNode<T>;
    l: KdNode<T>;
    r: KdNode<T>;
    d: number;
    p: Readonly<T>;

    constructor(parent: KdNode<T>, dim: number, val: Readonly<T>) {
        this.parent = parent;
        this.d = dim;
        this.p = val;
        this.l = this.r = null;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let queue: KdNode<T>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield n.p;
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
export class KdTree<T extends KdIndexable<T>> {

    root: KdNode<T>;
    dim: number;

    protected _length: number;

    constructor(dim: number, points?: Iterable<T>) {
        this.dim = dim;
        this._length = 0;
        this.root = points ?
            this.build(ensureArray(points), 0, null) :
            null;
    }

    [Symbol.iterator](): IterableIterator<T> {
        return (this.root || [])[Symbol.iterator]();
    }

    get length() {
        return this._length;
    }

    // TODO add value support (point = key)
    add(p: Readonly<T>, eps = EPS) {
        eps *= eps;
        const search = (node: KdNode<T>, parent: KdNode<T>): KdNode<T> | false =>
            node ?
                p.distSq(node.p) > eps ?
                    search(
                        p[node.d] < node.p[node.d] ? node.l : node.r,
                        node
                    ) :
                    false :
                parent;
        const parent = search(this.root, null);
        if (parent === false) return false;
        if (parent == null) {
            this.root = new KdNode<T>(null, 0, p);
        } else {
            const dim = parent.d;
            parent[p[dim] < parent.p[dim] ? "l" : "r"] =
                new KdNode<T>(parent, (dim + 1) % this.dim, p);
        }
        this._length++;
        return true;
    }

    addAll(pts: Iterable<T>) {
        for (let p of pts) {
            this.add(p);
        }
        return this;
    }

    remove(p: Readonly<T>) {
        const node = find(p, this.root, 0);
        if (node) {
            remove(node) && (this.root = null);
            this._length--;
            return true;
        }
        return false;
    }

    find(q: Readonly<T>, eps = EPS): KdNode<T> | undefined {
        return find(q, this.root, eps * eps);
    }

    select(q: Readonly<T>, maxNum: number, maxDist?: number): T[] {
        const res: T[] = [];
        const nodes = new Heap<[number, KdNode<T>]>(
            null,
            { compare: (a, b) => b[0] - a[0] }
        );
        if (maxDist) {
            maxDist *= maxDist;
            const c: [number, KdNode<T>] = [maxDist, null];
            for (let i = maxNum; --i >= 0;) {
                nodes.push(c);
            }
        }
        nearest(q, nodes, this.dim, maxNum, this.root);
        for (let n of nodes) {
            if (n[1]) {
                n[1] && res.push(n[1].p);
            }
        }
        return res;
    }

    balanceRatio() {
        return this._length ?
            this.root.height() / (Math.log(this._length) / Math.LN2) :
            0;
    }

    protected build(points: T[], depth: number, parent: KdNode<T>) {
        const n = points.length;
        if (n === 0) {
            return;
        }
        this._length++;
        let dim = depth % this.dim;
        if (n === 1) {
            return new KdNode<T>(parent, dim, points[0]);
        }
        points.sort((a, b) => a[dim] - b[dim]);
        const med = n >>> 1;
        const node = new KdNode<T>(parent, dim, points[med]);
        node.l = this.build(points.slice(0, med), depth + 1, node);
        node.r = this.build(points.slice(med + 1), depth + 1, node);
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
const find = <T extends KdIndexable<T>>(p: T, node: KdNode<T>, epsSq: number) => {
    if (!node) return;
    return p.distSq(node.p) <= epsSq ?
        node :
        find(p, p[node.d] < node.p[node.d] ? node.l : node.r, epsSq);
};

const findMin = <T extends KdIndexable<T>>(node: KdNode<T>, dim: number): KdNode<T> => {
    if (!node) return;
    if (node.d === dim) {
        return node.l ?
            findMin(node.l, dim) :
            node;
    }
    const q = node.p[dim];
    const l = findMin(node.l, dim);
    const r = findMin(node.r, dim);
    let min = node;
    if (l && l.p[dim] < q) {
        min = l;
    }
    if (r && r.p[dim] < min.p[dim]) {
        min = r;
    }
    return min;
};

/**
 * Returns true if root is to be deleted.
 *
 * @param node
 */
const remove = <T extends KdIndexable<T>>(node: KdNode<T>) => {
    if (!node.l && !node.r) {
        if (!node.parent) {
            return true;
        }
        const parent = node.parent;
        const pdim = parent.d;
        parent[node.p[pdim] < parent.p[pdim] ? "l" : "r"] = null;
        return;
    }
    let next: KdNode<T>;
    let nextP: T;
    if (node.r) {
        next = findMin(node.r, node.d);
        nextP = next.p;
        remove(next);
        node.p = nextP;
    } else {
        next = findMin(node.l, node.d);
        nextP = next.p;
        remove(next);
        node.r = node.l;
        node.l = null;
        node.p = nextP;
    }
};

const nearest = <T extends KdIndexable<T>>(q: T, acc: Heap<[number, KdNode<T>]>, dims: number, maxNum: number, node: KdNode<T>) => {
    const p = node.p;
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
    const tp: T = q.empty();
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