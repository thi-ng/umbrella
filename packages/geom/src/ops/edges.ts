import { defmulti, MultiFn1O } from "@thi.ng/defmulti";
import { IShape, SamplingOpts, Type } from "@thi.ng/geom-api";
import { VecPair } from "@thi.ng/vectors";
import { Polygon, Polyline, Rect } from "../api";
import { dispatch } from "../internal/dispatch";
import { edgeIterator } from "../internal/edges";
import { vertices } from "./vertices";

export const edges: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Iterable<VecPair>
> = defmulti(dispatch);

edges.addAll({
    [Type.POLYGON]: ($: Polygon) => edgeIterator($.points, true),

    [Type.POLYLINE]: ($: Polyline) => edgeIterator($.points),

    [Type.RECT]: ($: Rect) => edgeIterator(vertices($), true)
});

edges.isa(Type.LINE, Type.POLYLINE);
edges.isa(Type.QUAD, Type.POLYGON);
edges.isa(Type.TRIANGLE, Type.POLYGON);
