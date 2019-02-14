import { Attribs } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";
import { Quad } from "../api";
import { argAttribs } from "../internal/args";

export function quad(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Quad;
export function quad(pts: Vec[], attribs?: Attribs): Quad;
export function quad(...args: any[]) {
    const attr = argAttribs(args);
    return new Quad(args.length === 1 ? args[0] : args, attr);
}
