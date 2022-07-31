import type { IObjectOf, Pair } from "@thi.ng/api";
import { BitField, defBitField } from "@thi.ng/bitfield/bitfield";
import { isNumber } from "@thi.ng/checks/is-number";
import { liangBarsky2 } from "@thi.ng/geom-clip-line/liang-barsky";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import {
	pointInCircumCircle,
	pointInPolygon2,
	pointInSegment,
} from "@thi.ng/geom-isec/point";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { circumCenter2 } from "@thi.ng/geom-poly-utils/circumcenter";
import { EPS } from "@thi.ng/math/api";
import { defEdge, Edge } from "@thi.ng/quad-edge";
import { ReadonlyVec, Vec, VecPair, ZERO2 } from "@thi.ng/vectors/api";
import { eqDelta2 } from "@thi.ng/vectors/eqdelta";
import { signedArea2 } from "@thi.ng/vectors/signed-area";

export type Visitor<T> = (
	e: Edge<Vertex<T>>,
	vistedEdges: BitField,
	visitedVerts: BitField
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
	nextEID: number;
	nextVID: number;

	constructor(pts?: ReadonlyVec[] | Pair<ReadonlyVec, T>[], size = 1e5) {
		const a: Vertex<T> = { pos: [0, -size], id: 0 };
		const b: Vertex<T> = { pos: [size, size], id: 1 };
		const c: Vertex<T> = { pos: [-size, size], id: 2 };
		const eab = defEdge(0, a, b);
		const ebc = defEdge(4, b, c);
		const eca = defEdge(8, c, a);
		eab.sym.splice(ebc);
		ebc.sym.splice(eca);
		eca.sym.splice(eab);
		this.first = eab;
		this.nextEID = 12;
		this.nextVID = 3;
		if (pts && pts.length) {
			isNumber(pts[0][0])
				? this.addKeys(<ReadonlyVec[]>pts)
				: this.addAll(<Pair<ReadonlyVec, T>[]>pts);
		} else {
			this.computeDual();
		}
	}

	/**
	 * Adds a single new point `p` w/ optional value `val` to the mesh, unless
	 * there already is another point existing within radius `eps`. If `update`
	 * is true (default), the mesh dual will be automatically updated using
	 * {@link DVMesh.computeDual}.
	 *
	 * @remarks
	 * If adding multiple points, ensure `computeDual` will only be called
	 * for/after the last point insertion to avoid computational overhead.
	 *
	 * @param p -
	 * @param val -
	 * @param eps -
	 * @param update -
	 */
	add(p: ReadonlyVec, val?: T, eps = EPS, update = true) {
		let [e, exists] = this.locate(p, eps);
		if (exists) return false;
		if (pointInSegment(p, e.origin.pos, e.dest.pos)) {
			e = e.oprev;
			e.onext.remove();
		}
		let base = defEdge<Vertex<T>>(this.nextEID, e.origin, {
			pos: p,
			id: this.nextVID++,
			val,
		});
		base.splice(e);
		this.nextEID += 4;
		const first = base;
		do {
			base = e.connect(base.sym, this.nextEID);
			e = base.oprev;
			this.nextEID += 4;
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
		update && this.computeDual();
		return true;
	}

	addKeys(pts: Iterable<ReadonlyVec>, eps?: number) {
		for (let p of pts) {
			this.add(p, undefined, eps, false);
		}
		this.computeDual();
	}

	addAll(pairs: Iterable<Pair<ReadonlyVec, T>>, eps?: number) {
		for (let p of pairs) {
			this.add(p[0], p[1], eps, false);
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
				let isBoundary = t.origin.id < 3;
				t = t.lnext;
				const b = t.origin.pos;
				isBoundary = isBoundary && t.origin.id < 3;
				t = t.lnext;
				const c = t.origin.pos;
				isBoundary = isBoundary && t.origin.id < 3;
				const id = this.nextVID++;
				e.origin = {
					pos: !isBoundary ? circumCenter2(a, b, c)! : ZERO2,
					id,
				};
				visitedVerts[id] = true;
			}
			work.push(e.sym, e.onext, e.lnext);
		}
	}

	delaunay(bounds?: ReadonlyVec[]) {
		const cells: Vec[][] = [];
		const usedEdges = defBitField(this.nextEID);
		const bc = bounds && centroid(bounds);
		this.traverse((eab) => {
			if (!usedEdges.at(eab.id)) {
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
				usedEdges.setAt(eab.id);
				usedEdges.setAt(ebc.id);
				usedEdges.setAt(eca.id);
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
							needsClip =
								needsClip || !pointInPolygon2(p, bounds);
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
		this.traverse(
			(e, visitedEdges) => {
				if (visitedEdges.at(e.sym.id)) return;
				if (e.origin.id > 2 && e.dest.id > 2) {
					const a = e.origin.pos;
					const b = e.dest.pos;
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
				visitedEdges.setAt(e.id);
			},
			true,
			voronoi ? this.first.rot : this.first
		);
		return edges;
	}

	traverse(proc: Visitor<T>, edges = true, e: Edge<Vertex<T>> = this.first) {
		const work = [e];
		const visitedEdges = defBitField(this.nextEID);
		const visitedVerts = defBitField(this.nextVID);
		while (work.length) {
			e = work.pop()!;
			if (visitedEdges.at(e.id)) continue;
			visitedEdges.setAt(e.id);
			const eoID = e.origin.id;
			if (eoID > 2 && e.rot.origin.id > 2) {
				if (edges || !visitedVerts.at(eoID)) {
					visitedVerts.setAt(eoID);
					proc(e, visitedEdges, visitedVerts);
				}
			}
			work.push(e.sym, e.onext, e.lnext);
		}
	}
}
