import type { Sharp } from "sharp";
import type { NestSpec, Processor } from "../api.js";
import { processImage } from "../proc.js";

export const nestProc: Processor = async (spec, input, ctx) => {
	const { procs } = <NestSpec>spec;
	ctx.logger.debug("--- nest start ---");
	await Promise.all(
		procs.map((p) => processImage(input.clone(), p, ctx.opts, ctx))
	);
	ctx.logger.debug("--- nest end ---");
	return <[Sharp, boolean]>[input, false];
};
