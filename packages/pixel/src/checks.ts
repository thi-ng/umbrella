import type { TypedArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { FloatFormat, IntFormat } from "./api.js";

/** @internal */
export const ensureSize = (
	data: TypedArray,
	width: number,
	height: number,
	stride = 1
) => assert(data.length >= width * height * stride, "pixel buffer too small");

/** @internal */
export const ensureChannel = (fmt: IntFormat | FloatFormat, id: number) => {
	const chan = fmt.channels[id];
	assert(chan != null, `invalid channel ID: ${id}`);
	return chan;
};

/** @internal */
export const ensureSingleChannel = (fmt: IntFormat | FloatFormat) =>
	assert(fmt.channels.length === 1, `require single channel buffer`);

/** @internal */
export const ensureAlpha = (fmt: IntFormat | FloatFormat) =>
	assert(!!fmt.alpha, "missing alpha channel");
