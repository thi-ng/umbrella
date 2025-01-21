// SPDX-License-Identifier: Apache-2.0
import type { Always } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import { unsupported } from "@thi.ng/errors/unsupported";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { copy } from "@thi.ng/vectors/copy";
import { eqDelta as eqDeltaV } from "@thi.ng/vectors/eqdelta";
import { mulN } from "@thi.ng/vectors/muln";
import { set } from "@thi.ng/vectors/set";
import { zeroes } from "@thi.ng/vectors/setn";
import { sub } from "@thi.ng/vectors/sub";
import type {
	Attribs,
	IPath,
	PCLike,
	PCLikeConstructor,
	PathConstructor,
	PathSegment,
	PathSegment2,
	PathSegment3,
} from "./api.js";
import { Cubic } from "./api/cubic.js";
import { Cubic3 } from "./api/cubic3.js";
import { Line } from "./api/line.js";
import { Line3 } from "./api/line3.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import { Quadratic } from "./api/quadratic.js";
import { Quadratic3 } from "./api/quadratic3.js";
import { arcFrom2Points } from "./arc.js";

/** @internal */
type PathGeoConstructor<S extends PathSegment> = PCLikeConstructor<
	Always<S["geo"]> & PCLike
>;

/** @internal */
type PathBuilderTypes<P extends IPath<any>, S extends P["segments"][0]> = {
	path: PathConstructor<P, S>;
	a?: typeof arcFrom2Points;
	c: PathGeoConstructor<S>;
	l: PathGeoConstructor<S>;
	q: PathGeoConstructor<S>;
};

/** @internal */
const P2D: PathBuilderTypes<Path, PathSegment2> = {
	path: Path,
	a: arcFrom2Points,
	c: Cubic,
	l: Line,
	q: Quadratic,
};

/** @internal */
const P3D: PathBuilderTypes<Path3, PathSegment3> = {
	path: Path3,
	c: Cubic3,
	l: Line3,
	q: Quadratic3,
};

export interface PathBuilderOpts {
	/**
	 * If true (default), "move" commands will start a new path and
	 * {@link PathBuilder} might produce multiple {@link Path}s. In general,
	 * it's NOT recommended to disable this behavior since various path related
	 * operations will not function properly anymore. However, there're some use
	 * cases where auto-splitting is undesirable and this option primarily
	 * exists for those.
	 */
	autoSplit: boolean;
}

/**
 * Generic 2D/3D path builder. Use {@link pathBuilder} or {@link pathBuilder3}
 * to instantiate.
 */
export class PathBuilder<P extends IPath<any>, S extends P["segments"][0]> {
	/**
	 * Array of all paths which have been built already (incl. the current)
	 */
	paths: P[];

	protected curr!: P;
	protected currP!: Vec;
	protected bezierP!: Vec;
	protected startP!: Vec;

	constructor(
		protected ctors: PathBuilderTypes<P, S>,
		public attribs?: Attribs,
		public opts: Partial<PathBuilderOpts> = {}
	) {
		this.paths = [];
		this.attribs = attribs;
		this.newPath();
	}

	*[Symbol.iterator]() {
		yield* this.paths;
	}

	/**
	 * Returns the current path being constructed.
	 */
	current() {
		return this.curr;
	}

	/**
	 * Starts a new path and makes it the current one. Any future build commands
	 * will only act on this new path.
	 */
	newPath() {
		this.curr = new this.ctors.path(
			[],
			[],
			this.attribs ? { ...this.attribs } : undefined
		);
		this.paths.push(this.curr);
		const dim = this.curr.dim;
		this.currP = zeroes(dim);
		this.bezierP = zeroes(dim);
		this.startP = zeroes(dim);
	}

	moveTo(p: Vec, relative = false) {
		if (this.opts.autoSplit !== false && this.curr.segments.length > 0) {
			this.curr = new this.ctors.path([], [], this.attribs);
			this.paths.push(this.curr);
		}
		p = this.updateCurrent(p, relative);
		set(this.startP, p);
		set(this.bezierP, p);
		this.curr.addSegments(<S>{
			type: "m",
			point: p,
		});
		return this;
	}

	lineTo(p: Vec, relative = false) {
		this.curr.addSegments({
			type: "l",
			geo: new this.ctors.l([
				copy(this.currP),
				this.updateCurrent(p, relative),
			]),
		});
		set(this.bezierP, this.currP);
		return this;
	}

	hlineTo(x: number, relative = false) {
		this.addHVLine(x, 0, relative);
		return this;
	}

	vlineTo(y: number, relative = false) {
		this.addHVLine(y, 1, relative);
		return this;
	}

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
	cubicTo(cp1: Vec, cp2: Vec, p: Vec, relative = false) {
		this.addCubic(this.absPoint(cp1, relative), cp2, p, relative);
		return this;
	}

	// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Quadratic_B%C3%A9zier_Curve
	quadraticTo(cp: Vec, p: Vec, relative = false) {
		this.addQuadratic(this.absPoint(cp, relative), p, relative);
		return this;
	}

	cubicChainTo(cp2: Vec, p: Vec, relative = false) {
		const prevMode = peek(this.curr.segments).type;
		const c1 = copy(this.currP);
		prevMode === "c" && add(null, sub([], c1, this.bezierP), c1);
		this.addCubic(c1, cp2, p, relative);
		return this;
	}

	quadraticChainTo(p: Vec, relative = false) {
		const prevMode = peek(this.curr.segments).type;
		const c1 = copy(this.currP);
		prevMode === "q" && sub(null, mulN(null, c1, 2), this.bezierP);
		this.addQuadratic(c1, p, relative);
		return this;
	}

	arcTo(
		p: Vec,
		r: Vec,
		xaxis: number,
		xl: boolean,
		clockwise: boolean,
		relative = false
	) {
		if (!this.ctors.a) unsupported("arcs");
		if (eqDelta(r[0], 0) || eqDelta(r[1], 0)) {
			return this.lineTo(p, relative);
		}
		const prev = copy(this.currP);
		this.curr.addSegments({
			type: "a",
			geo: this.ctors.a(
				prev,
				this.updateCurrent(p, relative),
				r,
				xaxis,
				xl,
				clockwise
			),
		});
		set(this.bezierP, this.currP);
		return this;
	}

	close() {
		if (!eqDeltaV(this.startP, this.currP)) {
			this.curr.addSegments({
				type: "l",
				geo: new this.ctors.l([copy(this.currP), copy(this.startP)]),
			});
		}
		this.curr.close();
		return this;
	}

	protected updateCurrent(p: Vec, relative: boolean) {
		p = copy(relative ? add(null, this.currP, p) : set(this.currP, p));
		return p;
	}

	protected absPoint(p: Vec, relative: boolean) {
		return relative ? add(null, p, this.currP) : p;
	}

	protected addHVLine(p: number, i: number, relative: boolean) {
		const prev = copy(this.currP);
		this.currP[i] = relative ? this.currP[i] + p : p;
		set(this.bezierP, this.currP);
		this.curr.addSegments({
			type: "l",
			geo: new this.ctors.l([prev, copy(this.currP)]),
		});
	}

	protected addCubic(cp1: Vec, cp2: Vec, p: Vec, relative: boolean) {
		cp2 = this.absPoint(cp2, relative);
		set(this.bezierP, cp2);
		this.curr.addSegments({
			type: "c",
			geo: new this.ctors.c([
				copy(this.currP),
				cp1,
				cp2,
				this.updateCurrent(p, relative),
			]),
		});
	}

	protected addQuadratic(cp: Vec, p: Vec, relative: boolean) {
		set(this.bezierP, cp);
		this.curr.addSegments({
			type: "q",
			geo: new this.ctors.q([
				copy(this.currP),
				cp,
				this.updateCurrent(p, relative),
			]),
		});
	}
}

/**
 * Creates a new {@link PathBuilder} instance to construct a path step-by-step
 * via a fluent builder API to append various segments and/or sub-paths.
 *
 * @remarks
 * Also see {@link pathFromSvg} and {@link roundedRect}.
 *
 * @param attribs
 * @param opts
 */
export const pathBuilder = (
	attribs?: Attribs,
	opts?: Partial<PathBuilderOpts>
) => new PathBuilder(P2D, attribs, opts);

/**
 * Like {@link pathBuilder}, but for constructing 3D paths ({@link Path3}).
 *
 * @remarks
 * Does **not** support arc segments, but all other segment types.
 *
 * @param attribs
 * @param opts
 */
export const pathBuilder3 = (
	attribs?: Attribs,
	opts?: Partial<PathBuilderOpts>
) => new PathBuilder(P3D, attribs, opts);
