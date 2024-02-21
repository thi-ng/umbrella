export const isArrayBufferLike = (x: any): x is ArrayBufferLike =>
	x instanceof ArrayBuffer || x instanceof SharedArrayBuffer;
