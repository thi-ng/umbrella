import { isString } from "@thi.ng/checks";
import { group, line, points } from "@thi.ng/geom";
import { traceBitmap } from "@thi.ng/geom-trace-bitmap";
import { smoothStep } from "@thi.ng/math";
import { translation23 } from "@thi.ng/matrices";
import { GRAY8, IntBuffer, intBufferFromImage } from "@thi.ng/pixel";
import { fromView, reactive, stream, sync, syncRAF } from "@thi.ng/rstream";
import { keep, map } from "@thi.ng/transducers";
import { mulN2 } from "@thi.ng/vectors";
import { DITHER_MODES, TRACE_MODES, type Layer } from "../api";
import { DB } from "../state";
import { setCanvasTranslation } from "./canvas";

/**
 * File stream to asynchronously load an image and then place the result pixel
 * buffer into the state atom to which the UI and {@link imageProcessor} are
 * subscribed to
 */
export const imageSrc = stream<File>().subscribe({
	next(file) {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			DB.resetIn(["img", "buf"], intBufferFromImage(img, GRAY8));
			setCanvasTranslation(mulN2([], DB.deref().canvas.size, 0.5));
			URL.revokeObjectURL(url);
		};
		img.src = url;
	},
});

/**
 * Reactive transformer to reprocess a loaded image whenever the image itself or
 * any of the related params have been changed. Emits updated pixel buffer.
 */
const imageProcessor = fromView(DB, { path: ["img"] }).transform(
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
		__canvas: canvasState,
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
export const scene = main.map((job) => {
	// create result group with current translation offset & scale
	const root = group({
		__background: job.__canvas.bg,
		translate: job.__canvas.translate,
		scale: job.__canvas.scale,
		weight: 1 / job.__canvas.scale,
	});
	// need to copy pixel buffer because it will be mutated during vectorization
	const img = job.__img.copy();
	// create translation matrix to center geometry
	const mat = translation23([], mulN2([], img.size, -0.5));
	// keep stats
	let numLines = 0;
	let numPoints = 0;
	// process all layers in given order
	for (let id of job.__order) {
		const layer: Layer["params"] = (<any>job)[id];
		const mode = TRACE_MODES[layer.dir];
		// vectorize image with layer's config
		const res = traceBitmap({
			select: mode.select(layer.skip + 1),
			dir: [isString(mode.dir) ? mode.dir : mode.dir(layer.slope)],
			clear: 255,
			min: layer.min,
			max: layer.max,
			img,
			mat,
		});
		// depending on mode chosen, use lines or points
		if (mode.points) {
			numPoints += res.points.length;
			root.children.push(
				points(res.points, {
					fill: layer.color,
					stroke: "none",
					size: 0.7,
				})
			);
		} else {
			numLines += res.lines.length;
			root.children.push(
				group(
					{ stroke: layer.color },
					res.lines.map(([a, b]) => line(a, b))
				)
			);
		}
	}
	// update stats (for UI)
	geometryStats.next({ lines: numLines, points: numPoints });

	return root;
});
