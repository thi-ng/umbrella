import { isString } from "@thi.ng/checks";
import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadWithMime } from "@thi.ng/dl-asset";
import {
	asSvg,
	group,
	points,
	polyline,
	rect,
	splitArcLength,
	svgDoc,
	withAttribs,
} from "@thi.ng/geom";
import { type AxiDrawAttribs } from "@thi.ng/geom-axidraw";
import { traceBitmap } from "@thi.ng/geom-trace-bitmap";
import { smoothStep } from "@thi.ng/math";
import { IntBuffer } from "@thi.ng/pixel";
import {
	Stream,
	fromView,
	reactive,
	sidechainTrigger,
	stream,
	sync,
	syncRAF,
} from "@thi.ng/rstream";
import { keep, map } from "@thi.ng/transducers";
import { mulN2, type Vec, type VecPair } from "@thi.ng/vectors";
import {
	DITHER_MODES,
	THEME,
	TRACE_MODES,
	type AxiDrawConfig,
	type LayerParams,
} from "../api";
import { DB } from "./atom";
import { addLayer } from "./layers";

/**
 * Reactive transformer to reprocess a loaded image whenever the image itself or
 * any of the related params have been changed. Emits updated pixel buffer.
 */
export const imageProcessor = fromView(DB, { path: ["img"] }).transform(
	map(({ buf, scale, rotate, gamma, low, high, dither }) => {
		if (!buf) return;
		let img = buf
			.scale(scale)
			.forEach((x) => smoothStep(low, high, (x / 255) ** gamma) * 255);
		if (rotate) img.rotateByID(rotate);
		if (dither) img = DITHER_MODES[dither](img);
		return img;
	}),
	keep<IntBuffer>(),
	{ id: "imgProc" }
);

/**
 * Layer order as rstream, synchronized to only update during RAF. This
 * augmented stream will be re-used as source in various other places of the
 * app.
 *
 * See `syncRAF()` docs:
 * https://docs.thi.ng/umbrella/rstream/functions/syncRAF.html
 */
export const layerOrder = syncRAF(fromView(DB, { path: ["order"] }), {
	id: "layerOrder",
});

export const canvasState = syncRAF(fromView(DB, { path: ["canvas"] }), {
	id: "canvasState",
});

/**
 * Main stream combinator, initially subscribed only to layer order and the
 * processed image. When adding/removing layers (via {@link addLayer} and
 * {@link removeLayer}), their controls will be added/removed here dynamically.
 *
 * @remarks
 * The `xform` function performs the actual main geometry generation / image
 * vectorization. Param changes to the image or any layer will eventually
 * propagate here and trigger a new computation.
 *
 * With each update this subscription produces a single thi.ng/geom `group()`
 * shape which is then used for other downstream processing (e.g. the UI canvas
 * component subscribes to here for rendering).
 */
export const main = sync({
	src: {
		__order: layerOrder,
		__img: imageProcessor,
		__axi: <Stream<AxiDrawConfig>>fromView(DB, { path: ["axi"] }),
	},
	clean: true,
	id: "main",
	xform: map((job) => {
		const root = group({ stroke: "none" });
		// need to copy pixel buffer because it will be mutated during vectorization
		const img = job.__img.copy();
		const axi = job.__axi;
		// keep stats
		let numLines = 0;
		let numPoints = 0;
		// process all layers in given order
		for (let id of job.__order) {
			const layer: LayerParams = (<any>job)[id];
			const mode = TRACE_MODES[layer.mode];
			// vectorize image with layer's config
			const res = traceBitmap({
				select: mode.select(layer.skip + 1),
				dir: [isString(mode.dir) ? mode.dir : mode.dir(layer.slope)],
				clear: 255,
				min: layer.min,
				max: layer.max,
				img,
				// mat,
			});
			let lines: VecPair[] | undefined;
			let pts: Vec[] | undefined;
			if (mode.points) {
				// if max enabled, also attempt to extract lines from point cloud
				if (layer.max > 0) {
					const extracted = mode.extract!(res.points, layer.max);
					lines = extracted.segments;
					pts = extracted.points;
				} else {
					pts = res.points;
				}
			} else {
				lines = res.lines;
			}
			if (lines && lines.length) {
				numLines += lines.length;
				root.add(
					splitArcLength(
						group(
							{
								stroke: layer.color,
								__axi: <AxiDrawAttribs>{
									interleave: { num: 1 },
								},
							},
							lines.map(([a, b]) => polyline([a, b]))
						),
						axi.maxDist
					)
				);
			}
			if (pts && pts.length) {
				numPoints += pts.length;
				root.add(
					points(pts, {
						fill: layer.color,
						__axi: <AxiDrawAttribs>{
							interleave: { num: axi.maxPoints },
						},
					})
				);
			}
		}
		// update stats (for UI)
		geometryStats.next({ lines: numLines, points: numPoints });
		return root;
	}),
});

/**
 * State container/stream of generated geometry stats (for UI overlay etc.)
 *
 * @remarks
 * This could be stored in the atom too, but since this is merely derived
 * information, keeping it in a simple stream (will be written to as side-effect
 * from {@link main} processing).
 */
export const geometryStats = reactive({ lines: 0, points: 0 }, { id: "stats" });

/**
 * Stream combinator which prepares generated geometry for canvas rendering.
 */
export const scene = sync({
	src: {
		geo: main,
		img: imageProcessor,
		canvas: canvasState,
	},
	id: "scene",
	xform: map(({ geo, canvas, img }) => {
		// keep constant display stroke width, regardless of zoom
		const strokeWeight = 1 / canvas.scale;
		// create result group with current translation offset & scale
		const root = group(
			{
				__background: canvas.bg,
				translate: canvas.translate,
				scale: canvas.scale,
				weight: strokeWeight,
			},
			[
				group(
					// center geometry around parent group position
					{ translate: mulN2([], img.size, -0.5) },
					// inject point size attrib
					geo.children.map((child) =>
						child.type == "points"
							? withAttribs(
									child,
									{
										size: strokeWeight * THEME.geom.psize,
									},
									false
							  )
							: child
					)
				),
			]
		);
		return root;
	}),
});

/**
 * Trigger stream to initiate SVG export.
 */
export const svgExportTrigger = stream<boolean>({ id: "triggerSVG" });

/**
 * Stream combinator to perform SVG export.
 */
const svgExportSources = sync({
	src: {
		geo: main,
		img: imageProcessor,
		bg: fromView(DB, { path: ["canvas", "bg"] }),
	},
});

sidechainTrigger(svgExportSources, svgExportTrigger).subscribe({
	next: ({ geo, img, bg }) =>
		downloadWithMime(
			`trace-${FMT_yyyyMMdd_HHmmss()}.svg`,
			asSvg(
				svgDoc(
					{ stroke: "none" },
					rect([0, 0], img.size, { fill: bg }),
					geo
				)
			),
			{ mime: "image/svg+xml" }
		),
});

/**
 * Trigger stream to initiate SVG export.
 */
export const jsonExportTrigger = stream<boolean>({ id: "triggerJSON" });

/**
 * Stream combinator to perform JSON (thi.ng/hiccup) export
 */
sidechainTrigger(main, jsonExportTrigger).subscribe({
	next: (geo) =>
		downloadWithMime(
			`trace-${FMT_yyyyMMdd_HHmmss()}.json`,
			JSON.stringify(geo.toHiccup()),
			{ mime: "application/json" }
		),
});
