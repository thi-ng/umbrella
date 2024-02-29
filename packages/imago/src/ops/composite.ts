import { defmulti } from "@thi.ng/defmulti";
import type { OverlayOptions, Sharp } from "sharp";
import type { CompLayerBase, CompSpec, ImgProcCtx, Processor } from "../api.js";
import { colorLayerImpl } from "../layers/color.js";
import { imageLayerImpl } from "../layers/image.js";
import { svgLayerImpl } from "../layers/svg.js";
import { textLayerImpl } from "../layers/text.js";

export const compositeProc: Processor = async (spec, input, ctx) => {
	const { layers } = <CompSpec>spec;
	const layerSpecs = await Promise.all<OverlayOptions>(
		layers.map((l) => defLayer(l, input, ctx))
	);
	ctx.logger.debug("layer specs", layerSpecs);
	return [input.composite(layerSpecs), true];
};

export const defLayer = defmulti<
	CompLayerBase,
	Sharp,
	ImgProcCtx,
	Promise<OverlayOptions>
>(
	(x) => x.type,
	{},
	{
		color: colorLayerImpl,
		img: imageLayerImpl,
		svg: svgLayerImpl,
		text: textLayerImpl,
	}
);
