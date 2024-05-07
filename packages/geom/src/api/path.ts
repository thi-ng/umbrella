import type { IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { peek } from "@thi.ng/arrays/peek";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { Attribs, IHiccupShape, PathSegment } from "@thi.ng/geom-api";
import { __copyAttribs, __copySegment } from "../internal/copy.js";

const CLOSE: PathSegment = Object.freeze({ type: "z" });

export class Path implements IClear, IHiccupShape {
	segments: PathSegment[];
	subPaths: PathSegment[][];

	constructor(
		segments?: Iterable<PathSegment>,
		subPaths?: Iterable<PathSegment[]>,
		public attribs?: Attribs
	) {
		this.segments = segments ? ensureArray(segments) : [];
		this.subPaths = subPaths ? ensureArray(subPaths) : [];
	}

	get type() {
		return "path";
	}

	get closed() {
		return peek(this.segments)?.type === "z";
	}

	*[Symbol.iterator]() {
		yield* this.segments;
	}

	clear() {
		this.segments.length = 0;
	}

	close() {
		if (!this.closed) this.segments.push(CLOSE);
		return this;
	}

	copy(): Path {
		const p = new Path(
			this.segments.map(__copySegment),
			this.subPaths.map((sub) => sub.map(__copySegment)),
			__copyAttribs(this)
		);
		return p;
	}

	withAttribs(attribs: Attribs): Path {
		return new Path(this.segments, this.subPaths, attribs);
	}

	equiv(o: any) {
		return o instanceof Path && equiv(this.segments, o.segments);
	}

	isComplex() {
		return this.subPaths.length;
	}

	addSegments(...segments: PathSegment[]) {
		for (let s of segments) {
			this.closed && illegalState("path already closed");
			this.segments.push(s);
		}
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
				} else {
					acc.push([s.type]);
				}
			}
		};

		if (this.segments.length > 1) {
			$hiccupSegments(this.segments);
		}
		for (let p of this.subPaths) $hiccupSegments(p);
		return ["path", this.attribs || {}, acc];
	}
}
