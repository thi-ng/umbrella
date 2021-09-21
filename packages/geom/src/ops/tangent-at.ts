import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cubicTangentAt } from "@thi.ng/geom-splines/cubic-tangent";
import { quadraticTangentAt } from "@thi.ng/geom-splines/quadratic-tangent";
import { cossin } from "@thi.ng/math/angle";
import { HALF_PI, TAU } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { direction } from "@thi.ng/vectors/direction";
import type { Cubic } from "../api/cubic";
import type { Line } from "../api/line";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tangentAt = defmulti<IShape, number, Vec>(dispatch);

tangentAt.addAll(<IObjectOf<Implementation2<unknown, number, Vec>>>{
    circle: (_, t) => cossin(TAU * t + HALF_PI),

    cubic: ({ points }: Cubic, t) =>
        cubicTangentAt([], points[0], points[1], points[2], points[3], t),

    line: ({ points }: Line) => direction([], points[0], points[1]),

    poly: ($: PCLike, t) => new Sampler($.points, true).tangentAt(t),

    polyline: ($: PCLike, t) => new Sampler($.points).tangentAt(t),

    quadratic: ({ points }: Cubic, t) =>
        quadraticTangentAt([], points[0], points[1], points[2], t),

    rect: ($: Rect, t) => new Sampler(vertices($), true).tangentAt(t),
});

tangentAt.isa("quad", "poly");
tangentAt.isa("tri", "poly");
