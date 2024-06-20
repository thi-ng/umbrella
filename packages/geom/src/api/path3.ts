import type { Fn, IClear, IEmpty } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { peek } from "@thi.ng/arrays/peek";
import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { flatten1 } from "@thi.ng/transducers/flatten1";
import type { Attribs, IHiccupShape3, IPath, PathSegment3 } from "../api.js";
import { __copyAttribs, __copySegment } from "../internal/copy.js";

export class Path3
	implements IClear, IEmpty<Path3>, IHiccupShape3<Path3>, IPath<PathSegment3>
{
	readonly type = "path3";
	readonly dim = 3;

	segments: PathSegment3[];
	subPaths: PathSegment3[][];

	constructor(
		segments?: Iterable<PathSegment3>,
		subPaths?: Iterable<PathSegment3[]>,
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
		yield* flatten1(this.subPaths);
	}

	clear() {
		this.segments.length = 0;
	}

	empty() {
		return new Path3();
	}

	close() {
		if (!this.closed) this.segments.push({ type: "z" });
		return this;
	}

	copy(): Path3 {
		return this.copyTransformed((segments) => segments.map(__copySegment));
	}

	copyTransformed(fn: Fn<PathSegment3[], PathSegment3[]>) {
		return new Path3(
			fn(this.segments),
			this.subPaths.map(fn),
			__copyAttribs(this.attribs)
		);
	}

	withAttribs(attribs: Attribs) {
		return new Path3(this.segments, this.subPaths, attribs);
	}

	equiv(o: any) {
		return (
			o instanceof Path3 &&
			equiv(this.segments, o.segments) &&
			equiv(this.subPaths, o.subPaths)
		);
	}

	isComplex() {
		return !!this.subPaths.length;
	}

	addSegments(...segments: PathSegment3[]) {
		for (let s of segments) {
			this.closed && illegalState("path already closed");
			this.segments.push(s);
		}
		return this;
	}

	addSubPaths(...paths: PathSegment3[][]) {
		this.subPaths.push(...paths);
		return this;
	}

	toHiccup() {
		const acc: any[] = [];
		const $hiccupSegments = (segments: PathSegment3[]) => {
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
		return ["path3", this.attribs || {}, acc];
	}
}
