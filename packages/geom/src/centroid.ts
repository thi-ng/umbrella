import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { AABBLike, IShape, PCLike } from "@thi.ng/geom-api";
import { centerOfWeight2 } from "@thi.ng/geom-poly-utils/center-of-weight";
import { centroid as _centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { divN } from "@thi.ng/vectors/divn";
import { maddN } from "@thi.ng/vectors/maddn";
import { mixN } from "@thi.ng/vectors/mixn";
import { mulN } from "@thi.ng/vectors/muln";
import { set } from "@thi.ng/vectors/set";
import type { Circle } from "./api/circle";
import type { Group } from "./api/group";
import type { Line } from "./api/line";
import type { Plane } from "./api/plane";
import type { Polygon } from "./api/polygon";
import type { Triangle } from "./api/triangle";
import { bounds } from "./bounds";
import { __dispatch } from "./internal/dispatch";

export const centroid: MultiFn1O<IShape, Vec, Vec | undefined> = defmulti<
    any,
    Vec | undefined,
    Vec | undefined
>(
    __dispatch,
    {
        arc: "circle",
        aabb: "rect",
        ellipse: "circle",
        line3: "line",
        points3: "points",
        polyline: "points",
        quad: "poly",
        sphere: "circle",
        text: "circle",
        tri3: "tri",
    },
    {
        circle: ($: Circle, out?) => set(out || [], $.pos),

        group: ($: Group) => {
            const b = bounds($);
            return b ? centroid(b) : undefined;
        },

        line: ({ points }: Line, out?) =>
            mixN(out || [], points[0], points[1], 0.5),

        points: ($: PCLike, out?) => _centroid($.points, out),

        plane: ($: Plane, out?) => mulN(out || [], $.normal, $.w),

        poly: ($: Polygon, out?) => centerOfWeight2($.points, out),

        rect: ($: AABBLike, out?) => maddN(out || [], $.size, 0.5, $.pos),

        tri: ({ points }: Triangle, out?) =>
            divN(
                null,
                add(null, add(out || [], points[0], points[1]), points[2]),
                3
            ),
    }
);
