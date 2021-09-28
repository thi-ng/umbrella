import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { ReadonlyVec, ZERO2, ZERO3 } from "@thi.ng/vectors/api";
import { set2, set3 } from "@thi.ng/vectors/set";
import { submN } from "@thi.ng/vectors/submn";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Ellipse } from "../api/ellipse";
import { Sphere } from "../api/sphere";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";
import { translate } from "./translate";

export const center: MultiFn1O<IShape, ReadonlyVec, IShape | undefined> =
    defmulti<any, ReadonlyVec | undefined, IShape | undefined>(
        dispatch,
        {},
        {
            [DEFAULT]: ($, origin = ZERO3) => {
                const c = centroid($);
                return c ? translate($, submN(null, c, origin, -1)) : undefined;
            },
            arc: ($: Arc, origin = ZERO2) =>
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

            circle: ($: Circle, origin = ZERO2) =>
                new Circle(set2([], origin), $.r, copyAttribs($)),

            ellipse: ($: Ellipse, origin = ZERO2) =>
                new Ellipse(set2([], origin), set2([], $.r), copyAttribs($)),

            sphere: ($: Sphere, origin = ZERO3) =>
                new Sphere(set3([], origin), $.r, copyAttribs($)),
        }
    );
