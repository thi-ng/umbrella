import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
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
    points: ($, opts) => new Polygon(vertices($, opts), copyAttribs($)),
});

asPolygon.isa("circle", "points");
asPolygon.isa("ellipse", "points");
asPolygon.isa("line", "points");
asPolygon.isa("path", "points");
asPolygon.isa("poly", "points");
asPolygon.isa("polyline", "points");
asPolygon.isa("quad", "points");
asPolygon.isa("rect", "points");
asPolygon.isa("tri", "points");
