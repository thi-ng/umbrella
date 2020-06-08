import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, SubdivKernel, Type } from "@thi.ng/geom-api";
import { subdivide } from "@thi.ng/geom-subdiv-curve";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

export const subdivCurve: MultiFn2O<
    IShape,
    SubdivKernel,
    number,
    IShape
> = defmulti(<any>dispatch);

subdivCurve.addAll(<
    IObjectOf<Implementation2O<unknown, SubdivKernel, number, IShape>>
>{
    [Type.POLYGON]: ($: Polygon, kernel, iter = 1) =>
        new Polygon(subdivide($.points, kernel, iter), copyAttribs($)),

    [Type.POLYLINE]: ($: Polyline, kernel, iter = 1) =>
        new Polyline(subdivide($.points, kernel, iter), copyAttribs($)),
});
