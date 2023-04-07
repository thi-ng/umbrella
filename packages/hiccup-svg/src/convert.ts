import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArray } from "@thi.ng/checks/is-array";
import { circle } from "./circle.js";
import { ellipse } from "./ellipse.js";
import { PRECISION, fattribs, setPrecision } from "./format.js";
import { linearGradient, radialGradient } from "./gradients.js";
import { image } from "./image.js";
import { hline, line, vline } from "./line.js";
import { path } from "./path.js";
import { packedPoints, points } from "./points.js";
import { polygon } from "./polygon.js";
import { polyline } from "./polyline.js";
import { roundedRect } from "./rect.js";
import { text } from "./text.js";

const ATTRIB_ALIASES: Record<string, string> = {
	alpha: "opacity",
	dash: "stroke-dasharray",
	dashOffset: "stroke-dashoffset",
	lineCap: "stroke-linecap",
	lineJoin: "stroke-linejoin",
	miterLimit: "stroke-miterlimit",
	weight: "stroke-width",
};

const TEXT_ALIGN: Record<string, string> = {
	left: "start",
	right: "end",
	center: "middle",
	start: "start",
	end: "end",
};

const BASE_LINE: Record<string, string> = {
	top: "text-top",
	bottom: "text-bottom",
};

const precisionStack: number[] = [];

/**
 * Takes a normalized hiccup tree of [`thi.ng/geom`](https://thi.ng/geom) and/or
 * [thi.ng/hdom-canvas](https://thi.ng/hdom-canvas) shape definitions and
 * recursively converts it into an hiccup flavor which is compatible for direct
 * SVG serialization. This conversion also involves translation, stringification
 * & reorg of various attributes. The function returns new tree. The original
 * remains untouched, as will any unrecognized tree/shape nodes.
 *
 * @remarks
 * The `__prec` control attribute can be used (on a per-shape basis) to control
 * the formatting used for various floating point values (except color
 * conversions). See {@link setPrecision}. Child shapes (of a group) inherit the
 * precision setting of their parent.
 *
 * To control the formatting precision for colors, use [the relevant function in
 * the thi.ng/color
 * package](https://docs.thi.ng/umbrella/color/functions/setPrecision.html).
 *
 * @param tree - shape tree
 */
export const convertTree = (tree: any): any[] | null => {
	if (tree == null) return null;
	if (implementsFunction(tree, "toHiccup")) {
		return convertTree(tree.toHiccup());
	}
	const type = tree[0];
	if (isArray(type)) {
		return tree.map(convertTree);
	}
	let attribs = convertAttribs(tree[1]);
	if (attribs.__prec) {
		precisionStack.push(PRECISION);
		setPrecision(attribs.__prec);
	}
	let result: any[];
	switch (tree[0]) {
		case "svg":
		case "defs":
		case "a":
		case "g":
			result = [type, fattribs(attribs)];
			for (let i = 2, n = tree.length; i < n; i++) {
				const c = convertTree(tree[i]);
				c != null && result.push(c);
			}
			break;
		case "linearGradient":
			result = linearGradient(
				attribs.id,
				attribs.from,
				attribs.to,
				tree[2],
				{
					gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
					...(attribs.gradientTransform
						? { gradientTransform: attribs.gradientTransform }
						: null),
				}
			);
			break;
		case "radialGradient":
			result = radialGradient(
				attribs.id,
				attribs.from,
				attribs.to,
				attribs.r1,
				attribs.r2,
				tree[2],
				{
					gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
					...(attribs.gradientTransform
						? { gradientTransform: attribs.gradientTransform }
						: null),
				}
			);
			break;
		case "circle":
			result = circle(tree[2], tree[3], attribs, ...tree.slice(4));
			break;
		case "ellipse":
			result = ellipse(
				tree[2],
				tree[3][0],
				tree[3][1],
				attribs,
				...tree.slice(4)
			);
			break;
		case "rect": {
			const r = tree[5] || 0;
			result = roundedRect(
				tree[2],
				tree[3],
				tree[4],
				r,
				r,
				attribs,
				...tree.slice(6)
			);
			break;
		}
		case "line":
			result = line(tree[2], tree[3], attribs, ...tree.slice(4));
			break;
		case "hline":
			result = hline(tree[2], attribs);
			break;
		case "vline":
			result = vline(tree[2], attribs);
			break;
		case "polyline":
			result = polyline(tree[2], attribs, ...tree.slice(3));
			break;
		case "polygon":
			result = polygon(tree[2], attribs, ...tree.slice(3));
			break;
		case "path":
			result = path(tree[2], attribs, ...tree.slice(3));
			break;
		case "text":
			result = text(tree[2], tree[3], attribs, ...tree.slice(4));
			break;
		case "img":
			result = image(tree[3], tree[2].src, attribs, ...tree.slice(4));
			break;
		case "points":
			result = points(
				tree[2],
				attribs.shape,
				attribs.size,
				attribs,
				...tree.slice(3)
			);
			break;
		case "packedPoints":
			result = packedPoints(
				tree[2],
				attribs.shape,
				attribs.size,
				attribs,
				...tree.slice(3)
			);
			break;
		default:
			result = tree;
	}
	if (attribs.__prec) {
		setPrecision(precisionStack.pop()!);
	}
	return result;
};

const convertAttribs = (attribs: any) => {
	const res: any = {};
	if (!attribs) return res;
	// convertTransforms(res, attribs);
	for (let id in attribs) {
		const v = attribs[id];
		const aid = ATTRIB_ALIASES[id];
		if (aid) {
			res[aid] = v;
		} else {
			convertAttrib(res, id, v);
		}
	}
	return res;
};

const convertAttrib = (res: any, id: string, v: any) => {
	switch (id) {
		case "font": {
			const i = v.indexOf(" ");
			res["font-size"] = v.substring(0, i);
			res["font-family"] = v.substring(i + 1);
			break;
		}
		case "align":
			res["text-anchor"] = TEXT_ALIGN[v];
			break;
		case "baseline":
			res["dominant-baseline"] = BASE_LINE[v] || v;
			break;
		// case "filter":
		// TODO needs to be translated into <filter> def first
		// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
		// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
		// break;
		default:
			res[id] = v;
	}
};
