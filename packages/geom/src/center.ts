import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { ReadonlyVec, ZERO2, ZERO3 } from "@thi.ng/vectors/api";
import { set2, set3 } from "@thi.ng/vectors/set";
import { submN } from "@thi.ng/vectors/submn";
import { Arc } from "./api/arc.js";
import { Circle } from "./api/circle.js";
import { Ellipse } from "./api/ellipse.js";
import { Sphere } from "./api/sphere.js";
import { centroid } from "./centroid.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { translate } from "./translate.js";

/**
 * Returns copy of given shape centered around optionally provided point `p`
 * (default: worldspace origin).
 *
 * @remarks
 * Implemented for all shape types supported by {@link centroid} and
 * {@link translate}.
 *
 * @param shape
 * @param p
 */
export const center: MultiFn1O<IShape, ReadonlyVec, IShape | undefined> =
    defmulti<any, ReadonlyVec | undefined, IShape | undefined>(
        __dispatch,
        {},
        {
            [DEFAULT]: ($: IShape, origin = ZERO3) => {
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
                    __copyAttribs($)
                ),

            circle: ($: Circle, origin = ZERO2) =>
                new Circle(set2([], origin), $.r, __copyAttribs($)),

            ellipse: ($: Ellipse, origin = ZERO2) =>
                new Ellipse(set2([], origin), set2([], $.r), __copyAttribs($)),

            sphere: ($: Sphere, origin = ZERO3) =>
                new Sphere(set3([], origin), $.r, __copyAttribs($)),
        }
    );
