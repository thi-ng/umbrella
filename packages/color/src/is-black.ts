import type { Maybe } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IsGrayFn, ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

/** @internal */
const __isBlackHsv = (x: ReadonlyColor, eps = EPS) => x[2] <= eps;

/** @internal */
const __isBlackRgb = (x: ReadonlyColor, eps = EPS) =>
	x[0] <= eps && x[1] <= eps && x[2] <= eps;

/** @internal */
const __isBlackLch = (x: ReadonlyColor, eps = EPS) => x[0] <= eps;

export const isBlack: IsGrayFn = defmulti<
	TypedColor<any>,
	Maybe<number>,
	boolean
>(
	__dispatch0,
	{
		hcy: "hsv",
		hsi: "hsv",
		hsl: "hsv",
		labD50: "lch",
		labD65: "lch",
		srgb: "rgb",
		ycc: "rgb",
	},
	{
		[DEFAULT]: (x: any) => __isBlackRgb(rgb(x)),
		hsv: __isBlackHsv,
		lch: __isBlackLch,
		rgb: __isBlackRgb,
	}
);
