import { fit } from "@thi.ng/math/fit";
import type { Vec } from "@thi.ng/vectors";
import { ARamp } from "./aramp.js";

export const linear = (stops?: Vec[]) => new LinearRamp(stops);

export class LinearRamp extends ARamp {
    at(t: number) {
        const stops = this.stops;
        const n = stops.length - 1;
        const i = this.timeIndex(t);
        if (i < 0) {
            return stops[0][1];
        } else if (i >= n) {
            return stops[n][1];
        } else {
            const a = stops[i];
            const b = stops[i + 1];
            return fit(t, a[0], b[0], a[1], b[1]);
        }
    }

    interpolatedPoints() {
        return this.stops;
    }
}
