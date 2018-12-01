import { peek } from "@thi.ng/transducers/func/peek";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { copy } from "@thi.ng/vectors3/copy";
import { dist } from "@thi.ng/vectors3/dist";
import { mixN } from "@thi.ng/vectors3/mixn";
import { normalize } from "@thi.ng/vectors3/normalize";
import { sub } from "@thi.ng/vectors3/sub";
import { VecPair } from "../api";

export class Sampler {

    points: ReadonlyVec[];
    index: number[];

    constructor(points: ReadonlyVec[], closed = false) {
        if (closed) {
            this.points = points.slice();
            this.points.push(points[0]);
        } else {
            this.points = <any>points;
        }
        this.buildIndex();
    }

    pointAt(t: number) {
        const pts = this.points;
        const n = pts.length - 1;
        if (n < 0) {
            return;
        }
        if (n === 0 || t <= 0) {
            return pts[0];
        }
        if (t >= 1) {
            return pts[n];
        }
        const idx = this.index;
        const t0 = t * idx[n];
        for (let i = 1; i <= n; i++) {
            if (idx[i] >= t0) {
                return mixN([], pts[i - 1], pts[i], (t0 - idx[i - 1]) / (idx[i] - idx[i - 1]));
            }
        }
    }

    segmentAt(t: number): VecPair {
        let i = this.indexAt(t);
        if (i === undefined) {
            return;
        }
        i = Math.max(1, i);
        return [this.points[i - 1], this.points[i]];
    }

    tangentAt(t: number, n = 1) {
        const seg = this.segmentAt(t);
        return seg ?
            normalize(null, sub([], seg[1], seg[0]), n) :
            undefined;
    }

    indexAt(t: number) {
        const pts = this.points;
        const n = pts.length - 1;
        if (n < 0) {
            return;
        }
        if (n === 0 || t <= 0) {
            return 0;
        }
        if (t >= 1) {
            return n;
        }
        const idx = this.index;
        const t0 = t * idx[n];
        for (let i = 1; i <= n; i++) {
            if (idx[i] >= t0) {
                return i;
            }
        }
    }

    sampleUniform(dist: number, includeLast = false, result: Vec[] = []) {
        const index = this.index;
        const pts = this.points;
        const total = peek(index);
        const delta = dist / total;
        const n = index.length;
        for (let t = 0, i = 1; t < 1; t += delta) {
            const ct = t * total;
            while (ct >= index[i] && i < n) { i++; }
            if (i >= n) break;
            const p = index[i - 1];
            result.push(mixN([], pts[i - 1], pts[i], (ct - p) / (index[i] - p)));
        }
        if (includeLast) {
            result.push(copy(peek(pts)));
        }
        return result;
    }

    sampleFixedNum(num: number, includeLast = false, result?: Vec[]) {
        return this.sampleUniform(peek(this.index) / num, includeLast, result);
    }

    protected buildIndex() {
        const idx: number[] = [0];
        const pts = this.points;
        const n = pts.length;
        for (let i = 0, j = 1; j < n; i = j, j++) {
            idx[j] = idx[i] + dist(pts[i], pts[j]);
        }
        this.index = idx;
    }
}
