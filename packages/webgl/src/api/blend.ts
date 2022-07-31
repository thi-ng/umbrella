import type { Tuple } from "@thi.ng/api";

export enum Blend {
	ZERO = 0,
	ONE = 1,
	SRC_COLOR = 768,
	ONE_MINUS_SRC_COLOR = 769,
	DST_COLOR = 774,
	ONE_MINUS_DST_COLOR = 775,
	SRC_ALPHA = 770,
	ONE_MINUS_SRC_ALPHA = 771,
	DST_ALPHA = 772,
	ONE_MINUS_DST_ALPHA = 773,
	CONSTANT_COLOR = 32769,
	ONE_MINUS_CONSTANT_COLOR = 32770,
	CONSTANT_ALPHA = 32771,
	ONE_MINUS_CONSTANT_ALPHA = 32772,
	SRC_ALPHA_SATURATE = 776,
}

export enum BlendEquation {
	FUNC_ADD = 32774,
	FUNC_REVERSE_SUBTRACT = 32779,
	FUNC_SUBTRACT = 32778,
	MAX = 32776,
	MIN = 32775,
}

export type BlendFunc = Tuple<Blend, 2>;

// TODO blend func presets
// https://www.andersriggelsen.dk/glblendfunc.php

export const BLEND_NORMAL: BlendFunc = [
	Blend.SRC_ALPHA,
	Blend.ONE_MINUS_SRC_ALPHA,
];

export const BLEND_ADD: BlendFunc = [Blend.SRC_ALPHA, Blend.DST_ALPHA];
