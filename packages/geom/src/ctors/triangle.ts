import { equilateralTriangle2 } from "@thi.ng/geom-poly-utils";
import { Triangle } from "../api/triangle";
import { pclike } from "../internal/pclike";
import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export function triangle(a: Vec, b: Vec, c: Vec, attribs?: Attribs): Triangle;
export function triangle(pts: Vec[], attribs?: Attribs): Triangle;
export function triangle(...args: any[]) {
    return pclike(Triangle, args);
}

export const equilateralTriangle = (a: Vec, b: Vec, attribs?: Attribs) =>
    new Triangle(equilateralTriangle2(a, b), attribs);
