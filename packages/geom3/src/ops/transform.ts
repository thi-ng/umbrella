import { defmulti } from "@thi.ng/defmulti";
import { ReadonlyMat } from "@thi.ng/matrices";
import {
    Group,
    IHiccupShape,
    IShape,
    Line,
    PCLike,
    PCLikeConstructor,
    Points,
    Polygon,
    Polyline,
    Quad,
    Triangle,
    Type
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

    [Type.GROUP]:
        ($: Group, mat) =>
            new Group(
                $.children.map((x) => <IHiccupShape>transform(x, mat)),
                { ...$.attribs }
            ),

    [Type.LINE]: tx(Line),

    [Type.POINTS]: tx(Points),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.TRIANGLE]: tx(Triangle),

});

transform.isa(Type.ELLIPSE, Type.CIRCLE);
transform.isa(Type.RECT, Type.CIRCLE);
