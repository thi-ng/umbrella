import { peek } from "@thi.ng/transducers/func/peek";
import {
    copy,
    dist,
    mixNewN,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors2/api";

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
                return mixNewN(pts[i - 1], pts[i], (t0 - idx[i - 1]) / (idx[i] - idx[i - 1]));
            }
        }
    }

    sampleUniform(dist: number, includeLast = false, result: Vec[] = []) {
        const index = this.index;
        const total = peek(index);
        const delta = dist / total;
        const n = index.length;
        for (let t = 0, i = 1; t < 1; t += delta) {
            const ct = t * total;
            while (ct >= index[i] && i < n) { i++; }
            if (i >= n) break;
            const p = index[i - 1];
            result.push(mixNewN(this.points[i - 1], this.points[i], (ct - p) / (index[i] - p)));
        }
        if (includeLast) {
            result.push(copy(this.points[this.points.length - 1]));
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
