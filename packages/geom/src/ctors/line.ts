import { liangBarsky } from "@thi.ng/geom-clip-convex";
import { Vec, VecPair } from "@thi.ng/vectors";
import { argAttribs } from "../internal/args";
import {
    Attribs,
    Line,
    Rect,
} from "../api";

export function line(a: Vec, b: Vec, attribs?: Attribs): Line;
export function line(pts: Vec[], attribs?: Attribs): Line;
export function line(...args: any[]) {
    const attr = argAttribs(args);
    return new Line(args.length === 1 ? args[0] : args, attr);
}

export const clippedLine =
    (l: Line, bounds: VecPair | Rect) => {
        const res = bounds instanceof Rect ?
            liangBarsky(l.points[0], l.points[1], bounds.pos, bounds.max()) :
            liangBarsky(l.points[0], l.points[1], bounds[0], bounds[1]);
        if (res) {
            return new Line([res[0], res[1]], { ...l.attribs });
        }
    };
