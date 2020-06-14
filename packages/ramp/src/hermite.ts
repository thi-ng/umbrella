import { mix, mixCubicHermite, norm, tangentCardinal } from "@thi.ng/math";
import {
    comp,
    extendSides,
    iterator,
    map,
    mapcat,
    normRange,
    partition,
} from "@thi.ng/transducers";
import { ARamp } from "./aramp";
import type { Vec } from "@thi.ng/vectors";

export const hermite = (stops?: Vec[]) => new HermiteRamp(stops);

export class HermiteRamp extends ARamp {
    at(t: number) {
        const stops = this.stops;
        const n = stops.length - 1;
        const i = this.timeIndex(t);
        if (i < 0) {
            return stops[0][1];
        } else if (i >= n) {
            return stops[n][1];
        } else {
            const a = stops[Math.max(i - 1, 0)];
            const [bx, by] = stops[Math.max(i, 0)];
            const [cx, cy] = stops[Math.min(i + 1, n)];
            const d = stops[Math.min(i + 2, n)];
            const t1 = tangentCardinal(a[1], cy, 0, a[0], cx);
            const t2 = tangentCardinal(by, d[1], 0, bx, d[0]);
            return mixCubicHermite(by, t1, cy, t2, norm(t, bx, cx));
        }
    }

    interpolatedPoints(res = 20) {
        return iterator(
            comp(
                partition(4, 1),
                mapcat(([a, [bx, by], [cx, cy], d]) => {
                    const t1 = tangentCardinal(a[1], cy, 0, a[0], cx);
                    const t2 = tangentCardinal(by, d[1], 0, bx, d[0]);
                    return map(
                        (t) => [
                            mix(bx, cx, t),
                            mixCubicHermite(by, t1, cy, t2, t),
                        ],
                        normRange(res, false)
                    );
                })
            ),
            extendSides(this.stops, 1, 2)
        );
    }
}
