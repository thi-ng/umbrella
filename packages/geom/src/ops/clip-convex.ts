import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";
import { vertices } from "./vertices";
import type { IObjectOf } from "@thi.ng/api";

export const clipConvex = defmulti<IShape, IShape, Polygon>(dispatch);

clipConvex.addAll(<IObjectOf<Implementation2<unknown, unknown, Polygon>>>{
    [Type.POLYGON]: ($: Polygon, boundary: IShape) =>
        new Polygon(
            sutherlandHodgeman(
                $.points,
                vertices(boundary),
                centroid(boundary)
            ),
            copyAttribs($)
        ),

    [Type.RECT]: ($: IShape, boundary: IShape) =>
        new Polygon(
            sutherlandHodgeman(
                vertices($),
                vertices(boundary),
                centroid(boundary)
            ),
            copyAttribs($)
        ),
});

clipConvex.isa(Type.CIRCLE, Type.RECT);
clipConvex.isa(Type.ELLIPSE, Type.RECT);
clipConvex.isa(Type.PATH, Type.RECT);
clipConvex.isa(Type.QUAD, Type.POLYGON);
clipConvex.isa(Type.TRIANGLE, Type.POLYGON);
