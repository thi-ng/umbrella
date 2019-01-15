import { defmulti } from "@thi.ng/defmulti";
import {
    IShape,
    Polygon,
    Polyline,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { douglasPeucker2 } from "../internal/douglas–peucker";

export const simplify = defmulti<IShape, number, IShape>(dispatch);

simplify.addAll({

    [Type.POLYGON]:
        (poly: Polygon, eps = 0.1) =>
            new Polygon(
                douglasPeucker2(poly.points, eps, true),
                { ...poly.attribs }
            ),

    [Type.POLYLINE]:
        (poly: Polyline, eps = 0.1) =>
            new Polyline(
                douglasPeucker2(poly.points, eps),
                { ...poly.attribs }
            ),

});
