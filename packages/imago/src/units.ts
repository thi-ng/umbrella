import type { Nullable } from "@thi.ng/api";
import { isArray, isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { Metadata } from "sharp";
import {
	GRAVITY_MAP,
	type Color,
	type CompLayer,
	type Dim,
	type Gravity,
	type Sides,
	type Size,
	type SizeRef,
	type SizeUnit,
} from "./api.js";

const round = Math.round;

export const ensureSize = (meta: Metadata) =>
	!(isNumber(meta.width) && isNumber(meta.height)) &&
	illegalArgs("can't determine image size");

export const coerceColor = (col: Color) =>
	isString(col)
		? col
		: isArrayLike(col)
		? { r: col[0], g: col[1], b: col[2], alpha: col[3] ?? 1 }
		: col;

export const positionOrGravity = (
	pos: CompLayer["pos"],
	gravity: Nullable<Gravity>,
	[w, h]: Dim,
	[parentW, parentH]: Dim,
	unit: SizeUnit = "px"
) => {
	if (!pos) return gravity ? { gravity: GRAVITY_MAP[gravity] } : undefined;
	const isPC = unit === "%";
	let { l, r, t, b } = pos;
	if (l != null) l = round(isPC ? (l * parentW) / 100 : l);
	if (r != null) l = round(parentW - (isPC ? (r * parentW) / 100 : r) - w);
	if (t != null) t = round(isPC ? (t * parentH) / 100 : t);
	if (b != null) t = round(parentH - (isPC ? (b * parentH) / 100 : b) - h);
	return { left: l, top: t };
};

export const gravityPosition = (
	gravity: Gravity,
	[w, h]: Dim,
	[parentW, parentH]: Dim
) => [
	gravity.includes("w")
		? 0
		: gravity.includes("e")
		? parentW - w
		: (parentW - w) >> 1,
	gravity.includes("n")
		? 0
		: gravity.includes("s")
		? parentH - h
		: (parentH - h) >> 1,
];

export const refSize = ([w, h]: Dim, ref?: SizeRef) => {
	switch (ref) {
		case "w":
			return w;
		case "h":
			return h;
		case "max":
			return Math.max(w, h);
		case "min":
		default:
			return Math.min(w, h);
	}
};

export const computeSize = (
	size: Size,
	curr: Dim,
	unit: SizeUnit = "px"
): Dim => {
	const aspect = curr[0] / curr[1];
	let res: Dim;
	if (isNumber(size)) {
		res = aspect > 1 ? [size, size / aspect] : [size * aspect, size];
	} else {
		const [w, h] = size;
		res =
			w >= 0
				? h >= 0
					? size
					: [w, w / aspect]
				: h > 0
				? [w * aspect, h]
				: illegalArgs(
						`require at least width or height, but got: ${JSON.stringify(
							size
						)}`
				  );
	}
	if (unit === "%") {
		res[0] *= curr[0] / 100;
		res[1] *= curr[1] / 100;
	}
	res[0] = round(res[0]);
	res[1] = round(res[1]);
	return res;
};

export const computeMargins = (
	size: Size | Sides,
	curr: Dim,
	ref: SizeRef = "min",
	unit: SizeUnit = "px"
) => {
	let res: Sides;
	const refSide = refSize(curr, ref);
	const isPC = unit === "%";
	if (isArray(size) && size.length === 4) {
		res = <Sides>(
			(isPC
				? size.map((x) => round((x * refSide) / 100))
				: size.map(round))
		);
	} else if (isNumber(size)) {
		const w = round(isPC ? (refSide * size) / 100 : size);
		res = [w, w, w, w];
	} else {
		const [w, h] = computeSize(size, curr, unit);
		res = [w, w, h, h];
	}
	return res;
};
