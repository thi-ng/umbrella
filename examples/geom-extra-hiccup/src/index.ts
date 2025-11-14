// SPDX-License-Identifier: Apache-2.0
import { canvas2d } from "@thi.ng/canvas";
import {
	asSvg,
	circle,
	extra,
	group,
	rectWithCentroid,
	svgDoc,
	text,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";

const W = Math.min(600, window.innerWidth - 32);

// define a simple group of shapes.
// the `fill` attributes are ID references to gradients which are defined below
// also see: https://docs.thi.ng/umbrella/hiccup-canvas/#md:gradients
const geo = group({ translate: [W / 2, W / 2] }, [
	rectWithCentroid([0, 0], W, { fill: "$bg" }),
	circle(W / 3, { fill: "$dot" }),
]);

// wrap geometry in another group with embedded custom thi.ng/hiccup content
// (here to define gradients). The `extra()` shape type has various dummy
// implementations for API compatibility but otherwise has no impact on existing
// geometry operations. it's purely intended for use cases like these here, to
// provide additional data/elements (usually for presentation purposes)...
//
// note: thi.ng/geom uses a hiccup convention compatible with
// thi.ng/hiccup-canvas, but also directly supports serialization to SVG (see
// below). for details about this conversion process see:
// https://docs.thi.ng/umbrella/hiccup-canvas/#md:svg-conversion.
//
// any hiccup given to `extra()` will also be converted (during SVG
// serialization) if it contains supported element types (like these gradient
// defs here). other content will be serialized as given.
const scene = group({}, [
	extra([
		"defs",
		{},
		// see: https://docs.thi.ng/umbrella/hiccup-canvas/#md:gradients
		[
			"linearGradient",
			{ id: "bg", from: [0, 0], to: [0, W] },
			[
				[0, "#ccc"],
				[1, "#666"],
			],
		],
		[
			"radialGradient",
			{ id: "dot", from: [0, 0], to: [0, 0], r1: 0, r2: W / 3 },
			[
				[0, "#f00"],
				[0.5, "#f0f"],
				[1, "#f00"],
			],
		],
	]),
	geo,
]);

const root = document.getElementById("app")!;

// create canvas & draw scene
const { ctx } = canvas2d(W, W, root);
draw(ctx, scene);

// create wrapper element for SVG version
const svg = document.createElement("div");
root.appendChild(svg);

// serialize scene to SVG
svg.innerHTML = asSvg(
	svgDoc(
		{ viewBox: `0 0 ${W} ${W}`, stroke: "none" },
		scene,
		text([10, 10], "SVG version", { fill: "#000", baseline: "hanging" })
	)
);
