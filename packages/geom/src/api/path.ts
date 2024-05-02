import type { IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { Attribs, IHiccupShape, PathSegment } from "@thi.ng/geom-api";
import { __copyAttribs, __copySegment } from "../internal/copy.js";

export class Path implements IClear, IHiccupShape {
	segments: PathSegment[];
	subPaths: PathSegment[][];
	closed = false;

	constructor(
		segments?: Iterable<PathSegment>,
		subPaths?: Iterable<PathSegment[]>,
		public attribs?: Attribs
	) {
		this.segments = segments ? ensureArray(segments) : [];
		this.subPaths = subPaths ? ensureArray(subPaths) : [];
		this.closed = this.subPaths.length > 0;
	}

	get type() {
		return "path";
	}

	*[Symbol.iterator]() {
		yield* this.segments;
	}

	clear() {
		this.segments.length = 0;
	}

	copy(): Path {
		const p = new Path(
			this.segments.map(__copySegment),
			this.subPaths.map((sub) => sub.map(__copySegment)),
			__copyAttribs(this)
		);
		p.closed = this.closed;
		return p;
	}

	withAttribs(attribs: Attribs): Path {
		const res = new Path(this.segments, this.subPaths, attribs);
		res.closed = this.closed;
		return res;
	}

	equiv(o: any) {
		return o instanceof Path && equiv(this.segments, o.segments);
	}

	isComplex() {
		return this.subPaths.length;
	}

	addSegments(...segments: PathSegment[]) {
		this.closed && illegalState("path already closed");
		this.segments.push(...segments);
		return this;
	}

	addSubPaths(...paths: PathSegment[][]) {
		this.subPaths.push(...paths);
		return this;
	}

	toHiccup() {
		const acc: any[] = [];
		const $hiccupSegments = (segments: PathSegment[]) => {
			for (let i = 0, n = segments.length; i < n; i++) {
				const s = segments[i];
				if (s.geo) {
					acc.push(...s.geo!.toHiccupPathSegments());
				} else if (s.point) {
					acc.push(["M", s.point]);
				}
			}
		};

		if (this.segments.length > 1) {
			$hiccupSegments(this.segments);
			this.closed && acc.push(["Z"]);
		}
		for (let p of this.subPaths) $hiccupSegments(p);
		return ["path", this.attribs || {}, acc];
	}
}
