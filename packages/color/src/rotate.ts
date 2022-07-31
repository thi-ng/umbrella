import { defmulti } from "@thi.ng/defmulti/defmulti";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, TypedColor } from "./api.js";
import { __dispatch1 } from "./internal/dispatch.js";
import { __ensureAlpha } from "./internal/ensure.js";

export const rotate = defmulti<Color | null, TypedColor<any>, number, Color>(
	__dispatch1,
	{ hsv: "hsl", hsi: "hsl", hcy: "hsl" },
	{
		hsl: (out, src, theta) =>
			setC4(
				out || src,
				fract(src[0] + theta),
				src[1],
				src[2],
				__ensureAlpha(src[3])
			),
		lch: (out, src, theta) =>
			setC4(
				out || src,
				src[0],
				src[1],
				fract(src[2] + theta),
				__ensureAlpha(src[3])
			),
	}
);

export const complementary = (out: Color | null, src: TypedColor<any>) =>
	rotate(out, src, 0.5);
