import type { Maybe } from "@thi.ng/api";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { equals } from "@thi.ng/vectors/equals";
import type {
	Attribs,
	PathSegment2,
	PathSegment3,
	SegmentType2,
} from "../api.js";
import type { Cubic } from "../api/cubic.js";
import type { Cubic3 } from "../api/cubic3.js";
import type { Path } from "../api/path.js";
import type { Path3 } from "../api/path3.js";
import { asCubic } from "../as-cubic.js";
import { __copySegment } from "./copy.js";
import { peek } from "@thi.ng/arrays/peek";

interface PathType {
	2: { path: Path; ctor: typeof Path; cubic: Cubic; seg: PathSegment2 };
	3: { path: Path3; ctor: typeof Path3; cubic: Cubic3; seg: PathSegment3 };
}

export const __pathFromCubics = <T extends 2 | 3>(
	ctor: PathType[T]["ctor"],
	cubics: PathType[T]["cubic"][],
	attribs?: Attribs
): PathType[T]["path"] => {
	let subPaths: PathType[T]["seg"][][] = [];
	let curr: PathType[T]["seg"][];
	let lastP: Maybe<ReadonlyVec>;
	const $beginPath = (c: PathType[T]["cubic"]) => {
		curr = [{ type: "m", point: c.points[0] }];
		subPaths.push(curr);
	};
	for (let c of cubics) {
		if (!(lastP && equals(lastP, c.points[0]))) $beginPath(c);
		curr!.push(<PathType[T]["seg"]>{ type: "c", geo: c });
		lastP = c.points[3];
	}
	const path = new ctor(
		<any>subPaths[0],
		<any>subPaths.slice(1),
		attribs || cubics[0].attribs
	);
	const segments: PathType[T]["seg"][] = path.segments;
	if (
		segments.length > 1 &&
		equals(
			segments[0].point!,
			peek((<PathType[T]["cubic"]>peek(segments).geo).points)
		)
	) {
		path.close();
	}
	return path;
};

export const __normalizedPath = <T extends 2 | 3>(
	ctor: PathType[T]["ctor"],
	path: PathType[T]["path"],
	only?: SegmentType2[]
): PathType[T]["path"] => {
	const $normalize = (segments: PathType[T]["seg"][]) => [
		...mapcat((s) => {
			if (s.geo && (!only || only.includes(<any>s.type))) {
				return map<PathType[T]["cubic"], PathType[T]["seg"]>(
					(c) => <PathType[T]["seg"]>{ type: "c", geo: c },
					asCubic(s.geo)
				);
			}
			return [__copySegment(s)];
		}, segments),
	];
	return new ctor(
		<any>$normalize(path.segments),
		<any>path.subPaths.map($normalize),
		path.attribs
	);
};
