import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike, SamplingOpts } from "@thi.ng/geom-api";
import { resample as _resample } from "@thi.ng/geom-resample/resample";
import { Polygon } from "./api/polygon";
import { Polyline } from "./api/polyline";
import { copyAttribs } from "./internal/copy-attribs";
import { dispatch } from "./internal/dispatch";
import { asPolygon } from "./as-polygon";

export const resample: MultiFn2<
    IShape,
    number | Partial<SamplingOpts>,
    IShape
> = defmulti<any, number | Partial<SamplingOpts>, IShape>(
    dispatch,
    {
        ellipse: "circle",
        line: "polyline",
        quad: "poly",
        tri: "poly",
        rect: "circle",
    },
    {
        circle: ($: IShape, opts) => asPolygon($, opts),

        poly: ($: PCLike, opts) =>
            new Polygon(_resample($.points, opts, true, true), copyAttribs($)),

        polyline: ($: PCLike, opts) =>
            new Polyline(
                _resample($.points, opts, false, true),
                copyAttribs($)
            ),
    }
);
