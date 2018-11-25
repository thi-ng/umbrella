import { MultiVecOpVO, ReadonlyVec, ZERO4 } from "./api";
import { vop } from "./vop";

const cos = Math.cos;
const sin = Math.sin;

export const cartesian: MultiVecOpVO<ReadonlyVec> = vop(1);

export const cartesian2 =
    cartesian.add(2,
        (out, a, b = ZERO4) => {
            const r = a[0];
            const t = a[1];
            out[0] = r * cos(t) + b[0];
            out[1] = r * sin(t) + b[1];
            return out;
        });

export const cartesian3 =
    cartesian.add(3,
        (out, a, b = ZERO4) => {
            const r = a[0];
            const theta = a[1];
            const phi = a[2];
            const ct = cos(theta);

            out[0] = r * ct * cos(phi) + b[0];
            out[1] = r * ct * sin(phi) + b[1];
            out[2] = r * sin(theta) + b[2];
            return out;
        });
