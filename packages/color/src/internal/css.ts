import { clamp0 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import type { ReadonlyColor } from "../api.js";
import { FF, PC } from "../api/constants.js";
import { __ensureAlpha } from "./ensure.js";

export const __labCss = (mode: string, src: ReadonlyColor, scale: number) => {
	const l = PC(clamp0(src[0]));
	const a = FF(src[1] * scale);
	const b = FF(src[2] * scale);
	const alpha = __ensureAlpha(src[3]);
	return __css(mode, l, a, b, alpha);
};

export const __lchCss = (mode: string, src: ReadonlyColor, scaleC: number) => {
	const l = PC(clamp0(src[0]));
	const c = FF(clamp0(src[1]) * scaleC);
	const h = FF(fract(src[2]) * 360);
	const a = __ensureAlpha(src[3]);
	return __css(mode, l, c, h, a);
};

const __css = (mode: string, x: string, y: string, z: string, a: number) =>
	`${mode}(${x} ${y} ${z}` + (a < 1 ? `/${FF(a)})` : ")");
