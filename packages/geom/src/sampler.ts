import { peek } from "@thi.ng/transducers/func/peek";
import { IVector } from "@thi.ng/vectors/api";

export class Sampler<T extends IVector<T>> {

    points: T[];
    index: number[];

    constructor(points: ReadonlyArray<T>, closed = false) {
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
                return pts[i - 1].mixNewN(pts[i], (t0 - idx[i - 1]) / (idx[i] - idx[i - 1]));
            }
        }
    }

    sampleUniform(dist: number, includeLast = false, result: T[] = []) {
        const index = this.index;
        const total = peek(index);
        const delta = dist / total;
        const n = index.length;
        for (let t = 0, i = 1; t < 1; t += delta) {
            const ct = t * total;
            while (ct >= index[i] && i < n) { i++; }
            if (i >= n) break;
            const p = index[i - 1];
            result.push(this.points[i - 1].mixNewN(this.points[i], (ct - p) / (index[i] - p)));
        }
        if (includeLast) {
            result.push(this.points[this.points.length - 1].copy());
        }
        return result;
    }

    sampleFixedNum(num: number, includeLast = false, result?: T[]) {
        return this.sampleUniform(peek(this.index) / num, includeLast, result);
    }

    protected buildIndex() {
        const idx: number[] = [0];
        const pts = this.points;
        const n = pts.length;
        for (let i = 0, j = 1; j < n; i = j, j++) {
            idx[j] = idx[i] + pts[i].dist(pts[j]);
        }
        this.index = idx;
    }
}
