import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { TypedColor } from "./api.js";
import { hsv } from "./hsv/hsv.js";
import { __dispatch0 } from "./internal/dispatch.js";

/**
 * Returns the (normalized) hue of given color.
 *
 * @remarks
 * Since LCH uses different hue values than the more familiar HSV/HSL color
 * wheel, LCH colors will be first converted to HSV to ensure uniform results.
 */
export const hue = defmulti<TypedColor<any>, number>(
	__dispatch0,
	{
		hcy: "hsv",
		hsi: "hsv",
		hsl: "hsv",
	},
	{
		[DEFAULT]: (col: TypedColor<any>) => hsv(col)[0],

		hsv: (col) => col[0],
	}
);
