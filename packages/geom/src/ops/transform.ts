import { defmulti } from "@thi.ng/defmulti";
import {
    IHiccupShape,
    IShape,
    PCLike,
    PCLikeConstructor,
    Type
} from "@thi.ng/geom-api";
import { ReadonlyMat } from "@thi.ng/matrices";
import {
    Cubic,
    Group,
    Line,
    Points,
    Polygon,
    Polyline,
    Quad,
    Quadratic,
    Triangle
} from "../api";
import { dispatch } from "../internal/dispatch";
import { transformedPoints, transformPoints } from "../internal/transform-points";
import { vertices } from "./vertices";

const tx = (ctor: PCLikeConstructor) =>
    ($: PCLike, mat: ReadonlyMat) =>
        new ctor(transformedPoints($.points, mat), { ...$.attribs });

export const transform = defmulti<IShape, ReadonlyMat, IShape>(dispatch);

transform.addAll({

    [Type.CIRCLE]:
        ($, mat) =>
            new Polygon(
                transformPoints(vertices($), mat),
                { ...$.attribs }
            ),

    [Type.CUBIC]: tx(Cubic),

    [Type.GROUP]:
        ($: Group, mat) =>
            new Group(
                { ...$.attribs },
                $.children.map((x) => <IHiccupShape>transform(x, mat))
            ),

    [Type.LINE]: tx(Line),

    [Type.POINTS]: tx(Points),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.QUADRATIC]: tx(Quadratic),

    [Type.TRIANGLE]: tx(Triangle),

});

transform.isa(Type.ELLIPSE, Type.CIRCLE);
transform.isa(Type.RECT, Type.CIRCLE);
