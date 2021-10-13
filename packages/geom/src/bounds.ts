import type { MultiFn1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { AABBLike, IShape, PathSegment, PCLike } from "@thi.ng/geom-api";
import { bounds as arcBounds } from "@thi.ng/geom-arc/bounds";
import { bounds as _bounds } from "@thi.ng/geom-poly-utils/bounds";
import { cubicBounds } from "@thi.ng/geom-splines/cubic-bounds";
import { quadraticBounds } from "@thi.ng/geom-splines/quadratic-bounds";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { MAX2, MAX3, MIN2, MIN3 } from "@thi.ng/vectors/api";
import { max } from "@thi.ng/vectors/max";
import { min } from "@thi.ng/vectors/min";
import { mul2 } from "@thi.ng/vectors/mul";
import { mulN2 } from "@thi.ng/vectors/muln";
import { set2, set3 } from "@thi.ng/vectors/set";
import { sub2 } from "@thi.ng/vectors/sub";
import { subN2 } from "@thi.ng/vectors/subn";
import { aabbFromMinMax } from "./aabb.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Cubic } from "./api/cubic.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Path } from "./api/path.js";
import type { Quadratic } from "./api/quadratic.js";
import { Rect } from "./api/rect.js";
import type { Text } from "./api/text.js";
import { __collBounds } from "./internal/bounds.js";
import { __dispatch } from "./internal/dispatch.js";
import { rectFromMinMax } from "./rect.js";

export const bounds: MultiFn1<IShape, AABBLike | undefined> = defmulti<
    any,
    AABBLike | undefined
>(
    __dispatch,
    {
        aabb: "rect",
        poly: "points",
        polyline: "points",
        quad: "points",
        tri: "points",
    },
    {
        arc: ($: Arc) =>
            rectFromMinMax(...arcBounds($.pos, $.r, $.axis, $.start, $.end)),

        circle: ($: Circle) =>
            new Rect(subN2([], $.pos, $.r), mulN2(null, [2, 2], $.r)),

        cubic: ({ points }: Cubic) =>
            rectFromMinMax(
                ...cubicBounds(points[0], points[1], points[2], points[3])
            ),

        ellipse: ($: Ellipse) =>
            new Rect(sub2([], $.pos, $.r), mul2(null, [2, 2], $.r)),

        group: ($: Group) => {
            const res = __collBounds($.children, bounds);
            return res ? new Rect(...res) : undefined;
        },

        line: ({ points: [a, b] }: Line) =>
            rectFromMinMax(min([], a, b), max([], a, b)),

        path: (path: Path) => {
            const b = __collBounds(
                [
                    ...iterator1(
                        comp(
                            map((s: PathSegment) => s.geo!),
                            filter((s) => !!s)
                        ),
                        path.segments
                    ),
                ],
                bounds
            );
            return b ? new Rect(...b) : undefined;
        },

        points: ($: PCLike) =>
            rectFromMinMax(
                ..._bounds($.points, set2([], MAX2), set2([], MIN2))
            ),

        points3: ($: PCLike) =>
            aabbFromMinMax(
                ..._bounds($.points, set3([], MAX3), set3([], MIN3))
            ),

        quadratic: ({ points }: Quadratic) =>
            rectFromMinMax(...quadraticBounds(points[0], points[1], points[2])),

        rect: ($: IShape) => <AABBLike>$.copy(),

        text: ($: Text) => new Rect(set2([], $.pos), [0, 0]),
    }
);
