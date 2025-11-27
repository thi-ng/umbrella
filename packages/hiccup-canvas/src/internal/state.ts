// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Maybe } from "@thi.ng/api";
import { adaptDPI } from "@thi.ng/canvas";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import type { DrawState } from "../api.js";
import { resolveGradientOrColor } from "../color.js";

const DEFAULTS: any = {
	align: "left",
	alpha: 1,
	baseline: "alphabetic",
	compose: "source-over",
	dash: [],
	dashOffset: 0,
	direction: "inherit",
	fill: "#000",
	filter: "none",
	font: "10px sans-serif",
	lineCap: "butt",
	lineJoin: "miter",
	miterLimit: 10,
	shadowBlur: 0,
	shadowColor: "rgba(0,0,0,0)",
	shadowX: 0,
	shadowY: 0,
	smooth: true,
	stroke: "#000",
	weight: 1,
};

const CTX_ATTRIBS: IObjectOf<string> = {
	align: "textAlign",
	alpha: "globalAlpha",
	baseline: "textBaseline",
	clip: "clip",
	compose: "globalCompositeOperation",
	dash: "setLineDash",
	dashOffset: "lineDashOffset",
	direction: "direction",
	fill: "fillStyle",
	fillRule: "fillRule",
	filter: "filter",
	font: "font",
	lineCap: "lineCap",
	lineJoin: "lineJoin",
	miterLimit: "miterLimit",
	shadowBlur: "shadowBlur",
	shadowColor: "shadowColor",
	shadowX: "shadowOffsetX",
	shadowY: "shadowOffsetY",
	smooth: "imageSmoothingEnabled",
	stroke: "strokeStyle",
	weight: "lineWidth",
};

/** @internal */
const __newState = (state: DrawState, restore = false) => ({
	attribs: { ...state.attribs },
	grads: { ...state.grads },
	edits: [],
	restore,
});

/** @internal */
export const __mergeState = (
	ctx: CanvasRenderingContext2D,
	state: DrawState,
	attribs: IObjectOf<any>
) => {
	let res: Maybe<DrawState>;
	if (!attribs) return;
	const canvas = ctx.canvas;
	const dpr = attribs.__dpr;
	// don't use !== due to data attrib always string
	if (dpr && dpr != canvas.dataset.dpr) {
		adaptDPI(
			canvas,
			+(canvas.dataset.origWidth ?? canvas.width),
			+(canvas.dataset.origHeight ?? canvas.height),
			dpr
		);
		ctx.scale(dpr, dpr);
	}
	if (__applyTransform(ctx, attribs)) {
		res = __newState(state, true);
	}
	if (attribs.__background || attribs.__clear) {
		ctx.save();
		ctx.resetTransform();
		const { width, height } = canvas;
		if (attribs.__clear) {
			ctx.clearRect(0, 0, width, height);
		} else {
			ctx.fillStyle = resolveGradientOrColor(state, attribs.__background);
			ctx.fillRect(0, 0, width, height);
		}
		ctx.restore();
	}
	for (const id in attribs) {
		const k = CTX_ATTRIBS[id];
		if (k) {
			const v = attribs[id];
			if (v != null && state.attribs[id] !== v) {
				!res && (res = __newState(state));
				res.attribs[id] = v;
				res.edits!.push(id);
				__setAttrib(ctx, state, id, k, v);
			}
		}
	}
	return res;
};

/** @internal */
export const __restoreState = (
	ctx: CanvasRenderingContext2D,
	prev: DrawState,
	curr: DrawState
) => {
	if (curr.restore) {
		ctx.restore();
		return;
	}
	const edits = curr.edits;
	const attribs = prev.attribs;
	for (let i = edits.length; i-- > 0; ) {
		const id = edits[i];
		const v = attribs[id];
		__setAttrib(
			ctx,
			prev,
			id,
			CTX_ATTRIBS[id],
			v != null ? v : DEFAULTS[id]
		);
	}
};

/** @internal */
export const __registerGradient = (
	state: DrawState,
	id: string,
	g: CanvasGradient
) => {
	!state.grads && (state.grads = {});
	state.grads[id] = g;
};

/** @internal */
const __setAttrib = (
	ctx: CanvasRenderingContext2D,
	state: DrawState,
	id: string,
	k: string,
	val: any
) => {
	switch (id) {
		case "fill":
		case "stroke":
		case "shadowColor":
			(<any>ctx)[k] = resolveGradientOrColor(state, val);
			break;
		case "dash":
			(<any>ctx)[k].call(ctx, val);
			break;
		case "clip":
		case "fillRule":
			break;
		default:
			(<any>ctx)[k] = val;
	}
};

/** @internal */
const __applyTransform = (
	ctx: CanvasRenderingContext2D,
	attribs: IObjectOf<any>
) => {
	let v: any;
	if (
		(v = attribs.transform) ||
		attribs.setTransform ||
		attribs.translate ||
		attribs.scale ||
		attribs.rotate
	) {
		ctx.save();
		if (v) {
			ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
		} else if ((v = attribs.setTransform)) {
			ctx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
		} else {
			(v = attribs.translate) && ctx.translate(v[0], v[1]);
			(v = attribs.rotate) && ctx.rotate(v);
			(v = attribs.scale) &&
				(isArrayLike(v) ? ctx.scale(v[0], v[1]) : ctx.scale(v, v));
		}
		return true;
	}
	return false;
};
