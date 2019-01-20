import { Vec } from "@thi.ng/vectors";
import { Attribs, Ellipse } from "../api";
import { argsVV } from "../internal/args";

export function ellipse(pos: Vec, r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(r: number | Vec, attribs?: Attribs): Ellipse;
export function ellipse(attribs?: Attribs): Ellipse;
export function ellipse(...args: any[]) {
    return new Ellipse(...argsVV(args));
}
