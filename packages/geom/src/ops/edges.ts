import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation1O, MultiFn1O } from "@thi.ng/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import type { VecPair } from "@thi.ng/vectors";
import type { AABB } from "../api/aabb";
import type { Polygon } from "../api/polygon";
import type { Polyline } from "../api/polyline";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import { edgeIterator } from "../internal/edges";
import { vertices } from "./vertices";

export const edges: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Iterable<VecPair>
> = defmulti(dispatch);

edges.addAll(<
    IObjectOf<
        Implementation1O<
            unknown,
            number | Partial<SamplingOpts>,
            Iterable<VecPair>
        >
    >
>{
    aabb: ($: AABB) => {
        const [a, b, c, d, e, f, g, h] = vertices($);
        return [
            [a, b],
            [b, c],
            [c, d],
            [d, a], // bottom
            [e, f],
            [f, g],
            [g, h],
            [h, e], // top
            [a, e],
            [b, f], // left
            [c, g],
            [d, h], // right
        ];
    },

    poly: ($: Polygon) => edgeIterator($.points, true),

    polyline: ($: Polyline) => edgeIterator($.points),

    rect: ($: Rect) => edgeIterator(vertices($), true),
});

edges.isa("line", "polyline");
edges.isa("quad", "poly");
edges.isa("tri", "poly");
