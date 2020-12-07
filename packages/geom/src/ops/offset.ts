import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import {
    add2,
    addN2,
    max2,
    normalCW,
    set2,
    sub2,
    ZERO2,
} from "@thi.ng/vectors";
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
    [Type.CIRCLE]: ($: Circle, n) =>
        new Circle(set2([], $.pos), Math.max($.r + n, 0)),

    [Type.LINE]: ({ points: [a, b], attribs }: Line, n) => {
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

    [Type.RECT]: ($: Rect, n) =>
        rectFromCentroid(
            centroid($)!,
            max2(null, addN2([], $.size, n), ZERO2),
            copyAttribs($)
        ),
});
