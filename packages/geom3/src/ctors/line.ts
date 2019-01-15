import { Vec } from "@thi.ng/vectors3";
import { Attribs, Line } from "../api";
import { argAttribs } from "../internal/args";

export function line(a: Vec, b: Vec, attribs?: Attribs): Line;
export function line(pts: Vec[], attribs?: Attribs): Line;
export function line(...args: any[]) {
    const attr = argAttribs(args);
    return new Line(args.length === 1 ? args[0] : args, attr);
}
