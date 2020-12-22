import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
    classifyPointInCircle,
    classifyPointInTriangle2,
} from "@thi.ng/geom-isec";
import { EPS, sign } from "@thi.ng/math";
import { dot, ReadonlyVec } from "@thi.ng/vectors";
import type { Circle } from "../api/circle";
import type { Plane } from "../api/plane";
import type { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";

export const classifyPoint: MultiFn2O<
    IShape,
    ReadonlyVec,
    number,
    number
> = defmulti(<any>dispatch);

classifyPoint.addAll(<
    IObjectOf<Implementation2O<unknown, ReadonlyVec, number, number>>
>{
    circle: ($: Circle, p, eps = EPS) =>
        classifyPointInCircle(p, $.pos, $.r, eps),

    plane: ($: Plane, p, eps) => sign(dot($.normal, p) - $.w, eps),

    tri: ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
        classifyPointInTriangle2(p, points[0], points[1], points[2], eps),
});

classifyPoint.isa("sphere", "circle");
