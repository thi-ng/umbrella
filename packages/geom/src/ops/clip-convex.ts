import { defmulti } from "@thi.ng/defmulti";
import { IShape, Polygon, Type } from "../api";
import { dispatch } from "../internal/dispatch";
import { sutherlandHodgeman } from "../internal/sutherland-hodgeman";
import { vertices } from "./vertices";
import { centroid } from "./centroid";

export const clipConvex = defmulti<IShape, IShape, Polygon>(dispatch);

clipConvex.addAll({

    [Type.POLYGON]:
        ($: Polygon, boundary: IShape) =>
            new Polygon(
                sutherlandHodgeman($.points, vertices(boundary), centroid(boundary)),
                { ...$.attribs }
            ),

    [Type.RECT]:
        ($, boundary: IShape) =>
            new Polygon(
                sutherlandHodgeman(vertices($), vertices(boundary), centroid(boundary)),
                { ...$.attribs }
            )
});

clipConvex.isa(Type.CIRCLE, Type.RECT);
clipConvex.isa(Type.ELLIPSE, Type.RECT);
clipConvex.isa(Type.PATH, Type.RECT);
clipConvex.isa(Type.QUAD, Type.POLYGON);
clipConvex.isa(Type.TRIANGLE, Type.POLYGON);
