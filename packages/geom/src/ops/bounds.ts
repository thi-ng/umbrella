import { defmulti } from "@thi.ng/defmulti";
import { HALF_PI, inRange, PI } from "@thi.ng/math";
import {
    comp,
    filter,
    iterator1,
    map,
    push,
    range,
    transduce
} from "@thi.ng/transducers";
import {
    max,
    MAX2,
    min,
    MIN2,
    mul2,
    mulN2,
    set2,
    sub2,
    subN2,
    Vec
} from "@thi.ng/vectors";
import {
    AABBLike,
    Arc,
    Circle,
    Cubic,
    Ellipse,
    Group,
    IShape,
    Line,
    Path,
    PathSegment,
    PCLike,
    Quadratic,
    Rect,
    Type
} from "../api";
import { rectFromMinMax } from "../ctors/rect";
import {
    boundsRaw,
    collBounds,
    cubicBounds2,
    quadraticBounds2
} from "../internal/bounds";
import { dispatch } from "../internal/dispatch";

export const bounds = defmulti<IShape, AABBLike>(dispatch);

bounds.addAll({

    [Type.ARC]:
        (arc: Arc) => {
            const pts = transduce(
                map<number, Vec>(arc.pointAtTheta.bind(arc)),
                push(),
                [
                    arc.start,
                    arc.end,
                    // multiples of HALF_PI in arc range
                    ...filter(
                        (t: number) => inRange(t, arc.start, arc.end),
                        range(-3 * PI, 3.01 * PI, HALF_PI)
                    )
                ]
            );
            return rectFromMinMax(...boundsRaw(pts, set2([], MAX2), set2([], MIN2)));
        },

    [Type.CIRCLE]:
        ($: Circle) =>
            new Rect(
                subN2([], $.pos, $.r),
                mulN2(null, [2, 2], $.r)
            ),

    [Type.CUBIC]:
        ({ points }: Cubic) =>
            rectFromMinMax(
                ...cubicBounds2(points[0], points[1], points[2], points[3])
            ),

    [Type.ELLIPSE]:
        ($: Ellipse) =>
            new Rect(
                sub2([], $.pos, $.r),
                mul2(null, [2, 2], $.r)
            ),

    [Type.GROUP]:
        ($: Group) =>
            new Rect(...collBounds($.children, bounds)),

    [Type.LINE]:
        ({ points: [a, b] }: Line) =>
            rectFromMinMax(min([], a, b), max([], a, b)),

    [Type.PATH]:
        (path: Path) =>
            new Rect(
                ...collBounds(
                    [...iterator1(
                        comp(
                            map((s: PathSegment) => s.geo),
                            filter((s) => !!s),
                        ),
                        path.segments)
                    ],
                    bounds
                )
            ),

    [Type.POINTS]:
        ($: PCLike) =>
            rectFromMinMax(...boundsRaw($.points, set2([], MAX2), set2([], MIN2))),

    [Type.QUADRATIC]:
        ({ points }: Quadratic) =>
            rectFromMinMax(
                ...quadraticBounds2(points[0], points[1], points[2])
            ),

    [Type.RECT]:
        ($: IShape) => <AABBLike>$.copy(),

});

bounds.isa(Type.AABB, Type.RECT);
bounds.isa(Type.POLYGON, Type.POINTS);
bounds.isa(Type.POLYLINE, Type.POINTS);
bounds.isa(Type.QUAD, Type.POINTS);
bounds.isa(Type.TRIANGLE, Type.POINTS);
