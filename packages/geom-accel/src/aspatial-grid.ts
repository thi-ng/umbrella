import type { Fn, Nullable, Pair } from "@thi.ng/api";
import type { IRegionQuery, ISpatialMap } from "@thi.ng/geom-api";
import { Heap } from "@thi.ng/heaps";
import { EPS } from "@thi.ng/math";
import { map } from "@thi.ng/transducers";
import {
    div,
    equals,
    floor,
    ReadonlyVec,
    subN,
    VecOpRoVV,
} from "@thi.ng/vectors";
import { into } from "./utils";

/**
 * Common base class for {@link SpatialGrid2} and {@link SpatialGrid3}.
 *
 * @internal
 */
export abstract class ASpatialGrid<K extends ReadonlyVec, V>
    implements IRegionQuery<K, V, number>, ISpatialMap<K, V> {
    protected _cells!: Nullable<Pair<K, V>[]>[];
    protected _num: number;
    protected _invSize: ReadonlyVec;
    protected _res1: ReadonlyVec;

    constructor(
        protected _min: ReadonlyVec,
        protected _size: ReadonlyVec,
        protected _res: ReadonlyVec
    ) {
        floor(null, this._res);
        this._res1 = subN([], this._res, 1);
        this._invSize = div([], this._res, _size);
        this._num = 0;
    }

    get size() {
        return this._num;
    }

    *[Symbol.iterator](): IterableIterator<Pair<K, V>> {
        const cells = this._cells;
        for (let i = cells.length; --i >= 0; ) {
            if (cells[i]) yield* cells[i]!;
        }
    }

    keys(): IterableIterator<K> {
        return map((p) => p[0], this);
    }

    values(): IterableIterator<V> {
        return map((p) => p[1], this);
    }

    copy() {
        const copy = this.empty();
        copy._num = this._num;
        const src = this._cells;
        const dest = copy._cells;
        for (let i = src.length; --i >= 0; ) {
            dest[i] = src[i] ? src[i]!.slice() : null;
        }
        return copy;
    }

    abstract empty(): ASpatialGrid<K, V>;

    clear() {
        this._cells.fill(null);
        this._num = 0;
    }

    has(k: K, eps = EPS) {
        return !!this.find(k, eps);
    }

    get(k: K, eps = EPS) {
        const pair = this.find(k, eps);
        return pair ? pair[1] : undefined;
    }

    set(k: K, v: V, eps = EPS) {
        if (eps >= 0 && this.query(k, eps, 1).length) return false;
        const id = this.findIndex(k);
        const cell = this._cells[id];
        if (!cell) {
            this._cells[id] = [[k, v]];
            return true;
        }
        cell.push([k, v]);
        this._num++;
        return true;
    }

    into(pairs: Iterable<Pair<K, V>>, eps = EPS) {
        return into(this, pairs, eps);
    }

    remove(k: K) {
        const id = this.findIndex(k);
        const cell = this._cells[id];
        if (!cell) return false;
        for (let i = cell.length; --i >= 0; ) {
            if (equals(cell[i][0], k)) {
                cell.splice(i, 1);
                this._num--;
                return true;
            }
        }
        return false;
    }

    query(
        q: K,
        radius: number,
        limit?: number,
        acc?: Pair<K, V>[]
    ): Pair<K, V>[] {
        return this.doQuery((p) => p, q, radius, limit, acc);
    }

    queryKeys(q: K, radius: number, limit?: number, acc?: K[]): K[] {
        return this.doQuery((p) => p[0], q, radius, limit, acc);
    }

    queryValues(q: K, radius: number, limit?: number, acc?: V[]): V[] {
        return this.doQuery((p) => p[1], q, radius, limit, acc);
    }

    protected abstract doQuery<T>(
        fn: Fn<Pair<K, V>, T>,
        k: K,
        r: number,
        limit?: number,
        acc?: T[]
    ): T[];

    protected queryCell(
        dist: VecOpRoVV<number>,
        heap: Heap<[number, Nullable<Pair<K, V>>?]>,
        c: Pair<K, V>[],
        k: K,
        limit: number
    ) {
        for (let i = c.length; --i >= 0; ) {
            const d = dist(c[i][0], k);
            if (d <= heap.values[0][0]) {
                heap.length >= limit
                    ? heap.pushPop([d, c[i]])
                    : heap.push([d, c[i]]);
            }
        }
    }

    protected find(k: K, eps: number) {
        if (eps > 0) {
            const res = this.query(k, EPS, 1);
            return res.length ? res[0] : undefined;
        }
        const cell = this._cells[this.findIndex(k)];
        if (cell) {
            for (let i = cell.length; --i >= 0; ) {
                if (equals(cell[i][0], k)) return cell[i];
            }
        }
    }

    protected abstract findIndex(k: ReadonlyVec): number;
}
