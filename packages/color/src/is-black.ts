import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

const isBlackHsv = (x: ReadonlyColor, eps = EPS) => x[2] <= eps;

const isBlackRgb = (x: ReadonlyColor, eps = EPS) =>
	x[0] <= eps && x[1] <= eps && x[2] <= eps;

const isBlackLch = (x: ReadonlyColor, eps = EPS) => x[0] <= eps;

export const isBlack = defmulti<TypedColor<any>, number | undefined, boolean>(
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
		hsv: isBlackHsv,
		lch: isBlackLch,
		rgb: isBlackRgb,
		[DEFAULT]: (x: any) => isBlackRgb(rgb(x)),
	}
);
