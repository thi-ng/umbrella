import type { Fn, Nullable, Pair } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { Heap } from "@thi.ng/heaps/heap";
import { clamp } from "@thi.ng/math/interval";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addN2 } from "@thi.ng/vectors/addn";
import { distSq2 } from "@thi.ng/vectors/distsq";
import { subN2 } from "@thi.ng/vectors/subn";
import { ASpatialGrid } from "./aspatial-grid.js";
import { addResults, CMP } from "./utils.js";

const TMP: Vec = [];

export class SpatialGrid2<K extends ReadonlyVec, V> extends ASpatialGrid<K, V> {
    constructor(
        min: ReadonlyVec,
        size: ReadonlyVec,
        res: ReadonlyVec | number
    ) {
        super(min, size, isNumber(res) ? [res, res] : res);
        this._cells = new Array(this._res[0] * this._res[1]);
    }

    copy(): SpatialGrid2<K, V> {
        return <SpatialGrid2<K, V>>super.copy();
    }

    empty() {
        return new SpatialGrid2<K, V>(this._min, this._size, this._res);
    }

    protected doQuery<T>(
        fn: Fn<Pair<K, V>, T>,
        k: K,
        r: number,
        limit = Infinity,
        acc: T[] = []
    ) {
        const id1 = this.findIndex(subN2(TMP, k, r));
        const id2 = this.findIndex(addN2(TMP, k, r));
        const stride = this._res[0];
        const x1 = id1 % stride;
        const x2 = id2 % stride;
        const y1 = ((id1 / stride) | 0) * stride;
        const y2 = ((id2 / stride) | 0) * stride;
        const cells = this._cells;
        let c: Nullable<Pair<K, V>[]>;
        let x: number, y: number;
        r *= r;
        const heap = new Heap<[number, Nullable<Pair<K, V>>?]>([[r]], {
            compare: CMP,
        });
        const sel = heap.values;
        for (y = y1; y <= y2; y += stride) {
            for (x = x1; x <= x2; x++) {
                c = cells[y + x];
                c && c.length && this.queryCell(distSq2, heap, c, k, limit);
            }
        }
        return addResults(fn, sel, acc);
    }

    protected findIndex(k: ReadonlyVec) {
        const { _min: min, _res1: res1, _invSize: invSize } = this;
        const kx = clamp((k[0] - min[0]) * invSize[0], 0, res1[0]);
        const ky = clamp((k[1] - min[1]) * invSize[1], 0, res1[1]);
        return (kx | 0) + (ky | 0) * this._res[0];
    }
}
