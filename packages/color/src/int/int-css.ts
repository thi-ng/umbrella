import { U24 } from "@thi.ng/strings/radix";
import { FF, INV8BIT } from "../api/constants.js";

export const intArgb32Css = (src: number) => {
	const a = src >>> 24;
	return a < 255
		? `rgba(${(src >> 16) & 0xff},${(src >> 8) & 0xff},${src & 0xff},${FF(
				a * INV8BIT
		  )})`
		: `#${U24(src & 0xffffff)}`;
};

export const intRgb24Css = (src: number) => `#${U24(src & 0xffffff)}`;
