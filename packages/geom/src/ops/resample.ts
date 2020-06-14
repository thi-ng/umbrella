import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, PCLike, SamplingOpts, Type } from "@thi.ng/geom-api";
import { resample as _resample } from "@thi.ng/geom-resample";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { asPolygon } from "./as-polygon";
import type { IObjectOf } from "@thi.ng/api";

export const resample = defmulti<
    IShape,
    number | Partial<SamplingOpts>,
    IShape
>(dispatch);

resample.addAll(<
    IObjectOf<Implementation2<unknown, number | Partial<SamplingOpts>, IShape>>
>{
    [Type.CIRCLE]: ($: IShape, opts) => asPolygon($, opts),

    [Type.POLYGON]: ($: PCLike, opts) =>
        new Polygon(_resample($.points, opts, true, true), copyAttribs($)),

    [Type.POLYLINE]: ($: PCLike, opts) =>
        new Polyline(_resample($.points, opts, false, true), copyAttribs($)),
});

resample.isa(Type.ELLIPSE, Type.CIRCLE);
resample.isa(Type.LINE, Type.POLYLINE);
resample.isa(Type.QUAD, Type.POLYGON);
resample.isa(Type.TRIANGLE, Type.POLYGON);
resample.isa(Type.RECT, Type.CIRCLE);
