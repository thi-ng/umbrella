import { readText } from "@thi.ng/file-io";
import type { CompLayerFn, SVGLayer } from "../api.js";
import { positionOrGravity } from "../units.js";

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
	const w = +(/width="(\d+)"/.exec(body)?.[1] || 0);
	const h = +(/height="(\d+)"/.exec(body)?.[1] || 0);
	return {
		input: Buffer.from(body),
		...positionOrGravity([w, h], ctx.size, layer),
		...opts,
	};
};
