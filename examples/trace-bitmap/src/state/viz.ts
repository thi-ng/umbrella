import type { ISubscribable } from "@thi.ng/rstream";
import { toDot, walk } from "@thi.ng/rstream-dot";
import { mapcat, vals } from "@thi.ng/transducers";
import { DB } from "./atom";
import {
	canvasState,
	exportJsonTrigger,
	exportSvgTrigger,
	geometryStats,
	imageProcessor,
	layerOrder,
} from "./process";

/**
 * Traverses this app's entire rstream graph topology and outputs as GraphViz
 * DOT format to console. This can then be copy-pasted and visualized...
 */
export const visualizeTopology = () => {
	const layers = DB.deref().layers;
	const roots: ISubscribable<any>[] = [
		imageProcessor,
		layerOrder,
		canvasState,
		geometryStats,
		exportSvgTrigger,
		exportJsonTrigger,
		...mapcat((layer) => vals(layer.ctrls), vals(layers)),
	];
	console.log(toDot(walk(roots), { dir: "LR" }));
};
