export type CanvasContext =
    CanvasRenderingContext2D |
    WebGLRenderingContext |
    WebGL2RenderingContext;

interface Canvas2DContextAttributes {
    alpha?: boolean;
    storage?: boolean;
    willReadFrequently?: boolean;
    [attribute: string]: boolean | string | undefined;
}

/**
 * User provided canvas life cycle methods. These differ from the usual
 * @thi.ng/hdom life cycle methods and are always passed at least the
 * canvas DOM element, canvas context and hdom user context. Not all
 * handlers need to be implemented.
 */
export interface CanvasHandlers<T extends CanvasContext> {
    /**
     * user init handler (called only once when canvas first)
     */
    init: (el: HTMLCanvasElement, ctx: T, hctx?: any, ...args: any[]) => void;
    /**
     * update handler (called for each hdom update iteration)
     */
    update: (el: HTMLCanvasElement, ctx: T, hctx?: any, time?: number, frame?: number, ...args: any[]) => void;
    /**
     * release handler (called only once when canvas element is removed
     * from DOM)
     */
    release: (el: HTMLCanvasElement, ctx: T, hctx?: any, ...args: any[]) => void;
}

/**
 * Configurable canvas component. Used as common base for `canvasWebGL`
 * and `canvas2D` wrappers.
 *
 * @param type canvas context type
 * @param handlers user handlers
 * @param opts canvas context creation options
 */
const _canvas =
    (type, { init, update, release }: Partial<CanvasHandlers<any>>, opts) => {
        let el, ctx;
        let frame = 0;
        let time = 0;
        return {
            init(_el: HTMLCanvasElement, hctx: any, ...args: any[]) {
                el = _el;
                adaptDPI(el, el.width, el.height);
                ctx = el.getContext(type, opts);
                time = Date.now();
                init && init(el, ctx, hctx, ...args);
                update && update(el, ctx, hctx, time, frame++, ...args);
            },
            render(hctx: any, ...args: any[]) {
                ctx && update && update(el, ctx, hctx, Date.now() - time, frame++, ...args);
                return ["canvas", args[0]];
            },
            release(hctx: any, ...args: any[]) {
                release && release(el, ctx, hctx, ...args);
            }
        };
    };

/**
 * Higher order WebGL canvas component delegating to user provided
 * handlers.
 *
 * Note: Since this is an higher order component, if used within a
 * non-static parent component, this function itself cannot be directly
 * inlined into hdom tree and must be initialized prior/outside, however
 * the returned component can be used as normal.
 *
 * ```
 * const glcanvas = canvasWebGL({
 *   render: (canv, gl, hctx, time, frame, ...args) => {
 *     const col = 0.5 + 0.5 * Math.sin(time);
 *     gl.clearColor(col, col, col, 1);
 *   }
 * });
 * ...
 * [glcanvas, {id: "foo", width: 640, height: 480}]
 * ```
 *
 * @param handlers user provided handlers
 * @param opts canvas context creation options
 */
export const canvasWebGL = (
    handlers: Partial<CanvasHandlers<WebGLRenderingContext>>,
    opts?: WebGLContextAttributes) =>
    _canvas("webgl", handlers, opts);

/**
 * Same as `canvasWebGL` but targets WebGL2.
 *
 * @param handlers user provided handlers
 * @param opts canvas context creation options
 */
export const canvasWebGL2 = (
    handlers: Partial<CanvasHandlers<WebGL2RenderingContext>>,
    opts?: WebGLContextAttributes) =>
    _canvas("webgl2", handlers, opts);

/**
 * Similar to `canvasWebGL`, but targets default 2D drawing context.
 *
 * @param handlers user provided handlers
 * @param glopts canvas context creation options
 */
export const canvas2D = (
    handlers: Partial<CanvasHandlers<CanvasRenderingContext2D>>,
    opts?: Canvas2DContextAttributes) =>
    _canvas("2d", handlers, opts);

/**
 * Sets the canvas size to given `width` & `height` and adjusts style to
 * compensate for HDPI devices. Note: For 2D canvases, this will
 * automatically clear any prior canvas content.
 *
 * @param canvas
 * @param width uncompensated pixel width
 * @param height uncompensated pixel height
 */
export const adaptDPI =
    (canvas: HTMLCanvasElement, width: number, height: number) => {
        const dpr = window.devicePixelRatio || 1;
        if (dpr != 1) {
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        return dpr;
    };
