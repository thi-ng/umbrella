import { Attribs } from "@thi.ng/geom-api";
import { equilateralTriangle2 } from "@thi.ng/geom-poly-utils";
import { Vec } from "@thi.ng/vectors";
import { Triangle } from "../api/triangle";
import { argAttribs } from "../internal/args";

export function triangle(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Triangle;
export function triangle(pts: Vec[], attribs?: Attribs): Triangle;
export function triangle(...args: any[]) {
    const attr = argAttribs(args);
    return new Triangle(args.length === 1 ? args[0] : args, attr);
}

export const equilateralTriangle = (a: Vec, b: Vec, attribs?: Attribs) =>
    new Triangle(equilateralTriangle2(a, b), attribs);
