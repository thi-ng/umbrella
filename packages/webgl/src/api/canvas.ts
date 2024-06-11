import type { WebGLExtensionMap } from "./ext.js";

export interface WeblGLCanvasOpts {
	canvas: string | HTMLCanvasElement;
	/**
	 * Parent element to attach the canvas to
	 */
	parent: HTMLElement;
	/**
	 * WebGL context options
	 */
	opts: Partial<WebGLContextAttributes>;
	/**
	 * WebGL version
	 *
	 * @defaultValue 2
	 */
	version: 1 | 2;
	width: number;
	height: number;
	/**
	 * Unless false, the canvas will adapt to the current window's
	 * `devicePixelRatio` setting, i.e. the `drawingBufferWidth` will be
	 * configured `width * dpr` (same for height).
	 *
	 * @defaultValue true
	 */
	autoScale: boolean;
	/**
	 * Event listener to respond to a loss of the WebGL context (triggered by
	 * the browser).
	 */
	onContextLost: EventListener;
	ext: (keyof WebGLExtensionMap)[];
}
