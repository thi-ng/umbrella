import { IObjectOf } from "@thi.ng/api";
import { liangBarsky2, sutherlandHodgeman } from "@thi.ng/geom-clip";
import { pointInCircumCircle, pointInPolygon2, pointInSegment2 } from "@thi.ng/geom-isec";
import { centroid, circumCenter2 } from "@thi.ng/geom-poly-utils";
import { Edge } from "@thi.ng/quad-edge";
import {
    eqDelta2,
    ReadonlyVec,
    signedArea2,
    Vec,
    VecPair,
    ZERO2
} from "@thi.ng/vectors";

export type Visitor =
    (e: Edge<Vertex>, visted?: IObjectOf<boolean>, processed?: IObjectOf<boolean>) => void;

const rightOf =
    (p: ReadonlyVec, e: Edge<Vertex>) =>
        signedArea2(p, e.dest.pos, e.vertex.pos) > 0;

export interface Vertex {
    pos: ReadonlyVec;
    id: number;
}

export class DVMesh {

    first: Edge<Vertex>;
    boundsTri: ReadonlyVec[];
    nextID: number;

    constructor(pts?: ReadonlyVec[], size = 1e5) {
        const a: Vertex = { pos: [0, -size], id: 0 };
        const b: Vertex = { pos: [size, size], id: 1 };
        const c: Vertex = { pos: [-size, size], id: 2 };
        const eab = Edge.create(a, b);
        const ebc = Edge.create(b, c);
        const eca = Edge.create(c, a);
        eab.sym.splice(ebc);
        ebc.sym.splice(eca);
        eca.sym.splice(eab);
        this.boundsTri = [a.pos, b.pos, c.pos];
        this.first = eab;
        this.nextID = 3;
        pts && this.addAll(pts);
    }

    add(p: ReadonlyVec) {
        let [e, exists] = this.locate(p);
        if (exists) return false;
        if (pointInSegment2(p, e.vertex.pos, e.dest.pos)) {
            e = e.oprev;
            e.onext.remove();
        }
        let base = Edge.create<Vertex>(e.vertex, { pos: p, id: this.nextID++ });
        base.splice(e);
        const first = base;
        do {
            base = e.connect(base.sym);
            e = base.oprev;
        } while (e.lnext !== first);
        // enforce delaunay constraints
        do {
            const t = e.oprev;
            if (rightOf(t.dest.pos, e) &&
                pointInCircumCircle(e.vertex.pos, t.dest.pos, e.dest.pos, p)) {
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

    addAll(pts: ReadonlyVec[]) {
        for (let p of pts) {
            this.add(p);
        }
        this.computeDual();
    }

    /**
     * Returns tuple of the edge related to `p` and a boolean to indicate if
     * `p` already exists in this triangulation.
     *
     * @param p
     */
    locate(p: ReadonlyVec): [Edge<Vertex>, boolean] {
        let e = this.first;
        while (true) {
            if (eqDelta2(p, e.vertex.pos) || eqDelta2(p, e.dest.pos)) {
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
            const e = work.pop();
            if (visitedEdges[e.id]) continue;
            visitedEdges[e.id] = true;
            if (!e.vertex || !visitedVerts[e.vertex.id]) {
                let t = e.rot;
                let isBounds = this.isBoundary(t);
                const a = t.vertex;
                t = t.lnext;
                isBounds = isBounds && this.isBoundary(t);
                const b = t.vertex;
                t = t.lnext;
                isBounds = isBounds && this.isBoundary(t);
                const c = t.vertex;
                e.vertex = {
                    pos: !isBounds ?
                        circumCenter2(a.pos, b.pos, c.pos) :
                        ZERO2,
                    id: this.nextID++
                };
                visitedVerts[e.vertex.id] = true;
            }
            work.push(e.sym, e.onext, e.lnext);
        }
    }

    delaunay(bounds?: ReadonlyVec[]) {
        const cells: Vec[][] = [];
        const usedEdges: IObjectOf<boolean> = {};
        const bc = bounds && centroid(bounds);
        this.traverse(
            (eab) => {
                if (!usedEdges[eab.id]) {
                    const ebc = eab.lnext;
                    const eca = ebc.lnext;
                    const va = eab.vertex.pos;
                    const vb = ebc.vertex.pos;
                    const vc = eca.vertex.pos;
                    let verts = [va, vb, vc];
                    if (bounds &&
                        !(
                            pointInPolygon2(va, bounds) &&
                            pointInPolygon2(vb, bounds) &&
                            pointInPolygon2(vc, bounds)
                        )) {
                        verts = sutherlandHodgeman(verts, bounds, bc);
                        if (verts.length > 2) {
                            cells.push(verts);
                        }
                    } else {
                        cells.push(verts);
                    }
                    usedEdges[eab.id] = usedEdges[ebc.id] = usedEdges[eca.id] = true;
                }
            }
        );
        return cells;
    }

    voronoi(bounds?: ReadonlyVec[]) {
        const cells: Vec[][] = [];
        const bc = bounds && centroid(bounds);
        this.traverse(
            (bounds ?
                ((e) => {
                    const first = e = e.rot;
                    let verts = [];
                    let needsClip = false;
                    let p: ReadonlyVec;
                    do {
                        p = e.vertex.pos;
                        verts.push(p);
                        needsClip = needsClip || !pointInPolygon2(p, bounds);
                    } while ((e = e.lnext) !== first);
                    if (needsClip) {
                        verts = sutherlandHodgeman(verts, bounds, bc);
                        if (verts.length < 3) return;
                    }
                    cells.push(verts);
                }) :
                ((e) => {
                    const first = e = e.rot;
                    const verts = [];
                    do {
                        verts.push(e.vertex.pos);
                    } while ((e = e.lnext) !== first);
                    cells.push(verts);
                })),
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
                const a = e.vertex.pos;
                const b = e.dest.pos;
                if (!this.isBoundaryVertex(a) && !this.isBoundaryVertex(b)) {
                    if (boundsMinMax) {
                        const clip = liangBarsky2(a, b, boundsMinMax[0], boundsMinMax[1]);
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

    traverse(proc: Visitor, edges = true, e: Edge<Vertex> = this.first) {
        const work = [e];
        const visitedEdges: IObjectOf<boolean> = {};
        const visitedVerts: IObjectOf<boolean> = {};
        while (work.length) {
            e = work.pop();
            if (visitedEdges[e.id]) continue;
            visitedEdges[e.id] = true;
            if (!this.isBoundaryVertex(e.vertex.pos) &&
                !this.isBoundaryVertex(e.rot.vertex.pos)) {
                if (edges || !visitedVerts[e.vertex.id]) {
                    visitedVerts[e.vertex.id] = true;
                    proc(e, visitedEdges, visitedVerts);
                }
            }
            work.push(e.sym, e.onext, e.lnext);
        }
    }

    protected isBoundary(e: Edge<Vertex>) {
        return this.isBoundaryVertex(e.vertex.pos);
    }

    protected isBoundaryVertex(v: ReadonlyVec) {
        const b = this.boundsTri;
        return eqDelta2(b[0], v) ||
            eqDelta2(b[1], v) ||
            eqDelta2(b[2], v);
    }
}
