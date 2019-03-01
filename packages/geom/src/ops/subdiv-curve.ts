import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, SubdivKernel, Type } from "@thi.ng/geom-api";
import { subdivide } from "@thi.ng/geom-subdiv-curve";
import { Polygon, Polyline } from "../api";
import { dispatch } from "../internal/dispatch";

export const subdivCurve: MultiFn2O<
    IShape,
    SubdivKernel,
    number,
    IShape
> = defmulti(dispatch);

subdivCurve.addAll({
    [Type.POLYGON]: (poly: Polygon, kernel, iter = 1) =>
        new Polygon(subdivide(poly.points, kernel, iter), { ...poly.attribs }),

    [Type.POLYLINE]: (line: Polyline, kernel, iter = 1) =>
        new Polyline(subdivide(line.points, kernel, iter), { ...line.attribs })
});
