import type { Fn2, FnN2, IObjectOf, NumericArray } from "@thi.ng/api";
import { clamp01 } from "@thi.ng/math/interval";
import { Lane, type FloatFormat, type FloatFormatSpec } from "../api.js";
import { __luminanceABGR } from "../internal/utils.js";

export const defFloatFormat = (fmt: FloatFormatSpec) => {
	const chan = fmt.channels;
	const chanShift = chan.reduce(
		(acc, ch) => ((acc[ch] = (3 - ch) << 3), acc),
		<IObjectOf<number>>{}
	);
	const res = <FloatFormat>{
		...fmt,
		__float: true,
		size: chan.length,
		shift: chanShift,
		range: [0, 1],
		getNormalized: (val) => clamp01(val),
	};
	if (fmt.convert) {
		Object.assign(res, fmt.convert);
		return res;
	}
	const to = (col: NumericArray, i: number) =>
		((clamp01(col[i]) * 0xff + 0.5) | 0) << chanShift[chan[i]];
	const from: FnN2 = (col, i) => ((col >>> chanShift[chan[i]]) & 0xff) / 0xff;
	switch (chan.length) {
		case 1:
			fmt.gray ? defConvert1Gray(res) : defConvert1(res, from, to);
			break;
		case 2:
			fmt.gray ? defConvert2Gray(res, from) : defConvert2(res, from, to);
			break;
		case 3:
			defConvert3(res, from, to);
			break;
		case 4:
			defConvert4(res, from, to);
			break;
	}
	return res;
};

const defConvert1 = (
	res: FloatFormat,
	from: FnN2,
	to: Fn2<NumericArray, number, number>
) => {
	res.toABGR = (col) => {
		let out = res.alpha ? 0 : 0xff000000;
		out |= to(col, 0);
		return out >>> 0;
	};
	res.fromABGR = (col, out = []) => {
		out[0] = from(col, 0);
		return out;
	};
};

const defConvert1Gray = (res: FloatFormat) => {
	res.toABGR = (col) =>
		((((clamp01(col[0]) * 0xff + 0.5) | 0) * 0x010101) | 0xff000000) >>> 0;
	res.fromABGR = (col, out = []) => (
		(out[0] = __luminanceABGR(col) / 0xff), out
	);
};

const defConvert2 = (
	res: FloatFormat,
	from: FnN2,
	to: Fn2<NumericArray, number, number>
) => {
	res.toABGR = (col) => {
		let out = res.alpha ? 0 : 0xff000000;
		out |= to(col, 0);
		out |= to(col, 1);
		return out >>> 0;
	};
	res.fromABGR = (col, out = []) => {
		out[0] = from(col, 0);
		out[1] = from(col, 1);
		return out;
	};
};

const defConvert2Gray = (res: FloatFormat, from: FnN2) => {
	const gray = ~~(res.channels[0] === Lane.ALPHA);
	const alpha = gray ^ 1;
	res.toABGR = (col) => {
		let out = ((clamp01(col[gray]) * 0xff + 0.5) | 0) * 0x010101;
		out |= ((col[alpha] * 0xff + 0.5) | 0) << 24;
		return out >>> 0;
	};
	res.fromABGR = (col, out = []) => {
		out[gray] = __luminanceABGR(col) / 0xff;
		out[alpha] = from(col, alpha);
		return out;
	};
};

const defConvert3 = (
	res: FloatFormat,
	from: FnN2,
	to: Fn2<NumericArray, number, number>
) => {
	res.toABGR = (col) => {
		let out = res.alpha ? 0 : 0xff000000;
		out |= to(col, 0);
		out |= to(col, 1);
		out |= to(col, 2);
		return out >>> 0;
	};
	res.fromABGR = (col, out = []) => {
		out[0] = from(col, 0);
		out[1] = from(col, 1);
		out[2] = from(col, 2);
		return out;
	};
};

const defConvert4 = (
	res: FloatFormat,
	from: FnN2,
	to: Fn2<NumericArray, number, number>
) => {
	res.toABGR = (col) => {
		let out = res.alpha ? 0 : 0xff000000;
		out |= to(col, 0);
		out |= to(col, 1);
		out |= to(col, 2);
		out |= to(col, 3);
		return out >>> 0;
	};
	res.fromABGR = (col, out = []) => {
		out[0] = from(col, 0);
		out[1] = from(col, 1);
		out[2] = from(col, 2);
		out[3] = from(col, 3);
		return out;
	};
};
