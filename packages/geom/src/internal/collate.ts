import type { NumericArray } from "@thi.ng/api";
import type { StridedVec } from "@thi.ng/vectors";

export interface CollateOpts {
	buf: NumericArray;
	start: number;
	cstride: number;
	estride: number;
}

export const __remapBuffer = (
	buf: NumericArray,
	pts: StridedVec[],
	start: number,
	cstride: number,
	estride: number
) => {
	for (let i = pts.length; i-- > 0; ) {
		const p = pts[i];
		p.buf = buf;
		p.offset = start + i * estride;
		p.stride = cstride;
	}
	return buf;
};

export const __collateWith = (
	fn: (
		buf: NumericArray,
		src: Iterable<Readonly<StridedVec>>,
		start: number,
		cstride: number,
		estride: number
	) => NumericArray,
	pts: StridedVec[],
	opts: Partial<CollateOpts>,
	stride: number
) => {
	opts = {
		start: 0,
		cstride: 1,
		estride: stride,
		...opts,
	};
	const { start, cstride, estride } = opts;
	return __remapBuffer(
		fn(
			opts.buf || new Array(start! + pts.length * estride!).fill(0),
			pts,
			start!,
			cstride!,
			estride!
		),
		pts,
		start!,
		cstride!,
		estride!
	);
};
