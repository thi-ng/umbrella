// thing:no-export
import { meldDeepObj } from "@thi.ng/associative";
import type { EXIFSpec, Processor } from "../api.js";

export const exifProc: Processor = async (spec, input, ctx) => {
	const { tags } = <EXIFSpec>spec;
	meldDeepObj(ctx.exif, tags);
	return [input, false];
	// return [input.withExif(tags), false];
};
