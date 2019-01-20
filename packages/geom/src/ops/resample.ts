import { defmulti } from "@thi.ng/defmulti";
import {
    IShape,
    PCLike,
    Polygon,
    Polyline,
    SamplingOpts,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { resamplePoints } from "../internal/sampler";
import { asPolygon } from "./as-polygon";

export const resample = defmulti<IShape, number | Partial<SamplingOpts>, IShape>(dispatch);

resample.addAll({

    [Type.CIRCLE]:
        ($, opts) => asPolygon($, opts),

    [Type.POLYGON]:
        ($: PCLike, opts) =>
            new Polygon(resamplePoints($.points, opts, true, true), { ...$.attribs }),

    [Type.POLYLINE]:
        ($: PCLike, opts) =>
            new Polyline(resamplePoints($.points, opts, false, true), { ...$.attribs }),

});

resample.isa(Type.ELLIPSE, Type.CIRCLE);
resample.isa(Type.LINE, Type.POLYLINE);
resample.isa(Type.QUAD, Type.POLYGON);
resample.isa(Type.TRIANGLE, Type.POLYGON);
resample.isa(Type.RECT, Type.CIRCLE);
