import { THIRD_PI } from "@thi.ng/math";
import {
    maddN2,
    mag,
    normalize,
    perpendicularLeft2,
    sub2,
    Vec
} from "@thi.ng/vectors3";
import { Attribs, Triangle } from "../api";
import { argAttribs } from "../internal/args";

export function triangle(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Triangle;
export function triangle(pts: Vec[], attribs?: Attribs): Triangle;
export function triangle(...args: any[]) {
    const attr = argAttribs(args);
    return new Triangle(args.length === 1 ? args[0] : args, attr);
}

export const equilateralTriangle =
    (a: Vec, b: Vec, attribs?: Attribs) => {
        const dir = sub2([], b, a);
        const c = normalize(null, perpendicularLeft2([], dir), mag(dir) * Math.sin(THIRD_PI));
        return new Triangle([a, b, maddN2(null, c, dir, 0.5)], attribs);
    };
