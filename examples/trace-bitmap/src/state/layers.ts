import type { Keys } from "@thi.ng/api";
import { css, hcy } from "@thi.ng/color";
import { deleteIn } from "@thi.ng/paths";
import { randomID } from "@thi.ng/random";
import { fromView, sync, syncRAF, type ISubscription } from "@thi.ng/rstream";
import { assocObj, keys, map, transduce } from "@thi.ng/transducers";
import { type AppState, type Layer, type LayerControls } from "../api";
import { DB } from "../state";
import { main } from "./process";

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
					syncRAF(
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
	layer.proc = sync({ src: layer.ctrls });
	main.add(layer.proc, layer.id);
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
	const proc = DB.deref().layers[id].proc;
	main.remove(proc);
	proc.done();
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
