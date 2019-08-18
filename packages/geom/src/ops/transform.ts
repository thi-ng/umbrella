import { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import {
    IHiccupShape,
    IShape,
    PathSegment,
    PCLike,
    PCLikeConstructor,
    SegmentType,
    Type
} from "@thi.ng/geom-api";
import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { map } from "@thi.ng/transducers";
import { Cubic } from "../api/cubic";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Points } from "../api/points";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { Quad } from "../api/quad";
import { Quadratic } from "../api/quadratic";
import { Rect } from "../api/rect";
import { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";
import { transformedPoints } from "../internal/transform-points";
import { asPath } from "./as-path";
import { asPolygon } from "./as-polygon";

const tx = (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
    new ctor(transformedPoints($.points, mat), { ...$.attribs });

/**
 * Transforms given shape with provided matrix. Some shape types will be
 * automatically converted to other types prior to transformation because they
 * cannot be reliably represented in their original type anymore, this
 * includes:
 *
 * - Arc => Path (cubics)
 * - Circle => Path (cubics)
 * - Ellipse => Path (cubics)
 * - Rect => Polygon
 */
export const transform = defmulti<IShape, ReadonlyMat, IShape>(dispatch);

transform.addAll(<IObjectOf<Implementation2<unknown, ReadonlyMat, IShape>>>{
    [Type.ARC]: ($: IShape, mat) => transform(asPath($), mat),

    [Type.CUBIC]: tx(Cubic),

    [Type.GROUP]: ($: Group, mat) =>
        new Group(
            { ...$.attribs },
            $.children.map((x) => <IHiccupShape>transform(x, mat))
        ),

    [Type.LINE]: tx(Line),

    [Type.PATH]: ($: Path, mat) =>
        new Path(
            [
                ...map(
                    (s) =>
                        s.type === SegmentType.MOVE
                            ? <PathSegment>{
                                  type: s.type,
                                  point: mulV([], mat, s.point!)
                              }
                            : <PathSegment>{
                                  type: s.type,
                                  geo: transform(s.geo!, mat)
                              },
                    $.segments
                )
            ],
            $.attribs
        ),

    [Type.POINTS]: tx(Points),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.QUADRATIC]: tx(Quadratic),

    [Type.RECT]: ($: Rect, mat) => transform(asPolygon($), mat),

    [Type.TRIANGLE]: tx(Triangle)
});

transform.isa(Type.CIRCLE, Type.ARC);
transform.isa(Type.ELLIPSE, Type.CIRCLE);
