import type { Fn, IClear } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { peek } from "@thi.ng/arrays/peek";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { Attribs, IHiccupShape2, PathSegment2 } from "../api.js";
import { __copyAttribs, __copySegment } from "../internal/copy.js";

export class Path implements IClear, IHiccupShape2<Path> {
	readonly type = "path";
	readonly dim = 2;

	segments: PathSegment2[];
	subPaths: PathSegment2[][];

	constructor(
		segments?: Iterable<PathSegment2>,
		subPaths?: Iterable<PathSegment2[]>,
		public attribs?: Attribs
	) {
		this.segments = segments ? ensureArray(segments) : [];
		this.subPaths = subPaths ? ensureArray(subPaths) : [];
	}

	/**
	 * Returns true, if the last main segment is a closing segment, e.g. if the
	 * path represents a closed shape.
	 */
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
		if (!this.closed) this.segments.push({ type: "z" });
		return this;
	}

	copy(): Path {
		return this.copyTransformed((segments) => segments.map(__copySegment));
	}

	copyTransformed(fn: Fn<PathSegment2[], PathSegment2[]>) {
		return new Path(
			fn(this.segments),
			this.subPaths.map(fn),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Path(this.segments, this.subPaths, attribs);
	}

	equiv(o: any) {
		return (
			o instanceof Path &&
			equiv(this.segments, o.segments) &&
			equiv(this.subPaths, o.subPaths)
		);
	}

	isComplex() {
		return this.subPaths.length;
	}

	addSegments(...segments: PathSegment2[]) {
		for (let s of segments) {
			this.closed && illegalState("path already closed");
			this.segments.push(s);
		}
		return this;
	}

	addSubPaths(...paths: PathSegment2[][]) {
		this.subPaths.push(...paths);
		return this;
	}

	toHiccup() {
		const acc: any[] = [];
		const $hiccupSegments = (segments: PathSegment2[]) => {
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
