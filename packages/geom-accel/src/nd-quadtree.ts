import { assert, Pair } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { pointInCenteredBox, testCenteredBoxSphere } from "@thi.ng/geom-isec";
import {
    iterate,
    map,
    permutations,
    repeat,
    take
} from "@thi.ng/transducers";
import {
    addmN,
    distSq,
    madd,
    mulN,
    MultiVecOpRoVV,
    ReadonlyVec,
    submN,
    vop
} from "@thi.ng/vectors";

const MAX_DIM = 16;

const maxChildren = [
    ...take(
        MAX_DIM + 1,
        iterate((x) => x * 2, 1)
    )
];

const childOffsets: ReadonlyVec[][] = [];

const initChildOffsets = (dim: number) =>
    (childOffsets[dim] = [...permutations(...repeat([-1, 1], dim))]);

export const ndQuadtreeFromMinMax = <K extends ReadonlyVec, V>(
    min: ReadonlyVec,
    max: ReadonlyVec
) => {
    const dim = min.length;
    assert(dim > 0 && dim <= MAX_DIM, `illegal dimension: ${dim}`);
    initChildOffsets(dim);
    return new NdQuadtree<K, V>(
        undefined,
        addmN([], min, max, 0.5),
        submN([], max, min, 0.5)
    );
};

/**
 * Point-based quadtree for nD keys (due to lookup tables, currently
 * only up to 16 dimensions). Supports radial range queries and key
 * removal with tree pruning. See {@link ndQuadtreeFromMinMax}.
 *
 * @remarks
 * Partially ported from Clojure version of {@link http://thi.ng/geom}.
 */
export class NdQuadtree<K extends ReadonlyVec, V> {
    pos: ReadonlyVec;
    size: ReadonlyVec;
    parent?: NdQuadtree<K, V>;
    children?: NdQuadtree<K, V>[];
    numChildren: number;
    key?: K;
    val?: V;

    constructor(
        parent: NdQuadtree<K, V> | undefined,
        pos: ReadonlyVec,
        size: ReadonlyVec
    ) {
        this.parent = parent;
        this.pos = pos;
        this.size = size;
        this.numChildren = 0;
    }

    [Symbol.iterator](): IterableIterator<Pair<K, V | undefined>> {
        return map((n) => [n.key!, n.val], this.nodes());
    }

    keys() {
        return map((n) => <K>n.key, this.nodes());
    }

    values() {
        return map((n) => n.val, this.nodes());
    }

    *nodes(all = false) {
        let queue: NdQuadtree<K, V>[] = [this];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                if (all || n.key) yield n;
                if (n.children) queue = queue.concat(n.children);
            }
        }
    }

    clear() {
        delete this.children;
        delete this.key;
        delete this.val;
    }

    add(p: K, val?: V, eps = -1): boolean {
        return (
            (eps <= 0 || !this.selectKeys(p, eps, [], 1).length) &&
            this.containsPoint(p) &&
            this.addUnsafe(p, val)
        );
    }

    addUnsafe(p: K, val?: V): boolean {
        if (this.key) {
            if (equivArrayLike(this.key, p)) {
                this.val = val;
                return false;
            }
            this.ensureChild(childID(this.key, this.pos)).addUnsafe(
                this.key,
                this.val
            );
            delete this.key;
            delete this.val;
        }
        if (this.children) {
            return this.ensureChild(childID(p, this.pos)).addUnsafe(p, val);
        } else {
            this.key = p;
            this.val = val;
        }
        return true;
    }

    addKeys(keys: Iterable<K>, eps?: number) {
        let ok = true;
        for (let k of keys) {
            ok = this.add(k, undefined, eps) && ok;
        }
        return ok;
    }

    addAll(pairs: Iterable<Pair<K, V | undefined>>, eps?: number) {
        let ok = true;
        for (let [k, v] of pairs) {
            ok = this.add(k, v, eps) && ok;
        }
        return ok;
    }

    remove(p: ReadonlyVec) {
        let node = this.nodeForPoint(p);
        if (!node) return false;
        delete node.key;
        delete node.val;
        let doPrune = true;
        while (node.parent) {
            node = node!.parent;
            delete node.children![childID(p, node.pos)];
            doPrune = --node.numChildren === 0;
            if (doPrune) delete node.children;
            else break;
        }
        return true;
    }

    has(p: ReadonlyVec, eps = -1) {
        return !!(eps <= 0
            ? this.nodeForPoint(p)
            : this.selectKeys(p, eps, [], 1).length);
    }

    get(p: ReadonlyVec, eps = -1) {
        if (eps <= 0) {
            const node = this.nodeForPoint(p);
            return node ? node.val : undefined;
        }
        return this.selectVals(p, eps, [], 1)[0];
    }

    selectKeys(p: ReadonlyVec, r: number, acc: K[] = [], max = Infinity) {
        if (acc.length >= max) return acc;
        if (testCenteredBoxSphere(this.pos, this.size, p, r)) {
            if (this.key) {
                if (distSq(this.key, p) < r * r) {
                    acc.push(this.key);
                }
            } else if (this.children) {
                for (
                    let i = maxChildren[this.pos.length], j = this.numChildren;
                    --i >= 0 && j > 0;

                ) {
                    if (this.children[i]) {
                        this.children[i].selectKeys(p, r, acc, max);
                        j--;
                    }
                }
            }
        }
        return acc;
    }

    selectVals(
        p: ReadonlyVec,
        r: number,
        acc: (V | undefined)[] = [],
        max = Infinity
    ) {
        if (acc.length >= max) return acc;
        if (testCenteredBoxSphere(this.pos, this.size, p, r)) {
            if (this.key) {
                if (distSq(this.key!, p) < r * r) {
                    acc.push(this.val);
                }
            } else if (this.children) {
                for (
                    let i = maxChildren[this.pos.length], j = this.numChildren;
                    --i >= 0 && j > 0;

                ) {
                    if (this.children[i]) {
                        this.children[i].selectVals(p, r, acc, max);
                        j--;
                    }
                }
            }
        }
        return acc;
    }

    containsPoint(p: ReadonlyVec) {
        return pointInCenteredBox(p, this.pos, this.size);
    }

    nodeForPoint(p: ReadonlyVec): NdQuadtree<K, V> | undefined {
        if (this.key && equivArrayLike(this.key, p)) {
            return this;
        }
        if (this.children) {
            const child = this.children[childID(p, this.pos)];
            return child ? child.nodeForPoint(p) : undefined;
        }
    }

    protected ensureChild(id: number) {
        !this.children && (this.children = []);
        let c = this.children[id];
        if (!c) {
            const csize = mulN([], this.size, 0.5);
            this.children[id] = c = new NdQuadtree(
                this,
                madd([], csize, childOffsets[csize.length][id], this.pos),
                csize
            );
            this.numChildren++;
        }
        return c;
    }
}

const childID: MultiVecOpRoVV<number> = vop(0);
childID.add(1, (p, q) => (p[0] >= q[0] ? 1 : 0));
childID.add(2, (p, q) => (p[0] >= q[0] ? 2 : 0) | (p[1] >= q[1] ? 1 : 0));
childID.add(
    3,
    (p, q) =>
        (p[0] >= q[0] ? 4 : 0) | (p[1] >= q[1] ? 2 : 0) | (p[2] >= q[2] ? 1 : 0)
);
childID.add(
    4,
    (p, q) =>
        (p[0] >= q[0] ? 8 : 0) |
        (p[1] >= q[1] ? 4 : 0) |
        (p[2] >= q[2] ? 2 : 0) |
        (p[3] >= q[3] ? 1 : 0)
);
childID.default((p, q) => {
    let id = 0;
    for (let i = 0, n = p.length - 1, bit = 1 << n; i <= n; i++, bit >>>= 1) {
        p[i] >= q[i] && (id += bit);
    }
    return id;
});
