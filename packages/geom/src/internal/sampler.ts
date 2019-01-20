import { isPlainObject } from "@thi.ng/checks";
import { peek } from "@thi.ng/transducers";
import {
    dist,
    mixN,
    normalize,
    ReadonlyVec,
    sub,
    Vec,
    eqDelta,
    set,
    distSq
} from "@thi.ng/vectors";
import { DEFAULT_SAMPLES, SamplingOpts, VecPair } from "../api";
import { copyPoints } from "./copy-points";
import { closestPointSegment, closestCoeff } from "./closest-point";
import { fit01 } from "@thi.ng/math";

export const resamplePoints =
    (pts: ReadonlyVec[], opts: number | Partial<SamplingOpts>, closed = false, copy = false) => {
        if (opts !== undefined) {
            const sampler = new Sampler(pts, false);
            return isPlainObject(opts) ?
                closed ?
                    opts.dist ?
                        sampler.sampleUniform(opts.dist, opts.last) :
                        sampler.sampleFixedNum(opts.num, opts.last) :
                    opts.dist ?
                        sampler.sampleUniform(opts.dist, opts.last !== false) :
                        sampler.sampleFixedNum(opts.num, opts.last !== false) :
                sampler.sampleFixedNum(opts || DEFAULT_SAMPLES, !closed);
        }
        return copy ?
            copyPoints(pts) :
            pts;
    };

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

    closestT(p: ReadonlyVec) {
        const pts = this.points;
        const idx = this.index;
        const tmp = [];
        const closest = [];
        let minD = Infinity;
        let minI;
        for (let i = 0; i < this.index.length - 1; i++) {
            if (closestPointSegment(p, pts[i], pts[i + 1], tmp)) {
                const d = distSq(p, tmp);
                if (d < minD) {
                    minD = d;
                    minI = i;
                    set(closest, tmp);
                }
            }
        }
        return fit01(
            closestCoeff(p, pts[minI], pts[minI + 1]),
            idx[minI],
            idx[minI + 1]
        ) / peek(idx);
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

    splitAt(t: number) {
        if (t <= 0 || t >= 1) {
            return [this.points];
        }
        const p = this.pointAt(t);
        const i = Math.max(1, this.indexAt(t));
        const head = this.points.slice(0, i);
        const tail = this.points.slice(i);
        if (!eqDelta(head[i - 1], p)) {
            head.push(p);
        }
        if (!eqDelta(tail[0], p)) {
            tail.unshift(p);
        }
        return [head, tail];
    }

    splitNear(p: ReadonlyVec) {
        return this.splitAt(this.closestT(p));
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
            result.push(set([], peek(pts)));
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
