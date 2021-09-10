import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { grahamScan2 } from "@thi.ng/geom-hull/graham-scan";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const convexHull = defmulti<IShape, IShape>(dispatch);

convexHull.addAll(<IObjectOf<Implementation1<unknown, IShape>>>{
    group: ($: IShape) => new Polygon(vertices($), copyAttribs($)),

    points: ($: PCLike) => new Polygon(grahamScan2($.points), copyAttribs($)),

    tri: ($: IShape) => $.copy(),
});

convexHull.isa("circle", "tri");
convexHull.isa("ellipse", "tri");
convexHull.isa("poly", "points");
convexHull.isa("polyline", "points");
convexHull.isa("quad", "points");
convexHull.isa("rect", "tri");
