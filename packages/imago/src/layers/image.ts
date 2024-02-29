// thing:no-export
import sharp from "sharp";
import type { CompLayerFn, Dim, ImgLayer } from "../api.js";
import { computeSize, ensureSize, positionOrGravity } from "../units.js";

export const imageLayer: CompLayerFn = async (layer, _, ctx) => {
	const {
		type: __,
		gravity,
		path,
		pos,
		ref,
		size,
		unit,
		...opts
	} = <ImgLayer>layer;
	const input = sharp(path);
	const meta = await input.metadata();
	let imgSize: Dim = [meta.width!, meta.height!];
	if (size) imgSize = computeSize(size, imgSize, ref, unit);
	const $pos = positionOrGravity(pos, gravity, imgSize, ctx.size, ref, unit);
	if (!size) return { input: path, ...$pos, ...opts };
	ensureSize(meta);
	return {
		input: await input
			.resize(imgSize[0], imgSize[1], { fit: "fill" })
			.png({ compressionLevel: 0 })
			.toBuffer(),
		...$pos,
		...opts,
	};
};
