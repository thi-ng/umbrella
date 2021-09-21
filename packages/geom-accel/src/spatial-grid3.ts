import type { Fn, Nullable, Pair } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { Heap } from "@thi.ng/heaps/heap";
import { clamp } from "@thi.ng/math/interval";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addN3 } from "@thi.ng/vectors/addn";
import { distSq3 } from "@thi.ng/vectors/distsq";
import { subN3 } from "@thi.ng/vectors/subn";
import { ASpatialGrid } from "./aspatial-grid";
import { addResults, CMP } from "./utils";

const TMP: Vec = [];

export class SpatialGrid3<K extends ReadonlyVec, V> extends ASpatialGrid<K, V> {
    protected _stride: ReadonlyVec;

    constructor(
        min: ReadonlyVec,
        size: ReadonlyVec,
        res: ReadonlyVec | number
    ) {
        super(min, size, isNumber(res) ? [res, res, res] : res);
        this._cells = new Array(this._res[0] * this._res[1] * this._res[2]);
        this._stride = [this._res[0], this._res[0] * this._res[1]];
    }

    copy(): SpatialGrid3<K, V> {
        return <SpatialGrid3<K, V>>super.copy();
    }

    empty() {
        return new SpatialGrid3<K, V>(this._min, this._size, this._res);
    }

    protected doQuery<T>(
        fn: Fn<Pair<K, V>, T>,
        k: K,
        r: number,
        limit = Infinity,
        acc: T[] = []
    ) {
        const id1 = this.findIndex(subN3(TMP, k, r));
        const id2 = this.findIndex(addN3(TMP, k, r));
        const [width, slice] = this._stride;
        const x1 = id1 % width;
        const x2 = id2 % width;
        const y1 = ((id1 / width) | 0) * width;
        const y2 = ((id2 / width) | 0) * width;
        const z1 = ((id1 / slice) | 0) * slice;
        const z2 = ((id2 / slice) | 0) * slice;
        const cells = this._cells;
        let c: Nullable<Pair<K, V>[]>;
        let x: number, y: number, z: number;
        r *= r;
        const heap = new Heap<[number, Nullable<Pair<K, V>>?]>([[r]], {
            compare: CMP,
        });
        const sel = heap.values;
        for (z = z1; z <= z2; z += slice) {
            for (y = y1; y <= y2; y += width) {
                for (x = x1; x <= x2; x++) {
                    c = cells[z + y + x];
                    c && c.length && this.queryCell(distSq3, heap, c, k, limit);
                }
            }
        }
        return addResults(fn, sel, acc);
    }

    protected findIndex(k: ReadonlyVec) {
        const { _min: min, _res1: res1, _invSize: invSize } = this;
        const kx = clamp((k[0] - min[0]) * invSize[0], 0, res1[0]);
        const ky = clamp((k[1] - min[1]) * invSize[1], 0, res1[1]);
        const kz = clamp((k[2] - min[2]) * invSize[2], 0, res1[2]);
        return (
            (kx | 0) + (ky | 0) * this._stride[0] + (kz | 0) * this._stride[1]
        );
    }
}
