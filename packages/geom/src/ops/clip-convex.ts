import { defmulti } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { sutherlandHodgeman } from "@thi.ng/geom-clip";
import { Polygon } from "../api";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";
import { vertices } from "./vertices";

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
