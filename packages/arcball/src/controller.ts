import {
	gestureStream,
	type GestureStreamOpts,
} from "@thi.ng/rstream-gestures";
import type { ArcBall } from "./arcball.js";

export interface ArcBallControllerOpts extends GestureStreamOpts {
	/**
	 * User function to call whenever the arcball has been updated due to an
	 * interaction event.
	 */
	onUpdate: (arcball: ArcBall) => void;
}

/**
 * Attaches a [thi.ng/rstream-gestures
 * `gestureStream`](https://docs.thi.ng/umbrella/rstream-gestures/functions/gestureStream.html)
 * to given element `el` and delegates events to `arcball`. This is an
 * abstraction over both mouse, touch and wheel events.
 *
 * @param el -
 * @param arcball -
 * @param opts -
 */
export const defArcballController = (
	el: Element,
	arcball: ArcBall,
	opts: Partial<ArcBallControllerOpts>
) =>
	gestureStream(el, {
		scale: true,
		smooth: 0.5,
		zoom: arcball.eyeDist,
		minZoom: 1,
		maxZoom: 4,
		...opts,
	}).subscribe({
		next(e) {
			switch (e.type) {
				case "start":
					arcball.down(e.pos);
					break;
				case "drag":
					arcball.drag(e.pos);
					break;
				case "end":
					arcball.up();
					break;
				case "zoom":
					arcball.setEyeDistance(e.zoom);
					break;
			}
			if (e.type !== "move" && opts.onUpdate) opts.onUpdate(arcball);
		},
	});
