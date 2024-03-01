import { illegalArgs } from "@thi.ng/errors";
import sharp from "sharp";
import type { CompLayerFn, Dim, ImgLayer } from "../api.js";
import { computeSize, ensureSize, positionOrGravity } from "../units.js";

export const imageLayerImpl: CompLayerFn = async (layer, _, ctx) => {
	const {
		type: __,
		buffer,
		gravity,
		path,
		pos,
		ref,
		size,
		unit,
		...opts
	} = <ImgLayer>layer;
	if (!(path || buffer)) illegalArgs("missing image source");
	const input = sharp(path || buffer);
	const meta = await input.metadata();
	let imgSize: Dim = [meta.width!, meta.height!];
	if (size) imgSize = computeSize(size, imgSize, ref, unit);
	const $pos = positionOrGravity(imgSize, ctx.size, layer);
	if (!size) return { input: path, ...$pos, ...opts };
	ensureSize(meta);
	const { data, info } = await input
		.resize(imgSize[0], imgSize[1], { fit: "fill" })
		.raw()
		.toBuffer({ resolveWithObject: true });
	return {
		input: data,
		raw: {
			width: info.width,
			height: info.height,
			channels: info.channels,
		},
		...$pos,
		...opts,
	};
};
