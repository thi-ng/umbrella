import { isFunction } from "@thi.ng/checks";
import { XML_SVG } from "@thi.ng/prefixes";
import type { CompLayerFn, Dim, TextLayer } from "../api.js";
import { computeSize, gravityFlags, positionOrGravity } from "../units.js";

export const textLayerImpl: CompLayerFn = async (layer, _, ctx) => {
	const {
		type: __,
		bg = "transparent",
		color = "white",
		font = "sans-serif",
		fontSize = 16,
		padding = 0,
		textGravity = "c",
		body,
		gravity,
		origin,
		path,
		pos,
		ref,
		size,
		unit,
		...opts
	} = <TextLayer>layer;
	let bounds: Dim;
	const [w, h] = (bounds = computeSize(size, ctx.size, ref, unit));
	const [isE, isW, isN, isS] = gravityFlags(textGravity);
	const x = isW ? padding : isE ? w - padding : w / 2;
	const y = isN ? padding : isS ? h - padding : h / 2;
	const align = isW ? "start" : isE ? "end" : "middle";
	const valign = isN ? 0.75 : isS ? 0 : 0.25;
	const $body = isFunction(body) ? body(ctx) : body;
	const svg = [
		`<svg xmlns="${XML_SVG}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
		`<rect x="0" y="0" width="${w}" height="${h}" fill="${bg}"/>`,
		`<text x="${x}" y="${y}" text-anchor="${align}" dy="${valign}em" fill="${color}" font-family="${font}" font-size="${fontSize}">${$body}</text>`,
		`</svg>`,
	].join("");
	// writeText("text-debug.svg", svg);
	return {
		input: Buffer.from(svg),
		...positionOrGravity(bounds, ctx.size, layer),
		...opts,
	};
};
