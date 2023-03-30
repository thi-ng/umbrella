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
	type DitherType,
	type ImageParam,
	type Layer,
	type LayerControls,
} from "./api";

export const DB = defAtom<AppState>({
	layers: {},
	order: [],
	img: { scale: 1, gamma: 1, low: 0, high: 1, dither: "None" },
	bg: "#e8e0e0",
});

const defLayer = () =>
	<Layer["params"]>{
		dir: "v",
		min: 2,
		max: 100,
		slope: 1,
		skip: 0,
		color: css(hcy(Math.random(), 1, 0.2)),
	};

export const addLayer = (params: Layer["params"] = defLayer()) => {
	const layer = <Layer>{ id: randomID(), params };
	DB.swapIn(["layers"], (curr) => ({ ...curr, [layer.id]: layer }));
	DB.swapIn(["order"], (curr) => [...curr, layer.id]);
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
	layer.proc = sync({ src: layer.ctrls });
	main.add(layer.proc, layer.id);
};

export const duplicateLayer = (layerID: string) =>
	addLayer({ ...DB.deref().layers[layerID].params });

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

export const updateLayerParam = (
	layerID: string,
	param: Keys<LayerControls>,
	value: any
) => DB.resetIn(["layers", layerID, "params", param], value);

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

export const setImageParam = (
	key: Exclude<ImageParam, "buf" | "dither">,
	val: string
) => DB.resetIn(["img", key], parseFloat(val));

export const setImageDither = (mode: DitherType) =>
	DB.resetIn(["img", "dither"], mode);

export const setBgColor = (col: string) => DB.resetIn(["bg"], col);

// File stream to load an image and place result pixel buffer into the state atom
// to which the UI and `imageProcessor` are subscribed to
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

const imageProcessor = fromView(DB, { path: ["img"] }).transform(
	map(({ buf, scale, gamma, low, high, dither }) => {
		if (!buf) return;
		let img = buf
			.scale(scale)
			.forEach((x) => smoothStep(low, high, (x / 255) ** gamma) * 255);
		if (dither) {
			img = DITHER_MODES[dither](img);
		}
		return img;
	}),
	keep<IntBuffer>()
);

/**
 * Layer order as rstream, synchronized to only update during RAF
 */
export const layerOrder = sidechainPartitionRAF(
	fromView(DB, { path: ["order"] })
);

/**
 * Main stream combinator, initially subscribed only to layer order and the
 * processed image. When adding/removing layers (via {@link addLayer}), their
 * controls will be added/removed here dynamically
 */
export const main = sync({
	src: {
		__order: layerOrder,
		__img: imageProcessor,
		__bg: fromView(DB, { path: ["bg"] }),
	},
	clean: true,
});

export const scene = main.map((job) => {
	const root = group({ __background: job.__bg, scale: 2, weight: 0.5 });
	const img = job.__img.copy();
	for (let id of job.__order) {
		const layer: Layer["params"] = (<any>job)[id];
		const mode = TRACE_MODES[layer.dir];
		const res = traceBitmap({
			img,
			select: mode.select(layer.skip + 1),
			dir: [isString(mode.dir) ? mode.dir : mode.dir(layer.slope)],
			clear: 255,
			min: layer.min,
			max: layer.max,
		});
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
		root.children.push(elements);
	}
	return root;
});
