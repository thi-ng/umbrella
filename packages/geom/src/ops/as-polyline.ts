import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1O, MultiFn1O } from "@thi.ng/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { set } from "@thi.ng/vectors";
import type { Cubic } from "../api/cubic";
import type { Path } from "../api/path";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const asPolyline: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polyline
> = defmulti(dispatch);

asPolyline.addAll(<
    IObjectOf<
        Implementation1O<unknown, number | Partial<SamplingOpts>, Polyline>
    >
>{
    cubic: ($: Cubic, opts) => new Polyline(vertices($, opts)),

    points: ($: IShape, opts) =>
        new Polyline(vertices($, opts), copyAttribs($)),

    path: ($: Path, opts) => {
        const pts = vertices($, opts);
        $.closed && pts.push(set([], pts[0]));
        return new Polyline(pts, copyAttribs($));
    },

    poly: ($: IShape, opts) => {
        const pts = vertices($, opts);
        pts.push(set([], pts[0]));
        return new Polyline(pts, copyAttribs($));
    },
});

asPolyline.isa("arc", "cubic");
asPolyline.isa("circle", "poly");
asPolyline.isa("ellipse", "poly");
asPolyline.isa("line", "points");
asPolyline.isa("polyline", "points");
asPolyline.isa("quad", "poly");
asPolyline.isa("quadratic", "cubic");
asPolyline.isa("rect", "poly");
asPolyline.isa("tri", "poly");
