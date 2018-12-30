import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { setC } from "@thi.ng/vectors3/setc";
import { Mat } from "./api";
import { mat33to44 } from "./m33-m44";

export const rotationAroundAxis33 =
    (out: Mat, [x, y, z]: ReadonlyVec, theta: number) => {
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        const t = 1 - c;
        return setC(
            out || [],
            x * x * t + c,
            y * x * t + z * s,
            z * x * t - y * s,
            x * y * t - z * s,
            y * y * t + c,
            z * y * t + x * s,
            x * z * t + y * s,
            y * z * t - x * s,
            z * z * t + c
        );
    };

export const rotationAroundAxis44 =
    (out: Mat, axis: ReadonlyVec, theta: number) =>
        mat33to44(out, rotationAroundAxis33([], axis, theta));
