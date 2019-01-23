import { quadraticFromLine as _line } from "@thi.ng/geom-splines";
import { Vec } from "@thi.ng/vectors";
import { Attribs, Quadratic } from "../api";
import { argAttribs } from "../internal/args";

export function quadratic(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Quadratic;
export function quadratic(pts: Vec[], attribs?: Attribs): Quadratic;
export function quadratic(...args: any[]) {
    const attr = argAttribs(args);
    return new Quadratic(args.length === 1 ? args[0] : args, attr);
}

export const quadraticFromLine =
    (a: Vec, b: Vec, attribs?: Attribs) =>
        new Quadratic(_line(a, b), attribs)
