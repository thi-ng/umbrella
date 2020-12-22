import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import type { IShape, SubdivKernel } from "@thi.ng/geom-api";
import { subdivide } from "@thi.ng/geom-subdiv-curve";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";

export const subdivCurve: MultiFn2O<
    IShape,
    SubdivKernel,
    number,
    IShape
> = defmulti(<any>dispatch);

subdivCurve.addAll(<
    IObjectOf<Implementation2O<unknown, SubdivKernel, number, IShape>>
>{
    poly: ($: Polygon, kernel, iter = 1) =>
        new Polygon(subdivide($.points, kernel, iter), copyAttribs($)),

    polyline: ($: Polyline, kernel, iter = 1) =>
        new Polyline(subdivide($.points, kernel, iter), copyAttribs($)),
});
