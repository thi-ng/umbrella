import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { IShape, SamplingOpts, Type } from "@thi.ng/geom-api";
import { Path, Polyline } from "../api";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const asPolyline: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polyline
> = defmulti(dispatch);

asPolyline.addAll({
    [Type.POINTS]: ($, opts) =>
        new Polyline(vertices($, opts), { ...$.attribs }),

    [Type.PATH]: ($: Path, opts) => {
        const pts = vertices($, opts);
        return new Polyline($.closed ? pts.concat([pts[0]]) : pts, {
            ...$.attribs
        });
    },

    [Type.POLYGON]: ($, opts) => {
        const pts = vertices($, opts);
        return new Polyline(pts.concat([pts[0]]), { ...$.attribs });
    }
});

asPolyline.isa(Type.CIRCLE, Type.POLYGON);
asPolyline.isa(Type.ELLIPSE, Type.POLYGON);
asPolyline.isa(Type.LINE, Type.POINTS);
asPolyline.isa(Type.POLYLINE, Type.POINTS);
asPolyline.isa(Type.QUAD, Type.POLYGON);
asPolyline.isa(Type.RECT, Type.POLYGON);
asPolyline.isa(Type.TRIANGLE, Type.POLYGON);
