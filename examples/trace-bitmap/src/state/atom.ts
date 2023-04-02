import { defAtom } from "@thi.ng/atom";
import { type AppState } from "../api";
import { computeCanvasSize } from "./canvas";

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
	canvas: {
		size: computeCanvasSize(),
		translate: [0, 0],
		scale: 1,
		bg: "#e8e0e0",
	},
});
