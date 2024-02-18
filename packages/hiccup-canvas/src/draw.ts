import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArray } from "@thi.ng/checks/is-array";
import type { DrawState } from "./api.js";
import { circularArc, ellipticArc } from "./arc.js";
import { defLinearGradient, defRadialGradient } from "./color.js";
import { image } from "./image.js";
import {
	__mergeState,
	__registerGradient,
	__restoreState,
} from "./internal/state.js";
import { line, lines } from "./line.js";
import { packedLines } from "./packed-lines.js";
import { packedPoints } from "./packed-points.js";
import { path } from "./path.js";
import { points } from "./points.js";
import { packedPolygon, polygon } from "./polygon.js";
import { packedPolyline, polyline } from "./polyline.js";
import { rect } from "./rect.js";
import { text } from "./text.js";

export const draw = (
	ctx: CanvasRenderingContext2D,
	shape: any,
	pstate: DrawState = { attribs: {}, edits: [] }
) => {
	if (!shape) return;
	if (implementsFunction(shape, "toHiccup")) {
		draw(ctx, shape.toHiccup(), pstate);
		return;
	}
	if (isArray(shape[0])) {
		for (let s of shape) {
			draw(ctx, s, pstate);
		}
		return;
	}
	const origAttribs = shape[1];
	if (origAttribs?.__skip) return;
	const state = __mergeState(ctx, pstate, origAttribs);
	const attribs = state ? state.attribs : pstate.attribs;
	switch (shape[0]) {
		case "g":
		case "defs":
			defs(ctx, state, pstate, shape);
			break;
		case "linearGradient":
			__registerGradient(
				pstate,
				origAttribs.id,
				defLinearGradient(ctx, origAttribs, shape[2])
			);
			break;
		case "radialGradient":
			__registerGradient(
				pstate,
				origAttribs.id,
				defRadialGradient(ctx, origAttribs, shape[2])
			);
			break;
		case "points":
			points(ctx, attribs, origAttribs, shape[2]);
			break;
		case "packedPoints":
			packedPoints(ctx, attribs, origAttribs, shape[2]);
			break;
		case "line":
			line(ctx, attribs, shape[2], shape[3]);
			break;
		case "lines":
			lines(ctx, attribs, shape[2]);
			break;
		case "packedLines":
			packedLines(ctx, attribs, origAttribs, shape[2]);
			break;
		case "hline":
			line(ctx, attribs, [-1e6, shape[2]], [1e6, shape[2]]);
			break;
		case "vline":
			line(ctx, attribs, [shape[2], -1e6], [shape[2], 1e6]);
			break;
		case "polyline":
			polyline(ctx, attribs, shape[2]);
			break;
		case "packedPolyline":
			packedPolyline(ctx, attribs, shape[2]);
			break;
		case "polygon":
			polygon(ctx, attribs, shape[2]);
			break;
		case "packedPolygon":
			packedPolygon(ctx, attribs, shape[2]);
			break;
		case "path":
			path(ctx, attribs, shape[2]);
			break;
		case "rect":
			rect(
				ctx,
				attribs,
				shape[2],
				shape[3],
				shape[4],
				// support rounded rects via `r` attrib
				shape[5] ?? origAttribs?.r
			);
			break;
		case "circle":
			// FIXME need better handling / clarity around arcs & ellipse
			// see issues #69 & #418
			circularArc(ctx, attribs, shape[2], shape[3]);
			break;
		case "ellipse":
			// FIXME need better handling / clarity around arcs & ellipse
			// see issues #69 & #418
			ellipticArc(
				ctx,
				attribs,
				shape[2],
				shape[3],
				shape[4],
				shape[5],
				shape[6],
				shape[7]
			);
			break;
		case "arc":
			// FIXME need new type ID for circular arcs
			// see issues #69 & #418
			circularArc(
				ctx,
				attribs,
				shape[2],
				shape[3],
				shape[4],
				shape[5],
				shape[6]
			);
			break;
		case "text":
			text(ctx, attribs, shape[2], shape[3], shape[4]);
			break;
		case "img":
			image(
				ctx,
				attribs,
				origAttribs,
				shape[2],
				shape[3],
				shape[4],
				shape[5]
			);
		default:
	}
	state && __restoreState(ctx, pstate, state);
};

const defs = (
	ctx: CanvasRenderingContext2D,
	state: DrawState | undefined,
	pstate: DrawState,
	shape: any[]
) => {
	const n = shape.length;
	const __state = shape[0] === "g" ? state || pstate : pstate;
	for (let i = 2; i < n; i++) {
		draw(ctx, shape[i], __state);
	}
};
