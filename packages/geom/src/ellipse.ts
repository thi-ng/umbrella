import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";
import { Ellipse } from "./api/ellipse";
import { __argsVV } from "./internal/args";

export function ellipse(pos: Vec, r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(attribs?: Attribs): Ellipse;
export function ellipse(...args: any[]) {
    return new Ellipse(...__argsVV(args));
}
