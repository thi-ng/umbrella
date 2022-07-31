import { MouseButton } from "./api.js";
import type { IMGUI } from "./gui.js";

/**
 * Injects default mouse & touch event handlers into `gui.attribs` and
 * attaches keydown/up listeners to `window`.
 *
 * This method should only be used if the IMGUI is to be updated via a
 * RAF loop or other non-reactive situation. For on-demand updates /
 * rendering event handling and IMGUI mouse/key state preparation is
 * left to the user.
 *
 * - {@link IMGUI.setMouse}
 * - {@link IMGUI.setKey}
 */
export const useDefaultEventHandlers = (gui: IMGUI) => {
	const pos = (e: MouseEvent | TouchEvent) => {
		const b = (<HTMLCanvasElement>e.target).getBoundingClientRect();
		const t = (<TouchEvent>e).changedTouches
			? (<TouchEvent>e).changedTouches[0]
			: <MouseEvent>e;
		return [t.clientX - b.left, t.clientY - b.top];
	};
	const touchActive = (e: TouchEvent) => {
		gui.setMouse(pos(e), MouseButton.LEFT);
	};
	const touchEnd = (e: TouchEvent) => {
		gui.setMouse(pos(e), 0);
	};
	const mouseActive = (e: MouseEvent) => {
		gui.setMouse(pos(e), e.buttons);
	};
	Object.assign(gui.attribs, {
		onmousemove: mouseActive,
		onmousedown: mouseActive,
		onmouseup: mouseActive,
		ontouchstart: touchActive,
		ontouchmove: touchActive,
		ontouchend: touchEnd,
		ontouchcancel: touchEnd,
	});
	window.addEventListener("keydown", (e) => {
		gui.setKey(e);
		if (e.key === "Tab") {
			e.preventDefault();
		}
	});
	window.addEventListener("keyup", (e) => {
		gui.setKey(e);
	});
};
