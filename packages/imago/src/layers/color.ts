import type { ColorLayer, CompLayerFn } from "../api.js";
import { coerceColor, computeSize, positionOrGravity } from "../units.js";

export const colorLayerImpl: CompLayerFn = async (layer, _, ctx) => {
	const {
		type: __,
		bg,
		gravity,
		path,
		pos,
		ref,
		size,
		unit,
		...opts
	} = <ColorLayer>layer;
	const layerSize = size ? computeSize(size, ctx.size, ref, unit) : ctx.size;
	const $pos = positionOrGravity(layerSize, ctx.size, layer);
	return {
		input: {
			create: {
				width: layerSize[0],
				height: layerSize[1],
				channels: 4,
				background: coerceColor(bg),
			},
		},
		...$pos,
		...opts,
	};
};
