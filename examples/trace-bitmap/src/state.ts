import type { Keys } from "@thi.ng/api";
import { defAtom } from "@thi.ng/atom";
import { isString } from "@thi.ng/checks";
import { css, hcy } from "@thi.ng/color";
import { group, line, points } from "@thi.ng/geom";
import { traceBitmap } from "@thi.ng/geom-trace-bitmap";
import { smoothStep } from "@thi.ng/math";
import { deleteIn } from "@thi.ng/paths";
import { GRAY8, IntBuffer, intBufferFromImage } from "@thi.ng/pixel";
import { randomID } from "@thi.ng/random";
import {
	fromView,
	sidechainPartitionRAF,
	stream,
	sync,
	type ISubscription,
} from "@thi.ng/rstream";
import { assocObj, keep, keys, map, transduce } from "@thi.ng/transducers";
import {
	DITHER_MODES,
	TRACE_MODES,
	type AppState,
	type DitherMode,
	type ImageParam,
	type Layer,
	type LayerControls,
} from "./api";

/**
 * Global/central state atom, single source of truth. Various subscriptions will
 * be added to different keys/elements in the atom, so that any updates done to
 * this state container will propagate, trigger new processing and/or UI updates
 * (aka reactive updates).
 *
 * These subscriptions are organized in a topology to ensure only the minimum
 * amount of work needed is being done. Once a state change has been fully
 * processed, the app will be completely idle until the next change (i.e.
 * there's no "main loop" or any other repeated background processing)
 */
export const DB = defAtom<AppState>({
	layers: {},
	order: [],
	img: { scale: 1, gamma: 1, low: 0, high: 1, dither: "None" },
	bg: "#e8e0e0",
});

/**
 * Define default params for new layer (incl. random color)
 */
const defLayer = () =>
	<Layer["params"]>{
		dir: "v",
		min: 2,
		max: 100,
		slope: 1,
		skip: 0,
		color: css(hcy(Math.random(), 1, 0.2)),
	};

/**
 * State handler to add a new layer to the {@link DB} atom, create reactive
 * views for all of its params and add them to the {@link main} stream
 * combinator, which handles the image vectorization.
 *
 * @param params
 */
export const addLayer = (params: Layer["params"] = defLayer()) => {
	const layer = <Layer>{ id: randomID(), params };
	DB.swapIn(["layers"], (layers) => ({ ...layers, [layer.id]: layer }));
	DB.swapIn(["order"], (order) => [...order, layer.id]);
	// create rstreams for each layer param
	layer.ctrls = <LayerControls>transduce(
		map(
			(id) =>
				<[string, ISubscription<any, any>]>[
					id,
					// param view as rstream, synchronized to update during RAF
					// to ensure UI components see consistent state
					sidechainPartitionRAF(
						fromView(DB, {
							path: [
								"layers",
								layer.id,
								"params",
								<Keys<LayerControls>>id,
							],
							id: `${layer.id}-${id}`,
						})
					),
				]
		),
		assocObj<ISubscription<any, any>>(),
		keys(layer.params)
	);
	// re-combine param streams into single one and
	// add to main stream combinator
	main.add(sync({ src: layer.ctrls }), layer.id);
};

/**
 * State handler to add a duplicate of layer with the given ID to the {@link DB}
 * atom. All params of the given layer will be copied.
 *
 * @param layerID
 */
export const duplicateLayer = (layerID: string) =>
	addLayer({ ...DB.deref().layers[layerID].params });

/**
 * State handler to remove the layer with given ID from the central {@link DB}
 * atom.
 *
 * @param id
 */
export const removeLayer = (id: string) => {
	main.removeID(id);
	DB.swapIn(["order"], (order) => {
		order = order.slice();
		order.splice(
			order.findIndex((x) => x === id),
			1
		);
		return order;
	});
	DB.swapIn(["layers"], (layers) => deleteIn(layers, [id]));
};

/**
 * State handler to update a single layer param to the given new value. Since
 * each param has reactive streams subscribed to the atom, this change will
 * propagate, trigger new processing and also cause UI updates.
 *
 * @param layerID
 * @param param
 * @param value
 */
export const updateLayerParam = (
	layerID: string,
	param: Keys<LayerControls>,
	value: any
) => DB.resetIn(["layers", layerID, "params", param], value);

/**
 * State handler to update the layer order in the central {@link DB} atom by
 * moving the layer for given ID forward or backward.
 *
 * @remarks
 * Note: Layer order here means "first come, first served", i.e. lower indices
 * in the {@link AppState.order} array are being processed first.
 *
 * @param layerID
 * @param dir
 */
export const moveLayer = (layerID: string, dir: -1 | 1) =>
	DB.swapIn(["order"], (order) => {
		const idx = order.findIndex((x) => x === layerID);
		if ((dir < 0 && idx === 0) || (dir > 0 && idx === order.length - 1)) {
			return order;
		}
		order = order.slice();
		order.splice(idx, 1);
		order.splice(idx + dir, 0, layerID);
		return order;
	});

/**
 * State handler to update a single (numeric) image param in the central
 * {@link DB} atom.
 *
 * @param key
 * @param val
 */
export const setImageParam = (
	key: Exclude<ImageParam, "buf" | "dither">,
	val: string
) => DB.resetIn(["img", key], parseFloat(val));

/**
 * State handler to update the image dithering mode in the central {@link DB}
 * atom. Also see {@link DITHER_MODES}.
 *
 * @param mode
 */
export const setImageDither = (mode: DitherMode) =>
	DB.resetIn(["img", "dither"], mode);

/**
 * State handler to update the global canvas background color in the central
 * {@link DB} atom.
 *
 * @param col
 */
export const setBgColor = (col: string) => DB.resetIn(["bg"], col);

////////////////// Reactive state constructs //////////////////////

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
 * See `sidechainPartitionRAF()` docs:
 * https://docs.thi.ng/umbrella/rstream/functions/sidechainPartitionRAF.html
 */
export const layerOrder = sidechainPartitionRAF(
	fromView(DB, { path: ["order"] })
);

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
		__bg: fromView(DB, { path: ["bg"] }),
	},
	clean: true,
});

/**
 * Actual geometry generation / image vectorization is done here. Subscribed to
 * {@link main}, and param changes to the image or any layer will eventually
 * propagate here and trigger a new computation.
 *
 * @remarks
 * The result of this subscription is a single thi.ng/geom `group()` shape which
 * is then used for other downsteam processing (e.g. the UI canvas component
 * subscribes to here for rendering).
 */
export const scene = main.map((job) => {
	// create result group
	const root = group({ __background: job.__bg, scale: 2, weight: 0.5 });
	// need to copy pixel buffer because it will be mutated during vectorization
	const img = job.__img.copy();
	// process all layers in given order
	for (let id of job.__order) {
		const layer: Layer["params"] = (<any>job)[id];
		const mode = TRACE_MODES[layer.dir];
		// vectorize image with layer's config
		const res = traceBitmap({
			img,
			select: mode.select(layer.skip + 1),
			dir: [isString(mode.dir) ? mode.dir : mode.dir(layer.slope)],
			clear: 255,
			min: layer.min,
			max: layer.max,
		});
		// depending on mode chosen, use lines or points
		const elements = mode.points
			? points(res.points, {
					fill: layer.color,
					stroke: "none",
					size: 0.7,
			  })
			: group(
					{ stroke: layer.color },
					res.lines.map(([a, b]) => line(a, b))
			  );
		// add to result group
		root.children.push(elements);
	}
	return root;
});
