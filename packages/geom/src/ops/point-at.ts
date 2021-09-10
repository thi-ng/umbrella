import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { cossin } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import type { Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { madd2 } from "@thi.ng/vectors/madd";
import { mixCubic } from "@thi.ng/vectors/mix-cubic";
import { mixQuadratic } from "@thi.ng/vectors/mix-quadratic";
import { mixN2 } from "@thi.ng/vectors/mixn";
import { pointOnRay2, pointOnRay3 } from "@thi.ng/vectors/point-on-ray";
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
