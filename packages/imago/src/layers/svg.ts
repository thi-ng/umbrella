import { readText } from "@thi.ng/file-io";
import type { CompLayerFn, SVGLayer } from "../api.js";
import { positionOrGravity } from "../units.js";
import { illegalArgs } from "@thi.ng/errors";

export const svgLayerImpl: CompLayerFn = async (layer, _, ctx) => {
	let {
		type: __,
		body,
		gravity,
		origin,
		path,
		pos,
		ref,
		unit,
		...opts
	} = <SVGLayer>layer;
	if (path) body = readText(path, ctx.logger);
	if (!body) illegalArgs("missing SVG doc");
	const w = +(/width="(\d+)"/.exec(body)?.[1] || 0);
	const h = +(/height="(\d+)"/.exec(body)?.[1] || 0);
	return {
		input: Buffer.from(body),
		...positionOrGravity([w, h], ctx.size, layer),
		...opts,
	};
};
