export interface Canvas2DOpts {
	/**
	 * (Native) options passed to `canvas.getContext("2d")`
	 */
	ctx: CanvasRenderingContext2DSettings;
	/**
	 * If true, adds CSS rule to force canvas being displayed properly pixelated
	 * (no smoothing)
	 */
	pixelated: boolean;
}

export interface AdaptiveCanvas2DOpts extends Canvas2DOpts {
	/**
	 * Device pixel ratio (aka scale value) to use for the canvas. By default
	 * this will be sourced from the current `window.devicePixelRatio`, but this
	 * option can be used if a specific fixed number of pixels is required (i.e.
	 * set `dpr: 1` to ensure the `width` and `height` values given to
	 * {@link canvas2d} _are_ the actual real pixel dimensions).
	 *
	 * Also see {@link adaptDPI} for more details.
	 */
	dpr: number;
}

export interface CanvasContext {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
}

/**
 * Creates a canvas element of given size, obtains its 2D drawing context and
 * returns object of both. If `parent` is given, the canvas is appended to it as
 * child.
 *
 * @remarks
 * By default the actual pixel size of the canvas will depend of the
 * `windowDevicePixelRatio` of the current `window` object. To force a specific
 * fixed scale, use the {@link AdaptiveCanvas2DOpts.dpr} option. Also see
 * {@link adaptDPI} for details.
 *
 * @param width -
 * @param height -
 * @param parent -
 * @param opts -
 */
export const adaptiveCanvas2d = (
	width: number,
	height = width,
	parent?: HTMLElement | null,
	opts: Partial<AdaptiveCanvas2DOpts> = {}
): CanvasContext => {
	const canvas = document.createElement("canvas");
	adaptDPI(canvas, width, height, opts.dpr);
	opts.pixelated && (canvas.style.imageRendering = "pixelated");
	parent && parent.appendChild(canvas);
	return {
		canvas,
		ctx: canvas.getContext("2d", opts.ctx)!,
	};
};

/**
 * Convenience version of {@link adaptiveCanvas2d} with a fixed device pixel
 * ratio of 1.0 (to avoid any rescaling).
 *
 * @param width
 * @param height
 * @param parent
 * @param opts
 */
export const canvas2d = (
	width: number,
	height = width,
	parent?: HTMLElement | null,
	opts: Partial<Canvas2DOpts> = {}
) => adaptiveCanvas2d(width, height, parent, { dpr: 1, ...opts });

/**
 * Convenience version of {@link canvas2d} which also enables the
 * {@link Canvas2DOpts.pixelated} option by default.
 *
 * @param width
 * @param height
 * @param parent
 * @param opts
 */
export const pixelCanvas2d = (
	width: number,
	height = width,
	parent?: HTMLElement | null,
	opts: Partial<Canvas2DOpts> = {}
) =>
	adaptiveCanvas2d(width, height, parent, {
		dpr: 1,
		pixelated: true,
		...opts,
	});

/**
 * Sets the canvas size to given `width` & `height` (given as CSS pixels, but
 * applied as device pixels) and adjusts canvas' `style` to compensate for HDPI
 * devices.
 *
 * @remarks
 * For example if `dpr` is 2, the `canvas.width` will be set to `width * 2`
 * (same for `height`) and the `canvas.style.width` will be set to given `width`
 * (in CSS pixels), thus creating a canvas with double resolution in the same
 * _apparent_ size.
 *
 * For 2D canvases, this will automatically clear any prior canvas content.
 * Returns given `dpr` (presumably the window's `devicePixelRatio` or 1.0, if
 * not available).
 *
 * @param canvas -
 * @param width - uncompensated pixel width
 * @param height - uncompensated pixel height
 * @param dpr - device pixel ratio
 */
export const adaptDPI = (
	canvas: HTMLCanvasElement,
	width: number,
	height: number,
	dpr = window.devicePixelRatio || 1
) => {
	if (dpr !== 1) {
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
	}
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	return dpr;
};

/**
 * Returns true if device's DPR > 1 (aka HighDPI)
 */
export const isHighDPI = () => (window.devicePixelRatio || 1) > 1;
