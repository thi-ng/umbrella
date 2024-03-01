import { isArray, isArrayLike, isNumber, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { Metadata } from "sharp";
import {
	GRAVITY_MAP,
	type Color,
	type Dim,
	type Gravity,
	type Position,
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
 * @param size
 * @param parentSize
 * @param opts
 */
export const positionOrGravity = (
	[w, h]: Dim,
	parentSize: Dim,
	{
		pos,
		gravity,
		origin,
		ref,
		unit = "px",
	}: {
		pos?: Position;
		gravity?: Gravity;
		origin?: Gravity;
		ref?: SizeRef;
		unit?: SizeUnit;
	}
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
	const [isE, isW, isN, isS] = origin ? gravityFlags(origin) : [];
	const w2 = w >> 1;
	const h2 = h >> 1;
	if (pos.l != null)
		left = round(l) + (origin ? (isW ? 0 : isE ? -w : -w2) : 0);
	if (pos.r != null)
		left = round(parentW - r) + (origin ? (isW ? 0 : isE ? -w : -w2) : -w);
	if (pos.t != null)
		top = round(t) + (origin ? (isN ? 0 : isS ? -h : -h2) : 0);
	if (pos.b != null)
		top = round(parentH - b) + (origin ? (isN ? 0 : isS ? -h : -h2) : -h);
	return { left, top };
};

export const gravityFlags = (gravity: Gravity) =>
	["e", "w", "n", "s"].map((x) => gravity.includes(x));

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
		case "max":
			v = Math.max(w, h);
			return [v, v];
		case "min":
			v = Math.min(w, h);
			return [v, v];
		case "both":
		default:
			return [w, h];
	}
};

export const computeSize = (
	size: Size,
	curr: Dim,
	ref?: SizeRef,
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

export const computeSizeWithAspect = (
	size: number,
	[w, h]: Dim,
	aspect: number,
	unit: SizeUnit = "px",
	clamp = true
): Dim => {
	const origAspect = w / h;
	const min = Math.min(w, h);
	const max = Math.max(w, h);
	let res: Dim;
	if (unit === "%") {
		size = (size / 100) * max;
	}
	if (clamp) {
		size = Math.min(size, max);
		if (size / aspect > min) size = min * aspect;
	}
	res = origAspect > 1 ? [size, size / aspect] : [size / aspect, size];
	res[0] = round(res[0]);
	res[1] = round(res[1]);
	return res;
};

export const computeMargins = (
	size: Size | Sides,
	curr: Dim,
	ref?: SizeRef,
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
