// SPDX-License-Identifier: Apache-2.0
import { adaptiveCanvas2d } from "@thi.ng/canvas";
import {
	asPolygon,
	center,
	circle,
	fitIntoBounds2,
	group,
	rect,
	text,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { Node2D } from "@thi.ng/scenegraph";
import { repeatedly2d } from "@thi.ng/transducers";
import { add2, sub2, type Vec } from "@thi.ng/vectors";

const W = window.innerWidth - 32;
const H = window.innerHeight - 64;
const DPR = window.devicePixelRatio || 1;

// create canvas (automatically applying HDPI scaling, if available...)
const { canvas, ctx } = adaptiveCanvas2d(W, H, document.getElementById("app")!);

// create scene graph/tree nodes
// each node can contain arbitrary content, here we use thi.ng/geom types
// since they can be easily converted for canvas drawing (or for SVG output)

// root node only contains empty group to clear canvas
const root = new Node2D({ id: "root", body: group({ __background: "#eee" }) });

// content node is child of root, but with its origin moved to canvas center
const content = new Node2D({
	id: "content",
	parent: root,
	translate: [(W * DPR) / 2, (H * DPR) / 2],
	// create a grid of polygons, group them, fit into canvas bounds, centered @ [0,0]
	body: center(
		fitIntoBounds2(
			group(
				{ stroke: "black", fill: "#f90" },
				repeatedly2d(
					(x, y) => asPolygon(circle([x, y], 0.45), 3 + x + y)[0],
					6,
					6
				)
			),
			// canvas bounds w/ some margin
			rect([(W - 40) * DPR, (H - 40) * DPR])
		)!
	),
});

// label node also a child of root, positioned in top-left corner
const label = new Node2D({
	id: "label",
	parent: root,
	translate: [20, 20],
	// initial call to action as content for label node
	body: text([0, 0], "Click & drag to pan canvas, scroll to zoom...", {
		fill: "#000",
		stroke: "none",
		font: `${DPR}rem sans-serif`,
		baseline: "top",
	}),
});

// temp state vars for panning/dragging content node
let clickPos: Vec;
let origin: Vec;

// attach mouse/touch gestures to canvas to implement pan & zoom functionality
gestureStream(canvas, { scale: true, smooth: -0.5 }).subscribe({
	next(e) {
		switch (e.type) {
			case "start":
				// record current position
				clickPos = e.pos;
				origin = content.translate;
				break;
			case "drag":
				// move content node to new position
				content.translate = add2(
					null,
					sub2([], e.pos, clickPos),
					origin
				);
				redraw();
				break;
			case "zoom":
				// update content scale such that we zoom towards cursor pos
				content.scaleWithReferencePoint(
					// reference point must be given in node's local space
					content.mapGlobalPoint(e.pos),
					e.zoom
				);
				label.body.body = `Zoom: ${e.zoom.toFixed(2)}`;
				redraw();
				break;
		}
	},
});

// redraw entire scene graph
const redraw = () => {
	// recursively update node transformation matrices
	root.update();
	// redraw: both Node2D and the various thi.ng/geom shape types all implement
	// the `IToHiccup` interface, so they can be used here as is
	draw(ctx, root);
};

// initial draw
redraw();
