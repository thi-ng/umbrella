import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { IShape, SamplingOpts, Type } from "@thi.ng/geom-api";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const asPolygon: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polygon
> = defmulti(dispatch);

asPolygon.addAll({
    [Type.POINTS]: ($, opts) => new Polygon(vertices($, opts), copyAttribs($)),
});

asPolygon.isa(Type.CIRCLE, Type.POINTS);
asPolygon.isa(Type.ELLIPSE, Type.POINTS);
asPolygon.isa(Type.LINE, Type.POINTS);
asPolygon.isa(Type.PATH, Type.POINTS);
asPolygon.isa(Type.POLYGON, Type.POINTS);
asPolygon.isa(Type.POLYLINE, Type.POINTS);
asPolygon.isa(Type.QUAD, Type.POINTS);
asPolygon.isa(Type.RECT, Type.POINTS);
asPolygon.isa(Type.TRIANGLE, Type.POINTS);
