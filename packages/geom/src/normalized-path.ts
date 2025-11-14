// SPDX-License-Identifier: Apache-2.0
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type {
	ICopyTransformed,
	IPath,
	SegmentType2,
	SegmentType3,
} from "./api.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";
import { asCubic } from "./as-cubic.js";
import { __copySegment } from "./internal/copy.js";

/**
 * Converts given path into a new one with segments converted to {@link Cubic}
 * (or {@link Cubic3} for 3D paths) bezier segments. Unless specific segment
 * types are specified via `only`, by default all segments will be converted.
 *
 * @remarks
 * Also see {@link pathFromCubics}.
 *
 * @param path
 * @param only
 */
export function normalizedPath(
	path: Path,
	only?: Extract<SegmentType2, "a" | "l" | "p" | "q">[]
): Path;
export function normalizedPath(path: Path3, only?: SegmentType3[]): Path3;
export function normalizedPath(path: Path | Path3, only?: any[]) {
	return __normalizedPath<any, any>(path, only);
}

/** @internal */
const __normalizedPath = <
	P extends IPath<any> & ICopyTransformed<S[]>,
	S extends P["segments"][0]
>(
	path: P,
	only?: string[]
): P => {
	const $normalize = (segments: S[]) => [
		...mapcat((s) => {
			if (s.geo && (!only || only.includes(<any>s.type))) {
				return map((c) => <S>{ type: "c", geo: c }, asCubic(s.geo));
			}
			return [__copySegment(s)];
		}, segments),
	];
	return path.copyTransformed($normalize);
};
