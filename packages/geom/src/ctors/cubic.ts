import { cubicFromArc as _arc, cubicFromLine as _line, cubicFromQuadratic as _quad } from "@thi.ng/geom-splines";
import { Vec } from "@thi.ng/vectors";
import { Arc, Attribs, Cubic } from "../api";
import { argAttribs } from "../internal/args";

export function cubic(a: Vec, b: Vec, c: Vec, d: Vec, attribs?: Attribs): Cubic;
export function cubic(pts: Vec[], attribs?: Attribs): Cubic;
export function cubic(...args: any[]) {
    const attr = argAttribs(args);
    return new Cubic(args.length === 1 ? args[0] : args, attr);
}

export const cubicFromArc =
    (arc: Arc) =>
        _arc(arc.pos, arc.r, arc.axis, arc.start, arc.end)
            .map((c) => new Cubic(c, { ...arc.attribs }));

export const cubicFromLine =
    (a: Vec, b: Vec, attribs?: Attribs) =>
        new Cubic(_line(a, b), attribs);

export const cubicFromQuadratic =
    (a: Vec, b: Vec, c: Vec, attribs?: Attribs) =>
        new Cubic(_quad(a, b, c), attribs);
