import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1O, MultiFn1O } from "@thi.ng/defmulti";
import { IShape, SamplingOpts, Type } from "@thi.ng/geom-api";
import { set } from "@thi.ng/vectors";
import { Cubic } from "../api/cubic";
import { Path } from "../api/path";
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
    [Type.CUBIC]: ($: Cubic, opts) => new Polyline(vertices($, opts)),

    [Type.POINTS]: ($: IShape, opts) =>
        new Polyline(vertices($, opts), copyAttribs($)),

    [Type.PATH]: ($: Path, opts) => {
        const pts = vertices($, opts);
        $.closed && pts.push(set([], pts[0]));
        return new Polyline(pts, copyAttribs($));
    },

    [Type.POLYGON]: ($: IShape, opts) => {
        const pts = vertices($, opts);
        pts.push(set([], pts[0]));
        return new Polyline(pts, copyAttribs($));
    },
});

asPolyline.isa(Type.ARC, Type.CUBIC);
asPolyline.isa(Type.CIRCLE, Type.POLYGON);
asPolyline.isa(Type.ELLIPSE, Type.POLYGON);
asPolyline.isa(Type.LINE, Type.POINTS);
asPolyline.isa(Type.POLYLINE, Type.POINTS);
asPolyline.isa(Type.QUAD, Type.POLYGON);
asPolyline.isa(Type.QUADRATIC, Type.CUBIC);
asPolyline.isa(Type.RECT, Type.POLYGON);
asPolyline.isa(Type.TRIANGLE, Type.POLYGON);
