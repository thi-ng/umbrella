import { IShape } from "@thi.ng/geom-api";
import { SYSTEM } from "@thi.ng/random";
import { randMinMax, Vec } from "@thi.ng/vectors";
import { bounds } from "./bounds";
import { pointInside } from "./point-inside";

export const scatter =
    (shape: IShape, num: number, rnd = SYSTEM, out: Vec[] = []) => {
        const b = bounds(shape);
        const mi = b.pos;
        const mx = b.max();
        for (; --num >= 0;) {
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
