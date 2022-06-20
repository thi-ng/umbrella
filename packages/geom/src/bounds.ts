import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { AABBLike, IShape, PathSegment, PCLike } from "@thi.ng/geom-api";
import { bounds as arcBounds } from "@thi.ng/geom-arc/bounds";
import { bounds2, bounds3 } from "@thi.ng/geom-poly-utils/bounds";
import { cubicBounds } from "@thi.ng/geom-splines/cubic-bounds";
import { quadraticBounds } from "@thi.ng/geom-splines/quadratic-bounds";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { addN2 } from "@thi.ng/vectors/addn";
import { max } from "@thi.ng/vectors/max";
import { min } from "@thi.ng/vectors/min";
import { mul2 } from "@thi.ng/vectors/mul";
import { mulN2 } from "@thi.ng/vectors/muln";
import { sub2 } from "@thi.ng/vectors/sub";
import { subN2 } from "@thi.ng/vectors/subn";
import { aabbFromMinMaxWithMargin } from "./aabb.js";
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
import { rectFromMinMaxWithMargin } from "./rect.js";

export const bounds: MultiFn1O<IShape, number, AABBLike | undefined> = defmulti<
    any,
    number | undefined,
    AABBLike | undefined
>(
    __dispatch,
    {
        aabb: "rect",
        bpatch: "points",
        poly: "points",
        polyline: "points",
        quad: "points",
        tri: "points",
    },
    {
        arc: ($: Arc, margin = 0) =>
            rectFromMinMaxWithMargin(
                ...arcBounds($.pos, $.r, $.axis, $.start, $.end),
                margin
            ),

        circle: ($: Circle, margin = 0) =>
            new Rect(
                subN2([], $.pos, $.r + margin),
                mulN2(null, [2, 2], $.r + margin)
            ),

        cubic: ({ points }: Cubic, margin = 0) =>
            rectFromMinMaxWithMargin(
                ...cubicBounds(points[0], points[1], points[2], points[3]),
                margin
            ),

        ellipse: ($: Ellipse, margin = 0) => {
            const r = addN2([], $.r, margin);
            return new Rect(sub2([], $.pos, r), mul2(null, [2, 2], r));
        },

        group: ($: Group, margin = 0) => {
            const res = __collBounds($.children, bounds);
            return res ? new Rect(...res).offset(margin) : undefined;
        },

        line: ({ points: [a, b] }: Line, margin = 0) =>
            rectFromMinMaxWithMargin(min([], a, b), max([], a, b), margin),

        path: (path: Path, margin = 0) => {
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
            return b ? new Rect(...b).offset(margin) : undefined;
        },

        points: ($: PCLike, margin = 0) =>
            rectFromMinMaxWithMargin(...bounds2($.points), margin),

        points3: ($: PCLike, margin = 0) =>
            aabbFromMinMaxWithMargin(...bounds3($.points), margin),

        quadratic: ({ points }: Quadratic, margin = 0) =>
            rectFromMinMaxWithMargin(
                ...quadraticBounds(points[0], points[1], points[2]),
                margin
            ),

        rect: ($: IShape, margin = 0) =>
            margin === 0
                ? <AABBLike>$.copy()
                : (<AABBLike>$.copy()).offset(margin),

        text: ($: Text, margin = 0) =>
            new Rect(subN2([], $.pos, margin), [0, 0]), // TODO
    }
);
