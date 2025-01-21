// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IsGrayFn, ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

/** @internal */
const __isWhiteHsv = (x: ReadonlyColor, eps = EPS) =>
	x[1] <= eps && x[2] >= 1 - eps;

/** @internal */
const __isWhiteRgb = (x: ReadonlyColor, eps = EPS) => {
	eps = 1 - eps;
	return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};

/** @internal */
const __isWhiteLch = (x: ReadonlyColor, eps = EPS) =>
	x[1] <= eps && x[0] >= 1 - eps;

export const isWhite: IsGrayFn = defmulti<
	TypedColor<any>,
	Maybe<number>,
	boolean
>(
	__dispatch0,
	{
		hsl: "hsv",
		hsi: "hsv",
		labD50: "lch",
		labD65: "lch",
		srgb: "rgb",
		ycc: "lch",
	},
	{
		[DEFAULT]: (x: any) => __isWhiteRgb(rgb(x)),
		hcy: (x, eps = EPS) => x[1] <= eps && x[2] >= 1 - eps,
		hsv: __isWhiteHsv,
		lch: __isWhiteLch,
		rgb: __isWhiteRgb,
	}
);
