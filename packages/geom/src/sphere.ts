import type { Attribs } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dist } from "@thi.ng/vectors/dist";
import { mixN3 } from "@thi.ng/vectors/mixn";
import { Sphere } from "./api/sphere";
import { argsVN } from "./internal/args";

export function sphere(pos: Vec, r: number, attribs?: Attribs): Sphere;
export function sphere(pos: Vec, attribs?: Attribs): Sphere;
export function sphere(r: number, attribs?: Attribs): Sphere;
export function sphere(attribs?: Attribs): Sphere;
export function sphere(...args: any[]) {
    return new Sphere(...argsVN(args));
}

export const sphereFrom2Points = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    attribs?: Attribs
) => new Sphere(mixN3([], a, b, 0.5), dist(a, b) / 2, attribs);
