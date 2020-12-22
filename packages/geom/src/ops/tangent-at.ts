import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { cossin, HALF_PI, TAU } from "@thi.ng/math";
import { direction, Vec } from "@thi.ng/vectors";
import type { Line } from "../api/line";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const tangentAt = defmulti<IShape, number, Vec>(dispatch);

tangentAt.addAll(<IObjectOf<Implementation2<unknown, number, Vec>>>{
    circle: (_, t) => cossin(TAU * t + HALF_PI),

    line: ({ points }: Line) => direction([], points[0], points[1]),

    poly: ($: PCLike, t) => new Sampler($.points, true).tangentAt(t),

    polyline: ($: PCLike, t) => new Sampler($.points).tangentAt(t),

    rect: ($: Rect, t) => new Sampler(vertices($), true).tangentAt(t),
});

tangentAt.isa("quad", "poly");
tangentAt.isa("tri", "poly");
