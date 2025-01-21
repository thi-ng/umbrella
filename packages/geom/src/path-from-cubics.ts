// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { eqDelta } from "@thi.ng/vectors/eqdelta";
import { equals } from "@thi.ng/vectors/equals";
import type { Attribs, IPath, PathConstructor } from "./api.js";
import type { Cubic } from "./api/cubic.js";
import type { Cubic3 } from "./api/cubic3.js";
import { Path } from "./api/path.js";
import { Path3 } from "./api/path3.js";

/**
 * Constructs a {@link Path} or {@link Path3} from given sequence of cubic
 * curves, with optional `attribs`.
 *
 * @remarks
 * If no `attribs` are given, those from the first curve will be used (if any).
 *
 * For each successive curve segment, if the start point of the current curve is
 * not the same as the last point of the previous curve, a new sub path will be
 * started.
 *
 * The path will automatically be closed if possible.
 *
 * Also see {@link normalizedPath}.
 *
 * @param cubics
 * @param attribs
 */
export function pathFromCubics(cubics: Cubic[], attribs?: Attribs): Path;
export function pathFromCubics(cubics: Cubic3[], attribs?: Attribs): Path3;
export function pathFromCubics(cubics: Cubic[] | Cubic3[], attribs?: Attribs) {
	return __pathFromCubics<any, any>(
		cubics[0].dim === 2 ? Path : Path3,
		cubics,
		attribs
	);
}

/** @internal */
const __pathFromCubics = <P extends IPath<any>, S extends P["segments"][0]>(
	ctor: PathConstructor<P, S>,
	cubics: S["geo"][],
	attribs?: Attribs
): P => {
	let subPaths: S[][] = [];
	let curr: S[];
	let lastP: Maybe<ReadonlyVec>;
	const $beginPath = (c: S["geo"]) => {
		curr = [<S>{ type: "m", point: c.points[0] }];
		subPaths.push(curr);
	};
	for (let c of cubics) {
		if (!(lastP && equals(lastP, c.points[0]))) $beginPath(c);
		curr!.push(<S>{ type: "c", geo: c });
		lastP = c.points[3];
	}
	const path = new ctor(
		subPaths[0],
		subPaths.slice(1),
		attribs || cubics[0].attribs
	);
	const segments = path.segments;
	if (
		segments.length > 1 &&
		eqDelta(segments[0].point!, peek((<S["geo"]>peek(segments).geo).points))
	) {
		path.close();
	}
	return <P>path;
};
