import { mixN, Vec } from "@thi.ng/vectors3";
import { Attribs, Cubic } from "../api";
import { argAttribs } from "../internal/args";

export function cubic(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Cubic;
export function cubic(pts: Vec[], attribs?: Attribs): Cubic;
export function cubic(...args: any[]) {
    const attr = argAttribs(args);
    return new Cubic(args.length === 1 ? args[0] : args, attr);
}

export const cubicFromLine =
    (a: Vec, b: Vec, attribs?: Attribs) =>
        new Cubic([a, mixN([], a, b, 1 / 3), mixN([], b, a, 1 / 3), b], attribs);
