import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { ZERO2 } from "@thi.ng/vectors/api";
import { max2 } from "@thi.ng/vectors/max";
import { normalCW } from "@thi.ng/vectors/normal";
import { set2 } from "@thi.ng/vectors/set";
import { sub2 } from "@thi.ng/vectors/sub";
import { Circle } from "./api/circle.js";
import type { Line } from "./api/line.js";
import { Quad } from "./api/quad.js";
import type { Rect } from "./api/rect.js";
import { centroid } from "./centroid.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { rectFromCentroid } from "./rect.js";

export const offset: MultiFn2<IShape, number, IShape> = defmulti<
    any,
    number,
    IShape
>(
    __dispatch,
    {},
    {
        circle: ($: Circle, n) =>
            new Circle(set2([], $.pos), Math.max($.r + n, 0)),

        line: ({ points: [a, b], attribs }: Line, n) => {
            const norm = normalCW([], a, b, n);
            return new Quad(
                [
                    add2([], a, norm),
                    add2([], b, norm),
                    sub2([], b, norm),
                    sub2([], a, norm),
                ],
                { ...attribs }
            );
        },

        rect: ($: Rect, n) =>
            rectFromCentroid(
                centroid($)!,
                max2(null, addN2([], $.size, n), ZERO2),
                __copyAttribs($)
            ),
    }
);
