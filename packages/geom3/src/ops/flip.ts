import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { neg } from "@thi.ng/vectors3";
import {
    Arc,
    Group,
    IShape,
    Path,
    PCLike,
    Ray,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";

export const flip = defmulti<IShape, IShape>(dispatch);
flip.add(DEFAULT, ($) => $);

flip.addAll({

    [Type.ARC]:
        ($: Arc) => {
            const t = $.start;
            $.start = $.end;
            $.end = t;
            $.cw = !$.cw;
            return $;
        },

    [Type.GROUP]:
        ($: Group) => {
            $.children.forEach(flip);
            return $;
        },

    [Type.PATH]:
        ($: Path) => {
            // TODO
            return $;
        },

    [Type.POINTS]:
        ($: PCLike) => {
            $.points.reverse();
            return $;
        },

    [Type.RAY]:
        ($: Ray) => {
            $.dir = neg(null, $.dir);
            return $;
        }
});

flip.isa(Type.CUBIC, Type.POINTS);
flip.isa(Type.LINE, Type.POINTS);
flip.isa(Type.POLYGON, Type.POINTS);
flip.isa(Type.POLYLINE, Type.POINTS);
flip.isa(Type.QUAD, Type.POINTS);
flip.isa(Type.QUADRATIC, Type.POINTS);
flip.isa(Type.TRIANGLE, Type.POINTS);
