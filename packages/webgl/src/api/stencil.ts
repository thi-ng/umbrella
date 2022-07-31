import type { Tuple } from "@thi.ng/api";

export enum StencilOp {
	KEEP = 7680,
	ZERO = 0,
	REPLACE = 7681,
	INCR = 7682,
	INCR_WRAP = 34055,
	DECR = 7683,
	DECR_WRAP = 34056,
	INVERT = 5386,
}

export enum StencilFn {
	NEVER = 512,
	LESS = 513,
	EQUAL = 514,
	LEQUAL = 515,
	GREATER = 516,
	NOTEQUAL = 517,
	GEQUAL = 518,
	ALWAYS = 519,
}

export type StencilOpParams = Tuple<StencilOp, 3>;

export type StencilFnParams = [StencilFn, number, number];
