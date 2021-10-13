import { binarySearch } from "@thi.ng/arrays/binary-search";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import { absDiff } from "@thi.ng/math/abs";
import { clamp } from "@thi.ng/math/interval";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { comparator2 } from "@thi.ng/vectors/compare";
import type { IRamp, RampBounds } from "./api.js";

export abstract class ARamp implements IRamp {
    stops: Vec[];

    constructor(
        stops: Vec[] = [
            [0, 0],
            [1, 1],
        ]
    ) {
        this.stops = stops;
    }

    abstract at(t: number): number;

    abstract interpolatedPoints(): Iterable<ReadonlyVec>;

    bounds(): RampBounds {
        const stops = this.stops;
        const n = stops.length;
        if (!n) return { min: 0, max: 0, minT: 0, maxT: 0 };
        let min = Infinity;
        let max = -Infinity;
        for (let i = n; --i >= 0; ) {
            const y = stops[i][1];
            min = Math.min(min, y);
            max = Math.max(max, y);
        }
        return { min, max, minT: stops[0][0], maxT: stops[n - 1][0] };
    }

    addStopAt(t: number, y: number, eps = 0.01) {
        if (this.closestIndex(t, eps) !== -1) {
            this.stops.push([t, y]);
            this.sort();
            return true;
        }
        return false;
    }

    removeStopAt(t: number, eps = 0.01) {
        if (this.stops.length > 2) {
            const i = this.closestIndex(t, eps);
            if (i !== -1) {
                this.stops.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    closestIndex(t: number, eps = 0.01) {
        const stops = this.stops;
        for (let i = stops.length; --i >= 0; ) {
            if (absDiff(t, stops[i][0]) < eps) return i;
        }
        return -1;
    }

    clampedIndexTime(i: number, t: number, eps = 0.01) {
        const stops = this.stops;
        const n = stops.length - 1;
        return i == 0
            ? Math.min(t, stops[1][0] - eps)
            : i === n
            ? Math.max(t, stops[n - 1][0] + eps)
            : clamp(t, stops[i - 1][0] + eps, stops[i + 1][0] - eps);
    }

    sort() {
        this.stops.sort(comparator2(0, 1));
    }

    uniform() {
        const n = this.stops.length - 1;
        this.stops.forEach((p, i) => (p[0] = i / n));
    }

    protected timeIndex(t: number) {
        const stops = this.stops;
        const n = stops.length;
        if (n < 256) {
            for (let i = n; --i >= 0; ) {
                if (t >= stops[i][0]) return i;
            }
            return -1;
        }
        return binarySearch(stops, [t], (x) => x[0], compareNumAsc);
    }
}
