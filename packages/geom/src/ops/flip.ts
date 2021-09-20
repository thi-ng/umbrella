import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { neg } from "@thi.ng/vectors/neg";
import type { Arc } from "../api/arc";
import type { Group } from "../api/group";
import type { Path } from "../api/path";
import type { Ray } from "../api/ray";
import { dispatch } from "../internal/dispatch";

export const flip = defmulti<IShape, IShape>(dispatch);
flip.setDefault((x) => x);

flip.addAll(<IObjectOf<Implementation1<unknown, IShape>>>{
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
});

flip.isa("cubic", "points");
flip.isa("line", "points");
flip.isa("points3", "points");
flip.isa("poly", "points");
flip.isa("polyline", "points");
flip.isa("quad", "points");
flip.isa("quadratic", "points");
flip.isa("tri", "points");
