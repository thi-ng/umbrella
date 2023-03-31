import { gestureStream } from "@thi.ng/rstream-gestures";
import { add2, type Vec } from "@thi.ng/vectors";
import { DB } from "../state";

/**
 * Compute the currently available canvas size available (window width minus
 * sidebar width)
 */
export const computeCanvasSize = () => [
	// sidebar width = 16rem = 256px
	window.innerWidth - 256,
	window.innerHeight,
];

/**
 * State handler to update the canvas size in the central {@link DB} atom.
 */
export const resizeCanvas = () =>
	DB.resetIn(["canvas", "size"], computeCanvasSize());

/**
 * State handler to update the global canvas background color in the central
 * {@link DB} atom.
 *
 * @param col
 */
export const setCanvasBackground = (col: string) =>
	DB.resetIn(["canvas", "bg"], col);

export const setCanvasTranslation = (pos: Vec) =>
	DB.resetIn(["canvas", "translate"], <number[]>pos);

/**
 * Initialize canvas mouse/touch events to translate & zoom the viewport.
 *
 * @param canvas
 */
export const initGestures = (canvas: HTMLCanvasElement) =>
	gestureStream(canvas, { smooth: 0.1 }).subscribe({
		next(e) {
			switch (e.type) {
				// store current offset at begin of each gesture
				case "start":
					DB.resetIn(
						["canvas", "clickPos"],
						DB.deref().canvas.translate
					);
					break;
				// apply delta offset to stored start position
				case "drag":
					setCanvasTranslation(
						add2(
							[],
							DB.deref().canvas.clickPos!,
							e.active[0].delta!
						)
					);
					break;
				// update scale factor
				case "zoom":
					DB.resetIn(["canvas", "scale"], e.zoom);
					break;
			}
		},
	});
