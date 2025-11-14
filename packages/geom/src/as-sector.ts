// SPDX-License-Identifier: Apache-2.0
import type { Attribs } from "./api.js";
import { copy } from "@thi.ng/vectors/copy";
import type { Arc } from "./api/arc.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { __copyAttribs } from "./internal/copy.js";

/**
 * Converts given arc into a closed path describing a sector (using the arc's
 * center point). If `attribs` are given they will be used instead of the arc's
 * attribs.
 *
 * @param arc
 * @param attribs
 */
export const asSector = (arc: Arc, attribs?: Attribs) =>
	new Path(
		[
			{ type: "m", point: copy(arc.pos) },
			{ type: "l", geo: new Line([copy(arc.pos), arc.pointAt(0)]) },
			{ type: "a", geo: arc },
			{ type: "l", geo: new Line([arc.pointAt(1), copy(arc.pos)]) },
			{ type: "z" },
		],
		[],
		attribs || __copyAttribs(arc.attribs)
	);
