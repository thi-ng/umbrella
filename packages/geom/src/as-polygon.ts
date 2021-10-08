import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { Polygon } from "./api/polygon";
import { copyAttribs } from "./internal/copy-attribs";
import { dispatch } from "./internal/dispatch";
import { vertices } from "./vertices";

export const asPolygon: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polygon
> = defmulti<IShape, number | Partial<SamplingOpts> | undefined, Polygon>(
    dispatch,
    {
        circle: "points",
        ellipse: "points",
        line: "points",
        path: "points",
        poly: "points",
        polyline: "points",
        quad: "points",
        rect: "points",
        tri: "points",
    },
    {
        points: ($, opts) => new Polygon(vertices($, opts), copyAttribs($)),
    }
);
