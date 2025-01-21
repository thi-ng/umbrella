// SPDX-License-Identifier: Apache-2.0
import { meldDeepObj } from "@thi.ng/object-utils";
import type { EXIFSpec, Processor } from "../api.js";

export const exifProc: Processor = async (spec, input, ctx) => {
	const { tags } = <EXIFSpec>spec;
	meldDeepObj(ctx.exif, tags);
	return [input, false];
};
