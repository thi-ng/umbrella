import {
    DEFAULT,
    defmulti,
    Implementation1O,
    MultiFn1O,
} from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { ReadonlyVec, set2, set3, submN, ZERO2, ZERO3 } from "@thi.ng/vectors";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Ellipse } from "../api/ellipse";
import { Sphere } from "../api/sphere";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";
import { translate } from "./translate";
import type { IObjectOf } from "@thi.ng/api";

export const center: MultiFn1O<
    IShape,
    ReadonlyVec,
    IShape | undefined
> = defmulti(dispatch);

center.add(DEFAULT, ($, origin = ZERO3) => {
    const c = centroid($);
    return c ? translate($, submN(null, c, origin, -1)) : undefined;
});

center.addAll(<
    IObjectOf<Implementation1O<unknown, ReadonlyVec, IShape | undefined>>
>{
    [Type.ARC]: ($: Arc, origin = ZERO2) =>
        new Arc(
            set2([], origin),
            set2([], $.r),
            $.axis,
            $.start,
            $.end,
            $.xl,
            $.cw,
            copyAttribs($)
        ),

    [Type.CIRCLE]: ($: Circle, origin = ZERO2) =>
        new Circle(set2([], origin), $.r, copyAttribs($)),

    [Type.ELLIPSE]: ($: Ellipse, origin = ZERO2) =>
        new Ellipse(set2([], origin), set2([], $.r), copyAttribs($)),

    [Type.SPHERE]: ($: Sphere, origin = ZERO3) =>
        new Sphere(set3([], origin), $.r, copyAttribs($)),
});
