import { Ellipse } from "../api/ellipse";
import { argsVV } from "../internal/args";
import type { Attribs } from "@thi.ng/geom-api";
import type { Vec } from "@thi.ng/vectors";

export function ellipse(pos: Vec, r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(attribs?: Attribs): Ellipse;
export function ellipse(...args: any[]) {
    return new Ellipse(...argsVV(args));
}
