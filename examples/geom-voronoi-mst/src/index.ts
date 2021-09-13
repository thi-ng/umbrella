import { mst } from "@thi.ng/adjacency/mst";
import { timed } from "@thi.ng/bench/timed";
import { KdTreeMap } from "@thi.ng/geom-accel/kd-tree-map";
import { KdTreeSet } from "@thi.ng/geom-accel/kd-tree-set";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { group } from "@thi.ng/geom/ctors/group";
import { line } from "@thi.ng/geom/ctors/line";
import { points } from "@thi.ng/geom/ctors/points";
import { polygon, star } from "@thi.ng/geom/ctors/polygon";
import { rect } from "@thi.ng/geom/ctors/rect";
import { center } from "@thi.ng/geom/ops/center";
import { closestPoint } from "@thi.ng/geom/ops/closest-point";
import { scatter } from "@thi.ng/geom/ops/scatter";
import { vertices } from "@thi.ng/geom/ops/vertices";
import { canvas } from "@thi.ng/hdom-canvas";
import { clearDOM } from "@thi.ng/hdom/dom";
import { renderOnce } from "@thi.ng/hdom/render-once";
import { fit } from "@thi.ng/math/fit";
import { samplePoisson } from "@thi.ng/poisson";
import { comp } from "@thi.ng/transducers/func/comp";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dist } from "@thi.ng/vectors/dist";
import { floor } from "@thi.ng/vectors/floor";

const W = 500;
const R = W / 2;

const poly = star(R, 8, [0.7, 1, 1, 0.7]);
const bounds = center(rect(W))!;

const pts = timed(() =>
    samplePoisson({
        points: () => scatter(poly, 1)![0],
        density: (p) => fit(dist(p, closestPoint(poly, p)!), 0, R, 1, 20),
        max: 10000,
        quality: 1000,
        index: new KdTreeSet(2),
    })
);

const mesh = timed(() => new DVMesh(pts, 1e4));

const _mst = timed(() => {
    const edges = [
        ...map(
            (e) => [floor(null, e[0]), floor(null, e[1])],
            mesh.edges(false, [
                [-R, -R],
                [R, R],
            ])
        ),
    ];

    const idx = new KdTreeMap<ReadonlyVec, number>(2);
    const rawVerts = transduce(
        comp(
            mapcat((e) => e),
            mapIndexed((i, v) => <[Vec, number]>[v, i])
        ),
        push<[Vec, number]>(),
        edges
    );
    idx.into(rawVerts, 0);

    const edgeVertexIDs: [number, number, Vec, Vec, number][] = edges.map(
        ([a, b]) => {
            const ia = idx.queryValues(a, Infinity, 1)[0];
            const ib = idx.queryValues(b, Infinity, 1)[0];
            return [ia, ib, a, b, dist(a, b)];
        }
    );

    return mst(
        edgeVertexIDs,
        rawVerts.length,
        (e) => e[4],
        (e) => [e[0], e[1]]
    ).map((e) => line(e[2], e[3]));
});

clearDOM(document.getElementById("app")!);

renderOnce([
    canvas,
    { width: W, height: W },
    group({ translate: [R, R] }, [
        group(
            { stroke: "#9dd", weight: 0.25 },
            mesh.voronoi(vertices(bounds)).map((p) => polygon(p))
        ),
        points(pts, { fill: "#f09", size: 2 }),
        group({ stroke: "#000", weight: 1 }, _mst),
    ]),
]);
