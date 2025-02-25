// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { asPolygon, circle, pointInside, rect } from "@thi.ng/geom";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { HALF_PI, PI } from "@thi.ng/math";
import { Node2D, type NodeInfo } from "@thi.ng/scenegraph";
import { cycle, map, range } from "@thi.ng/transducers";
import { cartesian2, mulN2, type ReadonlyVec, type Vec } from "@thi.ng/vectors";

/**
 * Specialized scene graph node using @thi.ng/geom shapes as body.
 */
class GeomNode extends Node2D {
	/**
	 * Override method to check for actual point containment with body
	 * shape.
	 *
	 * @param p -
	 */
	containsLocalPoint(p: ReadonlyVec) {
		return pointInside(this.body, p);
	}
}

// mouse pos
let mouse: Vec = [0, 0];
// info object for mouse over
let info: Maybe<NodeInfo<Node2D>>;

// color iterator (used for node highlighting)
const colors = cycle([
	"#f00",
	"#ff0",
	"#06f",
	"#70f",
	"#666",
	"#9f0",
	"#0ff",
	"#090",
	"#f60",
]);

// scene graph definition

// set root node scale to window.devicePixelRatio
const root = new Node2D({ id: "root" });

// main geometry node w/ origin at canvas center
const hex = new GeomNode({
	id: "main",
	parent: root,
	translate: [300, 300],
	scale: 200,
	body: asPolygon(circle(0.5, { fill: "#0ff" }), 6)[0],
});

// rotated child node
const triangle = new GeomNode({
	id: "tri",
	parent: hex,
	rotate: PI / 4,
	body: asPolygon(circle(0.5, { fill: "#f0f" }), 3)[0],
});

// secondary children
const satellites = [
	...map(
		(i) =>
			new GeomNode({
				id: `sat-${i}`,
				parent: triangle,
				translate: cartesian2([], [1, i * HALF_PI]),
				scale: 0.2,
				body: rect([-0.5, -0.5], [1, 1], { fill: "#cf0" }),
			}),
		range(4)
	),
];

// this node uses a hdom component function as body to create the dynamic
// crosshair and node info overlay
const infoNode = new Node2D({
	id: "info",
	parent: root,
	translate: mouse,
	body: () => [
		"g",
		{},
		// crosshair
		[
			"g",
			{ stroke: "#999", dash: [2, 2] },
			["hline", {}, 0],
			["vline", {}, 0],
		],
		// only show text overlay if info present
		info
			? [
					"g",
					{ fill: "#fff" },
					rect([0, -40], [68, 40], { fill: "rgba(0,0,0,0.8)" }),
					[
						"text",
						{},
						[8, -10],
						`${info.p![0].toFixed(2)}, ${info.p![1].toFixed(2)}`,
					],
					["text", {}, [8, -24], `ID: ${info.node.id}`],
			  ]
			: undefined,
	],
});

// mousemove event handler
const updateMouse = (e: MouseEvent) => {
	mouse = [e.offsetX, e.offsetY];
	info = root.childForPoint(mouse);
	infoNode.translate = mouse;
};

// onclick handler, assigns new fill color to selected node (if any)
const selectNode = () =>
	info && (info.node.body.attribs.fill = colors.next().value);

// main hdom root component / app
const app = () => {
	// update scene graph nodes
	hex.rotate += 0.005;
	mulN2(<Vec>triangle.scale, [1, 1], Math.sin(hex.rotate * 5) * 0.3 + 0.7);
	satellites.forEach((s) => (s.rotate += 0.02));
	// recompute matrices
	root.update();

	return [
		"div.sans-serif.pl3",
		["h1", "hdom canvas scene graph demo"],
		["p", "click on shapes to change their color..."],
		// hdom-canvas component
		// translates all shapes/attribs into canvas2d draw calls
		[
			canvas,
			{
				width: 600,
				height: 600,
				onmousemove: updateMouse,
				onclick: selectNode,
			},
			// only need to pass root node which then expands itself via
			// .toHiccup() during rendering
			root,
		],
	];
};

start(app);
