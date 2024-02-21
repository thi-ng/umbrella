import { isArrayBufferLike } from "./is-arraybufferlike.js";
import { isNumber } from "./is-number.js";

export const isArrayBufferView = (x: any): x is ArrayBufferView =>
	x != null &&
	isArrayBufferLike(x.buffer) &&
	isNumber(x.byteOffset) &&
	isNumber(x.byteLength);
