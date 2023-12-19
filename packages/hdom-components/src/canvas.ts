import { adaptDPI } from "@thi.ng/canvas";

export type CanvasContext =
	| CanvasRenderingContext2D
	| WebGLRenderingContext
	| WebGL2RenderingContext;

interface Canvas2DContextAttributes {
	alpha?: boolean;
	storage?: boolean;
	willReadFrequently?: boolean;
	[attribute: string]: boolean | string | undefined;
}

/**
 * User provided canvas life cycle methods. These differ from the usual
 * [`ILifecycle`](https://docs.thi.ng/umbrella/hdom/interfaces/ILifecycle.html)
 * methods and are always passed at least the canvas DOM element, canvas context
 * and hdom user context. Not all handlers need to be implemented.
 */
export interface CanvasHandlers<T extends CanvasContext> {
	/**
	 * User init handler (called only once when canvas first)
	 */
	init(el: HTMLCanvasElement, ctx: T, hctx: any, ...args: any[]): void;
	/**
	 * Update handler (called for each hdom update iteration)
	 */
	update(
		el: HTMLCanvasElement,
		ctx: T,
		hctx: any,
		time: number,
		frame: number,
		...args: any[]
	): void;
	/**
	 * release handler (called only once when canvas element is removed
	 * from DOM)
	 */
	release(el: HTMLCanvasElement, ctx: T, hctx: any, ...args: any[]): void;
}

/**
 * Configurable canvas component. Used as common base for {@link canvasWebGL}
 * and {@link canvas2D} wrappers.
 *
 * @param type - canvas context type
 * @param handlers - user handlers
 * @param opts - canvas context creation options
 */
const _canvas = (
	type: string,
	handlers: Partial<CanvasHandlers<any>>,
	opts: Canvas2DContextAttributes | WebGLContextAttributes | undefined
) => {
	let el: HTMLCanvasElement;
	let ctx: any;
	let frame = 0;
	let time = 0;
	return {
		init(_el: HTMLCanvasElement, hctx: any, ...args: any[]) {
			el = _el;
			adaptDPI(el, el.width, el.height);
			ctx = el.getContext(type, opts);
			time = Date.now();
			handlers.init && handlers.init(el, ctx, hctx, ...args);
			handlers.update &&
				handlers.update(el, ctx, hctx, time, frame++, ...args);
		},
		render(hctx: any, ...args: any[]) {
			ctx &&
				handlers.update &&
				handlers.update(
					el,
					ctx,
					hctx,
					Date.now() - time,
					frame++,
					...args
				);
			return ["canvas", args[0]];
		},
		release(hctx: any, ...args: any[]) {
			handlers.release && handlers.release(el, ctx, hctx, ...args);
		},
	};
};

/**
 * Higher order WebGL canvas component delegating to user provided
 * handlers.
 *
 * @remarks
 * Since this is an higher order component, if used within a non-static
 * parent component, this function itself cannot be directly inlined
 * into hdom tree and must be initialized prior/outside, however the
 * returned component can be used as normal.
 *
 * @example
 * ```ts
 * const glcanvas = canvasWebGL({
 *   render(canv, gl, hctx, time, frame, ...args) {
 *     const col = 0.5 + 0.5 * Math.sin(time);
 *     gl.clearColor(col, col, col, 1);
 *   }
 * });
 * ...
 * [glcanvas, {id: "foo", width: 640, height: 480}]
 * ```
 *
 * @param handlers - user provided handlers
 * @param opts - canvas context creation options
 */
export const canvasWebGL = (
	handlers: Partial<CanvasHandlers<WebGLRenderingContext>>,
	opts?: WebGLContextAttributes
) => _canvas("webgl", handlers, opts);

/**
 * Same as {@link canvasWebGL} but targets WebGL2.
 *
 * @param handlers - user provided handlers
 * @param opts - canvas context creation options
 */
export const canvasWebGL2 = (
	handlers: Partial<CanvasHandlers<WebGL2RenderingContext>>,
	opts?: WebGLContextAttributes
) => _canvas("webgl2", handlers, opts);

/**
 * Similar to {@link canvasWebGL}, but targets default 2D drawing context.
 *
 * @param handlers - user provided handlers
 * @param glopts - canvas context creation options
 */
export const canvas2D = (
	handlers: Partial<CanvasHandlers<CanvasRenderingContext2D>>,
	opts?: Canvas2DContextAttributes
) => _canvas("2d", handlers, opts);
