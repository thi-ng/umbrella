import type { IShape } from "@thi.ng/geom-api";
import { SYSTEM } from "@thi.ng/random/system";
import type { Vec } from "@thi.ng/vectors";
import { randMinMax } from "@thi.ng/vectors/random";
import { bounds } from "./bounds.js";
import { pointInside } from "./point-inside.js";

export const scatter = (
    shape: IShape,
    num: number,
    rnd = SYSTEM,
    out: Vec[] = []
) => {
    const b = bounds(shape);
    if (!b) return;
    const mi = b.pos;
    const mx = b.max();
    for (; num-- > 0; ) {
        while (true) {
            const p = randMinMax([], mi, mx, rnd);
            if (pointInside(shape, p)) {
                out.push(p);
                break;
            }
        }
    }
    return out;
};
