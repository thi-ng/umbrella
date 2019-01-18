import { eqDeltaFixed } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors3";

export const intersectRayLine =
    (rpos: ReadonlyVec, dir: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec) => {
        const bax = b[0] - a[0];
        const bay = b[1] - a[1];
        const d = dir[0] * bay - dir[1] * bax;
        if (eqDeltaFixed(d, 0)) return;
        const arx = a[0] - rpos[0];
        const ary = a[1] - rpos[1];
        const t = (bay * arx - bax * ary) / d;
        const s = (dir[1] * arx - dir[0] * ary) / d;
        return t >= 0 && s >= 0 && s <= 1 ?
            t :
            undefined;
    };
