import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { add2 } from "@thi.ng/vectors/add";
import { addN2 } from "@thi.ng/vectors/addn";
import { ZERO2 } from "@thi.ng/vectors/api";
import { max2 } from "@thi.ng/vectors/max";
import { normalCW } from "@thi.ng/vectors/normal";
import { set2 } from "@thi.ng/vectors/set";
import { sub2 } from "@thi.ng/vectors/sub";
import { Circle } from "../api/circle";
import type { Line } from "../api/line";
import { Quad } from "../api/quad";
import type { Rect } from "../api/rect";
import { rectFromCentroid } from "../ctors/rect";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";

export const offset = defmulti<IShape, number, IShape>(dispatch);

offset.addAll(<IObjectOf<Implementation2<unknown, number, IShape>>>{
    circle: ($: Circle, n) => new Circle(set2([], $.pos), Math.max($.r + n, 0)),

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
            copyAttribs($)
        ),
});
