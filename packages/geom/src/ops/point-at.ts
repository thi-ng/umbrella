import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { cossin, fit01, TAU } from "@thi.ng/math";
import {
    cartesian2,
    madd2,
    mixCubic,
    mixN2,
    mixQuadratic,
    pointOnRay2,
    pointOnRay3,
    Vec,
} from "@thi.ng/vectors";
import type { Arc } from "../api/arc";
import type { Circle } from "../api/circle";
import type { Cubic } from "../api/cubic";
import type { Ellipse } from "../api/ellipse";
import type { Line } from "../api/line";
import type { Polygon } from "../api/polygon";
import type { Quadratic } from "../api/quadratic";
import type { Ray } from "../api/ray";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const pointAt = defmulti<IShape, number, Vec>(dispatch);

pointAt.addAll(<IObjectOf<Implementation2<unknown, number, Vec>>>{
    arc: ($: Arc, t: number) => $.pointAtTheta(fit01(t, $.start, $.end)),

    circle: ($: Circle, t) => cartesian2(null, [$.r, TAU * t], $.pos),

    cubic: ({ points }: Cubic, t) =>
        mixCubic([], points[0], points[1], points[2], points[3], t),

    ellipse: ($: Ellipse, t) => madd2([], cossin(TAU * t), $.r, $.pos),

    line: ({ points }: Line, t) => mixN2([], points[0], points[1], t),

    poly: ($: Polygon, t) => new Sampler($.points, true).pointAt(t),

    polyline: ($: Polygon, t) => new Sampler($.points).pointAt(t),

    quadratic: ({ points }: Quadratic, t) =>
        mixQuadratic([], points[0], points[1], points[2], t),

    ray: ($: Ray, t) => pointOnRay2([], $.pos, $.dir, t),

    ray3: ($: Ray, t) => pointOnRay3([], $.pos, $.dir, t),

    rect: ($: Rect, t) => new Sampler(vertices($), true).pointAt(t),
});

pointAt.isa("quad", "poly");
pointAt.isa("tri", "poly");
