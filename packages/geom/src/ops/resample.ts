import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike, SamplingOpts } from "@thi.ng/geom-api";
import { resample as _resample } from "@thi.ng/geom-resample/resample";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { asPolygon } from "./as-polygon";

export const resample = defmulti<
    IShape,
    number | Partial<SamplingOpts>,
    IShape
>(dispatch);

resample.addAll(<
    IObjectOf<Implementation2<unknown, number | Partial<SamplingOpts>, IShape>>
>{
    circle: ($: IShape, opts) => asPolygon($, opts),

    poly: ($: PCLike, opts) =>
        new Polygon(_resample($.points, opts, true, true), copyAttribs($)),

    polyline: ($: PCLike, opts) =>
        new Polyline(_resample($.points, opts, false, true), copyAttribs($)),
});

resample.isa("ellipse", "circle");
resample.isa("line", "polyline");
resample.isa("quad", "poly");
resample.isa("tri", "poly");
resample.isa("rect", "circle");
