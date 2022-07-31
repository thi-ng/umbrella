import { assert } from "@thi.ng/errors/assert";

/**
 * Type alias for a 4-tuple of {@link Edge} instances.
 */
export type QuadEdge<T> = [Edge<T>, Edge<T>, Edge<T>, Edge<T>];

/**
 * Main edge / quadedge factory function. Use this in preference of direct
 * invocation of the {@link Edge} constructor.
 *
 * Creates new {@link QuadEdge} with 4 child edges and returns the first
 * child/primary edge. If `src` and `dest` are given, they will be associated
 * with that new edge as end points.
 *
 * @remarks
 * The given `id` MUST be a multiple of 4.
 *
 * @param id -
 * @param src -
 * @param dest -
 */
export function defEdge<T>(id: number): Edge<T>;
export function defEdge<T>(id: number, src: T, dest: T): Edge<T>;
export function defEdge<T>(id: number, src?: T, dest?: T): Edge<T> {
	assert((id & 3) === 0, `id must be multiple of 4`);
	const quad = <QuadEdge<T>>new Array(4);
	const a = (quad[0] = new Edge(quad, id));
	const b = (quad[1] = new Edge(quad, id + 1));
	const c = (quad[2] = new Edge(quad, id + 2));
	const d = (quad[3] = new Edge(quad, id + 3));
	a.onext = a;
	c.onext = c;
	b.onext = d;
	d.onext = b;
	src && dest && a.setEnds(src, dest);
	return a;
}

/**
 * Quad-edge implementation after Guibas & Stolfi. Based on C++ versions
 * by Paul Heckbert, Dani Lischinski et al:
 *
 * References:
 *
 * - {@link http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html}
 * - {@link http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps}
 */
export class Edge<T> {
	id: number;
	parent: QuadEdge<T>;
	origin!: T;

	constructor(parent: QuadEdge<T>, id: number) {
		this.parent = parent;
		this.id = id;
	}

	/**
	 * Next CCW edge from this edge's origin.
	 */
	onext!: Edge<T>;

	/**
	 * Next CW edge from this edge's origin.
	 */
	get oprev() {
		return this.rot.onext.rot;
	}

	/**
	 * Dual of this edge, right -> left.
	 */
	get rot() {
		return this.parent[(this.id + 1) & 3];
	}

	/**
	 * Dual of this edge, left -> right.
	 * I.e same as `this.rot.sym`
	 */
	get invrot() {
		return this.parent[(this.id + 3) & 3];
	}

	/**
	 * Symmetric partner edge of this edge, from dest -> src.
	 * I.e. `this === this.sym.sym`
	 */
	get sym() {
		return this.parent[(this.id + 2) & 3];
	}

	/**
	 * Next CCW edge to this edge's dest.
	 */
	get dnext() {
		return this.sym.onext.sym;
	}

	/**
	 * Next CW edge to this edge's dest.
	 */
	get dprev() {
		return this.invrot.onext.invrot;
	}

	/**
	 * Next CCW edge around the left face (dual vertex) from this edge's
	 * dest.
	 */
	get lnext() {
		return this.invrot.onext.rot;
	}

	/**
	 * Next CCW edge around the left face (dual vertex) to this edge's
	 * origin.
	 */
	get lprev() {
		return this.onext.sym;
	}

	/**
	 * Next CCW edge around the right face (dual vertex) to this edge's
	 * dest.
	 */
	get rnext() {
		return this.rot.onext.invrot;
	}

	/**
	 * Next CCW edge around the right face (dual vertex) to this edge's
	 * origin.
	 */
	get rprev() {
		return this.sym.onext;
	}

	/**
	 * Returns this edge's dest vertex. I.e. `this.sym.origin`
	 */
	get dest() {
		return this.sym.origin;
	}

	/**
	 * Sets the origin & dest vertices of this edge (in other words, the
	 * origins of this edge and `this.sym`).
	 *
	 * @param o -
	 * @param d -
	 */
	setEnds(o: T, d: T) {
		this.origin = o;
		this.sym.origin = d;
	}

	connect(e: Edge<T>, id: number): Edge<T> {
		const n = defEdge<T>(id);
		n.splice(this.lnext);
		n.sym.splice(e);
		n.setEnds(this.dest, e.origin);
		return n;
	}

	swap() {
		const a = this.oprev;
		const b = this.sym.oprev;
		this.splice(a);
		this.sym.splice(b);
		this.splice(a.lnext);
		this.sym.splice(b.lnext);
		this.setEnds(a.dest, b.dest);
	}

	remove() {
		this.splice(this.oprev);
		this.sym.splice(this.sym.oprev);
		delete (<any>this).parent;
	}

	/**
	 * Modifies the edge rings around the origins of this edge and `e`,
	 * as well as, independently, the edge rings of both edges' left
	 * dual vertex. In each case, if the rings are separate, this
	 * operator will join them and if both rings are the same ring, they
	 * will be split / separated. Therefore, splice` is it's own reverse
	 * operator and the only operator needed to edit quad edge
	 * topologies.
	 *
	 * @param e -
	 */
	splice(e: Edge<T>): Edge<T> {
		const alpha = this.onext.rot;
		const beta = e.onext.rot;
		const t1 = e.onext;
		const t2 = this.onext;
		const t3 = beta.onext;
		const t4 = alpha.onext;
		this.onext = t1;
		e.onext = t2;
		alpha.onext = t3;
		beta.onext = t4;
		return this;
	}
}
