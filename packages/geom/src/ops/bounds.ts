import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1 } from "@thi.ng/defmulti";
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
import type { Arc } from "../api/arc";
import type { Circle } from "../api/circle";
import type { Cubic } from "../api/cubic";
import type { Ellipse } from "../api/ellipse";
import type { Group } from "../api/group";
import type { Line } from "../api/line";
import type { Path } from "../api/path";
import type { Quadratic } from "../api/quadratic";
import { Rect } from "../api/rect";
import type { Text } from "../api/text";
import { aabbFromMinMax } from "../ctors/aabb";
import { rectFromMinMax } from "../ctors/rect";
import { collBounds } from "../internal/coll-bounds";
import { dispatch } from "../internal/dispatch";

export const bounds = defmulti<IShape, AABBLike | undefined>(dispatch);

bounds.addAll(<IObjectOf<Implementation1<unknown, AABBLike>>>{
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
        const res = collBounds($.children, bounds);
        return res ? new Rect(...res) : undefined;
    },

    line: ({ points: [a, b] }: Line) =>
        rectFromMinMax(min([], a, b), max([], a, b)),

    path: (path: Path) => {
        const b = collBounds(
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
        rectFromMinMax(..._bounds($.points, set2([], MAX2), set2([], MIN2))),

    points3: ($: PCLike) =>
        aabbFromMinMax(..._bounds($.points, set3([], MAX3), set3([], MIN3))),

    quadratic: ({ points }: Quadratic) =>
        rectFromMinMax(...quadraticBounds(points[0], points[1], points[2])),

    rect: ($: IShape) => <AABBLike>$.copy(),

    text: ($: Text) => new Rect(set2([], $.pos), [0, 0]),
});

bounds.isa("aabb", "rect");
bounds.isa("poly", "points");
bounds.isa("polyline", "points");
bounds.isa("quad", "points");
bounds.isa("tri", "points");
