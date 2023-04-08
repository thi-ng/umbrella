import type { ISubscribable } from "@thi.ng/rstream";
import { serialize } from "@thi.ng/rstream-dot";
import { mapcat, vals } from "@thi.ng/transducers";
import { DB } from "./atom";
import { canvasGestures } from "./canvas";
import {
	canvasState,
	geometryStats,
	imageProcessor,
	jsonExportTrigger,
	layerOrder,
	svgExportTrigger,
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
		canvasGestures,
		geometryStats,
		svgExportTrigger,
		jsonExportTrigger,
		...mapcat((layer) => vals(layer.ctrls), vals(layers)),
	];
	console.log(serialize(roots));
};
