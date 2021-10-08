import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { neg } from "@thi.ng/vectors/neg";
import type { Arc } from "./api/arc";
import type { Group } from "./api/group";
import type { Path } from "./api/path";
import type { Ray } from "./api/ray";
import { dispatch } from "./internal/dispatch";

export const flip: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
    dispatch,
    {
        cubic: "points",
        line: "points",
        points3: "points",
        poly: "points",
        polyline: "points",
        quad: "points",
        quadratic: "points",
        tri: "points",
    },
    {
        [DEFAULT]: (x) => x,

        arc: ($: Arc) => {
            const t = $.start;
            $.start = $.end;
            $.end = t;
            $.cw = !$.cw;
            return $;
        },

        group: ($: Group) => {
            $.children.forEach(flip);
            return $;
        },

        path: ($: Path) => {
            // TODO
            return $;
        },

        points: ($: PCLike) => {
            $.points.reverse();
            return $;
        },

        ray: ($: Ray) => {
            $.dir = neg(null, $.dir);
            return $;
        },
    }
);
