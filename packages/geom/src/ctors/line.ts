import { liangBarsky2 } from "@thi.ng/geom-clip-line";
import { Line } from "../api/line";
import { Rect } from "../api/rect";
import { pclike } from "../internal/pclike";
import type { Attribs } from "@thi.ng/geom-api";
import type { Vec, VecPair } from "@thi.ng/vectors";

export function line(a: Vec, b: Vec, attribs?: Attribs): Line;
export function line(pts: Vec[], attribs?: Attribs): Line;
export function line(...args: any[]) {
    return pclike(Line, args);
}

export const clippedLine = (l: Line, bounds: VecPair | Rect) => {
    const res =
        bounds instanceof Rect
            ? liangBarsky2(l.points[0], l.points[1], bounds.pos, bounds.max())
            : liangBarsky2(l.points[0], l.points[1], bounds[0], bounds[1]);
    if (res) {
        return new Line([res[0], res[1]], { ...l.attribs });
    }
};
