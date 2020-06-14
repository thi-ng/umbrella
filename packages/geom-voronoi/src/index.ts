import { isNumber } from "@thi.ng/checks";
import { liangBarsky2 } from "@thi.ng/geom-clip-line";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import {
    pointInCircumCircle,
    pointInPolygon2,
    pointInSegment,
} from "@thi.ng/geom-isec";
import { centroid, circumCenter2 } from "@thi.ng/geom-poly-utils";
import { EPS } from "@thi.ng/math";
import { Edge } from "@thi.ng/quad-edge";
import {
    eqDelta2,
    ReadonlyVec,
    signedArea2,
    Vec,
    VecPair,
    ZERO2,
} from "@thi.ng/vectors";
import type { IObjectOf, Pair } from "@thi.ng/api";

export type Visitor<T> = (
    e: Edge<Vertex<T>>,
    visted?: IObjectOf<boolean>,
    processed?: IObjectOf<boolean>
) => void;

const rightOf = (p: ReadonlyVec, e: Edge<Vertex<any>>) =>
    signedArea2(p, e.dest.pos, e.origin.pos) > 0;

export interface Vertex<T> {
    pos: ReadonlyVec;
    id: number;
    val?: T;
}

export class DVMesh<T> {
    first: Edge<Vertex<T>>;
    boundsTri: ReadonlyVec[];
    nextID: number;

    constructor(pts?: ReadonlyVec[] | Pair<ReadonlyVec, T>[], size = 1e5) {
        const a: Vertex<T> = { pos: [0, -size], id: 0 };
        const b: Vertex<T> = { pos: [size, size], id: 1 };
        const c: Vertex<T> = { pos: [-size, size], id: 2 };
        const eab = Edge.create(a, b);
        const ebc = Edge.create(b, c);
        const eca = Edge.create(c, a);
        eab.sym.splice(ebc);
        ebc.sym.splice(eca);
        eca.sym.splice(eab);
        this.boundsTri = [a.pos, b.pos, c.pos];
        this.first = eab;
        this.nextID = 3;
        if (pts && pts.length) {
            isNumber(pts[0][0])
                ? this.addKeys(<ReadonlyVec[]>pts)
                : this.addAll(<Pair<ReadonlyVec, T>[]>pts);
        }
    }

    add(p: ReadonlyVec, val?: T, eps = EPS) {
        let [e, exists] = this.locate(p, eps);
        if (exists) return false;
        if (pointInSegment(p, e.origin.pos, e.dest.pos)) {
            e = e.oprev;
            e.onext.remove();
        }
        let base = Edge.create<Vertex<T>>(e.origin, {
            pos: p,
            id: this.nextID++,
            val,
        });
        base.splice(e);
        const first = base;
        do {
            base = e.connect(base.sym);
            e = base.oprev;
        } while (e.lnext !== first);
        // enforce delaunay constraints
        do {
            const t = e.oprev;
            if (
                rightOf(t.dest.pos, e) &&
                pointInCircumCircle(e.origin.pos, t.dest.pos, e.dest.pos, p)
            ) {
                e.swap();
                e = e.oprev;
            } else if (e.onext !== first) {
                e = e.onext.lprev;
            } else {
                break;
            }
        } while (true);
        return true;
    }

    addKeys(pts: Iterable<ReadonlyVec>, eps?: number) {
        for (let p of pts) {
            this.add(p, undefined, eps);
        }
        this.computeDual();
    }

    addAll(pairs: Iterable<Pair<ReadonlyVec, T>>, eps?: number) {
        for (let p of pairs) {
            this.add(p[0], p[1], eps);
        }
        this.computeDual();
    }

    /**
     * Returns tuple of the edge related to `p` and a boolean to indicate if
     * `p` already exists in this triangulation (true if already present).
     *
     * @param p - query point
     */
    locate(p: ReadonlyVec, eps = EPS): [Edge<Vertex<T>>, boolean] {
        let e = this.first;
        while (true) {
            if (
                eqDelta2(p, e.origin.pos, eps) ||
                eqDelta2(p, e.dest.pos, eps)
            ) {
                return [e, true];
            } else if (rightOf(p, e)) {
                e = e.sym;
            } else if (!rightOf(p, e.onext)) {
                e = e.onext;
            } else if (!rightOf(p, e.dprev)) {
                e = e.dprev;
            } else {
                return [e, false];
            }
        }
    }

    /**
     * Syncronize / update / add dual faces (i.e. Voronoi) for current
     * primary mesh (i.e. Delaunay).
     */
    computeDual() {
        const work = [this.first.rot];
        const visitedEdges: IObjectOf<boolean> = {};
        const visitedVerts: IObjectOf<boolean> = {};
        while (work.length) {
            const e = work.pop()!;
            if (visitedEdges[e.id]) continue;
            visitedEdges[e.id] = true;
            if (!e.origin || !visitedVerts[e.origin.id]) {
                let t = e.rot;
                const a = t.origin.pos;
                let isBounds = this.isBoundary(a);
                t = t.lnext;
                const b = t.origin.pos;
                isBounds = isBounds && this.isBoundary(b);
                t = t.lnext;
                const c = t.origin.pos;
                isBounds = isBounds && this.isBoundary(c);
                const id = this.nextID++;
                e.origin = {
                    pos: !isBounds ? circumCenter2(a, b, c)! : ZERO2,
                    id,
                };
                visitedVerts[id] = true;
            }
            work.push(e.sym, e.onext, e.lnext);
        }
    }

    delaunay(bounds?: ReadonlyVec[]) {
        const cells: Vec[][] = [];
        const usedEdges: IObjectOf<boolean> = {};
        const bc = bounds && centroid(bounds);
        this.traverse((eab) => {
            if (!usedEdges[eab.id]) {
                const ebc = eab.lnext;
                const eca = ebc.lnext;
                const va = eab.origin.pos;
                const vb = ebc.origin.pos;
                const vc = eca.origin.pos;
                let verts = [va, vb, vc];
                if (
                    bounds &&
                    !(
                        pointInPolygon2(va, bounds) &&
                        pointInPolygon2(vb, bounds) &&
                        pointInPolygon2(vc, bounds)
                    )
                ) {
                    verts = sutherlandHodgeman(verts, bounds, bc);
                    if (verts.length > 2) {
                        cells.push(verts);
                    }
                } else {
                    cells.push(verts);
                }
                usedEdges[eab.id] = usedEdges[ebc.id] = usedEdges[
                    eca.id
                ] = true;
            }
        });
        return cells;
    }

    voronoi(bounds?: ReadonlyVec[]) {
        const cells: Vec[][] = [];
        const bc = bounds && centroid(bounds);
        this.traverse(
            bounds
                ? (e) => {
                      const first = (e = e.rot);
                      let verts = [];
                      let needsClip = false;
                      let p: ReadonlyVec;
                      do {
                          p = e.origin.pos;
                          verts.push(p);
                          needsClip = needsClip || !pointInPolygon2(p, bounds);
                      } while ((e = e.lnext) !== first);
                      if (needsClip) {
                          verts = sutherlandHodgeman(verts, bounds, bc);
                          if (verts.length < 3) return;
                      }
                      cells.push(verts);
                  }
                : (e) => {
                      const first = (e = e.rot);
                      const verts = [];
                      do {
                          verts.push(e.origin.pos);
                      } while ((e = e.lnext) !== first);
                      cells.push(verts);
                  },
            false
        );
        return cells;
    }

    edges(voronoi = false, boundsMinMax?: VecPair) {
        const edges: VecPair[] = [];
        const visitedEdges: IObjectOf<boolean> = {};
        this.traverse(
            (e) => {
                if (visitedEdges[e.id] || visitedEdges[e.sym.id]) return;
                const a = e.origin.pos;
                const b = e.dest.pos;
                if (!this.isBoundary(a) && !this.isBoundary(b)) {
                    if (boundsMinMax) {
                        const clip = liangBarsky2(
                            a,
                            b,
                            boundsMinMax[0],
                            boundsMinMax[1]
                        );
                        clip && edges.push([clip[0], clip[1]]);
                    } else {
                        edges.push([a, b]);
                    }
                }
                visitedEdges[e.id] = true;
            },
            true,
            voronoi ? this.first.rot : this.first
        );
        return edges;
    }

    traverse(proc: Visitor<T>, edges = true, e: Edge<Vertex<T>> = this.first) {
        const work = [e];
        const visitedEdges: IObjectOf<boolean> = {};
        const visitedVerts: IObjectOf<boolean> = {};
        while (work.length) {
            e = work.pop()!;
            if (visitedEdges[e.id]) continue;
            visitedEdges[e.id] = true;
            if (
                !this.isBoundary(e.origin.pos) &&
                !this.isBoundary(e.rot.origin.pos)
            ) {
                if (edges || !visitedVerts[e.origin.id]) {
                    visitedVerts[e.origin.id] = true;
                    proc(e, visitedEdges, visitedVerts);
                }
            }
            work.push(e.sym, e.onext, e.lnext);
        }
    }

    protected isBoundary(v: ReadonlyVec) {
        const b = this.boundsTri;
        return eqDelta2(b[0], v) || eqDelta2(b[1], v) || eqDelta2(b[2], v);
    }
}
