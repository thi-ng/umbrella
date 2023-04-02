import { isString } from "@thi.ng/checks";
import { FMT_yyyyMMdd_HHmmss } from "@thi.ng/date";
import { downloadWithMime } from "@thi.ng/dl-asset";
import {
	asSvg,
	group,
	line,
	points,
	rect,
	svgDoc,
	withAttribs,
} from "@thi.ng/geom";
import { traceBitmap } from "@thi.ng/geom-trace-bitmap";
import { smoothStep } from "@thi.ng/math";
import {
	GRAY8,
	IntBuffer,
	imagePromise,
	intBufferFromImage,
} from "@thi.ng/pixel";
import { fromView, reactive, stream, sync, syncRAF } from "@thi.ng/rstream";
import { keep, map, push, transduce } from "@thi.ng/transducers";
import { mulN2, type Vec, type VecPair } from "@thi.ng/vectors";
import {
	DITHER_MODES,
	TRACE_MODES,
	type LayerParams,
	type Preset,
} from "../api";
import { DB } from "./atom";
import { setCanvasBackground, setCanvasTranslation } from "./canvas";
import { setImageDither } from "./image";
import { addLayer, removeAllLayers } from "./layers";

/**
 * Asynchronously loads an image and then places the result pixel buffer into
 * the state atom to which the {@link imageProcessor} and UI are subscribed to
 */
export const loadImage = async (file: File) => {
	const url = URL.createObjectURL(file);
	const img = await imagePromise(url);
	DB.resetIn(["img", "buf"], intBufferFromImage(img, GRAY8));
	setCanvasTranslation(mulN2([], DB.deref().canvas.size, 0.5));
	URL.revokeObjectURL(url);
};

/**
 * Reactive transformer to reprocess a loaded image whenever the image itself or
 * any of the related params have been changed. Emits updated pixel buffer.
 */
export const imageProcessor = fromView(DB, { path: ["img"] }).transform(
	map(({ buf, scale, gamma, low, high, dither }) => {
		if (!buf) return;
		let img = buf
			.scale(scale)
			.forEach((x) => smoothStep(low, high, (x / 255) ** gamma) * 255);
		if (dither) img = DITHER_MODES[dither](img);
		return img;
	}),
	keep<IntBuffer>()
);

/**
 * Layer order as rstream, synchronized to only update during RAF. This
 * augmented stream will be re-used as source in various other places of the
 * app.
 *
 * See `syncRAF()` docs:
 * https://docs.thi.ng/umbrella/rstream/functions/syncRAF.html
 */
export const layerOrder = syncRAF(fromView(DB, { path: ["order"] }));

export const canvasState = syncRAF(fromView(DB, { path: ["canvas"] }));

/**
 * Main stream combinator, initially subscribed only to layer order and the
 * processed image. When adding/removing layers (via {@link addLayer} and
 * {@link removeLayer}), their controls will be added/removed here dynamically.
 *
 * @remarks
 * The actual work (geometry processing) will be done by the {@link scene}
 * subscription.
 */
export const main = sync({
	src: {
		__order: layerOrder,
		__img: imageProcessor,
	},
	clean: true,
});

export const geometryStats = reactive({ lines: 0, points: 0 });

/**
 * Actual geometry generation / image vectorization is done here. Subscribed to
 * {@link main}, and param changes to the image or any layer will eventually
 * propagate here and trigger a new computation.
 *
 * @remarks
 * With each update this subscription produces a single thi.ng/geom `group()`
 * shape which is then used for other downstream processing (e.g. the UI canvas
 * component subscribes to here for rendering).
 */
const geo = main.map((job) => {
	const root = group({ stroke: "none" });
	// need to copy pixel buffer because it will be mutated during vectorization
	const img = job.__img.copy();
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
			root.children.push(
				group(
					{ stroke: layer.color },
					lines.map(([a, b]) => line(a, b))
				)
			);
		}
		if (pts && pts.length) {
			numPoints += pts.length;
			root.children.push(
				points(pts, {
					fill: layer.color,
				})
			);
		}
	}
	// update stats (for UI)
	geometryStats.next({ lines: numLines, points: numPoints });
	return root;
});

export const scene = sync({
	src: {
		geo,
		img: imageProcessor,
		canvas: canvasState,
	},
}).map(({ geo, canvas, img }) => {
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
									size: strokeWeight,
								},
								false
						  )
						: child
				)
			),
		]
	);
	return root;
});

export const exportSvgTrigger = stream<boolean>();

sync({
	src: { _: exportSvgTrigger, geo, img: imageProcessor, canvas: canvasState },
	reset: true,
}).subscribe({
	next({ geo, img, canvas }) {
		downloadWithMime(
			`trace-${FMT_yyyyMMdd_HHmmss()}.svg`,
			asSvg(
				svgDoc(
					{ stroke: "none" },
					rect([0, 0], img.size, { fill: canvas.bg }),
					geo
				)
			),
			{ mime: "image/svg+xml" }
		);
	},
});

export const exportJsonTrigger = stream<boolean>();

sync({
	src: { _: exportJsonTrigger, geo },
	reset: true,
}).subscribe({
	next({ geo }) {
		downloadWithMime(
			`trace-${FMT_yyyyMMdd_HHmmss()}.json`,
			JSON.stringify(geo.toHiccup()),
			{ mime: "application/json" }
		);
	},
});

export const savePreset = () => {
	const state = DB.deref();
	const preset: Preset = {
		version: 1,
		bg: state.canvas.bg,
		dither: state.img.dither,
		layers: transduce(
			map((id) => state.layers[id].params),
			push(),
			state.order
		),
	};
	downloadWithMime(
		`preset-${FMT_yyyyMMdd_HHmmss()}.json`,
		JSON.stringify(preset),
		{ mime: "application/json" }
	);
};

export const loadPreset = (file: File) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		const preset: Preset = JSON.parse(<string>e.target!.result);
		setCanvasBackground(preset.bg);
		setImageDither(preset.dither);
		removeAllLayers();
		preset.layers.forEach(addLayer);
	};
	reader.readAsText(file);
};
