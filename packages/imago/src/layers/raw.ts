import type { CompLayerFn, RawLayer } from "../api.js";
import { positionOrGravity } from "../units.js";

export const rawLayerImpl: CompLayerFn = async (layer, _, ctx) => {
	const {
		type: __,
		buffer,
		channels,
		gravity,
		pos,
		ref,
		size,
		unit,
		...opts
	} = <RawLayer>layer;
	const $pos = positionOrGravity(size, ctx.size, layer);
	return {
		input: Buffer.from(buffer.buffer),
		raw: {
			width: size[0],
			height: size[1],
			channels,
		},
		...$pos,
		...opts,
	};
};
