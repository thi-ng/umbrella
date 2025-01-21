// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { IsGrayFn, ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

/** @internal */
const __isGrayHsv = (x: ReadonlyColor, eps = EPS) => x[1] <= eps;

/** @internal */
const __isGrayRgb = (x: ReadonlyColor, eps = EPS) =>
	eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);

/** @internal */
const __isGrayLab = (x: ReadonlyColor, eps = EPS) =>
	eqDelta(x[1], 0, eps) && eqDelta(x[2], 0, eps);

export const isGray: IsGrayFn = defmulti<
	TypedColor<any>,
	Maybe<number>,
	boolean
>(
	__dispatch0,
	{
		hcy: "hsv",
		hsi: "hsv",
		hsl: "hsv",
		lch: "hsv",
		labD65: "labD50",
		srgb: "rgb",
		ycc: "labD50",
	},
	{
		[DEFAULT]: (x: any) => __isGrayRgb(rgb(x)),
		hsv: __isGrayHsv,
		labD50: __isGrayLab,
		rgb: __isGrayRgb,
	}
);
