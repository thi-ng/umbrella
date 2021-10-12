import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
    classifyPointInCircle,
    classifyPointInTriangle2,
} from "@thi.ng/geom-isec/point";
import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dot } from "@thi.ng/vectors/dot";
import type { Circle } from "./api/circle";
import type { Plane } from "./api/plane";
import type { Triangle } from "./api/triangle";
import { __dispatch } from "./internal/dispatch";

export const classifyPoint: MultiFn2O<IShape, ReadonlyVec, number, number> =
    defmulti<any, ReadonlyVec, number | undefined, number>(
        __dispatch,
        { sphere: "circle" },
        {
            circle: ($: Circle, p, eps = EPS) =>
                classifyPointInCircle(p, $.pos, $.r, eps),

            plane: ($: Plane, p, eps) => sign(dot($.normal, p) - $.w, eps),

            tri: ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
                classifyPointInTriangle2(
                    p,
                    points[0],
                    points[1],
                    points[2],
                    eps
                ),
        }
    );
