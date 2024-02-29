// thing:no-export
import { readText } from "@thi.ng/file-io";
import type { CompLayerFn, SVGLayer } from "../api.js";
import { positionOrGravity } from "../units.js";

export const svgLayer: CompLayerFn = async (layer, _, ctx) => {
	let {
		type: __,
		body,
		gravity,
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
		...positionOrGravity(pos, gravity, [w, h], ctx.size, ref, unit),
		...opts,
	};
};
