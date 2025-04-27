import { isNumber } from "@thi.ng/checks/is-number";
import type { Stringer } from "@thi.ng/strings";
import { floatFixedWidth } from "@thi.ng/strings/float";
import { padLeft } from "@thi.ng/strings/pad-left";
import { truncate } from "@thi.ng/strings/truncate";
import { dot } from "@thi.ng/vectors/dot";
import type { ITensor } from "./api.js";

let formatNumber: Stringer<number>;
let pad: Stringer<string>;
let trunc: Stringer<string>;

export const format = (x: any) =>
	isNumber(x) ? formatNumber(x) : trunc(pad(x.toString()));

export const setFormat = (width: number, prec: number) => {
	formatNumber = floatFixedWidth(width, prec);
	pad = padLeft(width);
	trunc = truncate(width);
};

setFormat(9, 4);

export const print = ({ data, shape, stride, offset }: ITensor<any>) => {
	let dim = shape.length;
	const state = new Array(dim).fill(0);
	dim--;
	while (true) {
		const idx = dot(state, stride) + offset;
		console.log(state, idx, data[idx]);
		if (++state[dim] >= shape[dim]) {
			for (; dim-- > 0; ) if (++state[dim] < shape[dim]) break;
			if (state[0] >= shape[0]) return;
			state.fill(0, dim + 1);
			dim = shape.length - 1;
		}
	}
};
