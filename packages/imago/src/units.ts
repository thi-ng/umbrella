import type { Nullable } from "@thi.ng/api";
import { isArray, isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { Metadata } from "sharp";
import {
	GRAVITY_MAP,
	type Color,
	type CompLayerBase,
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

/**
 *
 * @remarks
 * The given `size` MUST already be resolved (in pixels), e.g. via an earlier
 * call to {@link computeSize}. `parentSize` is also in pixels.
 *
 * @param pos
 * @param gravity
 * @param size
 * @param parentSize
 * @param ref
 * @param unit
 */
export const positionOrGravity = (
	pos: CompLayerBase["pos"],
	gravity: Nullable<Gravity>,
	[w, h]: Dim,
	parentSize: Dim,
	ref?: SizeRef,
	unit: SizeUnit = "px"
) => {
	if (!pos) return gravity ? { gravity: GRAVITY_MAP[gravity] } : undefined;
	const [parentW, parentH] = parentSize;
	let { l, r, t, b } = pos;
	[l, r, t, b] = computeMargins(
		[l || 0, r || 0, t || 0, b || 0],
		parentSize,
		ref,
		unit
	);
	let left: number | undefined, top: number | undefined;
	if (pos.l != null) left = round(l);
	if (pos.r != null) left = round(parentW - r - w);
	if (pos.t != null) top = round(t);
	if (pos.b != null) top = round(parentH - b - h);
	return { left, top };
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

export const refSize = ([w, h]: Dim, ref?: SizeRef): Dim => {
	let v: number;
	switch (ref) {
		case "w":
			return [w, w];
		case "h":
			return [h, h];
		case "both":
			return [w, h];
		case "max":
			v = Math.max(w, h);
			return [v, v];
		case "min":
		default:
			v = Math.min(w, h);
			return [v, v];
	}
};

export const computeSize = (
	size: Size,
	curr: Dim,
	ref: SizeRef = "min",
	unit: SizeUnit = "px"
): Dim => {
	const aspect = curr[0] / curr[1];
	let res: Dim;
	if (isNumber(size)) {
		if (unit === "%") {
			res = refSize(curr, ref);
			res = [(res[0] * size) / 100, (res[1] * size) / 100];
		} else {
			res = [size, size];
		}
	} else {
		let [w, h] = size;
		if (unit === "%") {
			const [rw, rh] = refSize(curr, ref);
			w *= rw / 100;
			h *= rh / 100;
			size = [w, h];
		}
		res =
			w >= 0
				? h >= 0
					? size
					: [w, w / aspect]
				: h >= 0
				? [h * aspect, h]
				: illegalArgs(
						`require at least width or height, but got: ${JSON.stringify(
							size
						)}`
				  );
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
				? size.map((x, i) => round((x * refSide[i >> 1]) / 100))
				: size.map(round))
		);
	} else if (isNumber(size)) {
		const w = round(isPC ? (refSide[0] * size) / 100 : size);
		const h = round(isPC ? (refSide[1] * size) / 100 : size);
		res = [w, w, h, h];
	} else {
		const w = round(isPC ? (refSide[0] * size[0]) / 100 : size[0]);
		const h = round(isPC ? (refSide[1] * size[1]) / 100 : size[1]);
		res = [w, w, h, h];
	}
	return res;
};
