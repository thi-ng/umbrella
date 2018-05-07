/**
 * User provided canvas life cycle methods. These differ from the usual
 * @thi.ng/hdom life cycle methods and are always passed at least the
 * canvas DOM element, canvas context and hdom user context. Not all
 * handlers need to be implemented.
 */
export interface CanvasHandlers<T> {
    /**
     * user init handler (called only once when canvas first)
     */
    init: (el: HTMLCanvasElement, gl: T, hctx?: any, ...args: any[]) => void;
    /**
     * update handler (called for each hdom update iteration)
     */
    update: (el: HTMLCanvasElement, gl: T, hctx?: any, time?: number, frame?: number, ...args: any[]) => void;
    /**
     * release handler (called only once when canvas element is removed
     * from DOM)
     */
    release: (el: HTMLCanvasElement, gl: T, hctx?: any, ...args: any[]) => void;
}

/**
 * Configurable canvas component. Used as common base for `canvasWebGL`
 * and `canvas2D` wrappers.
 *
 * @param type canvas context type
 * @param handlers user handlers
 * @param opts canvas context creation options
 */
const _canvas = (type, { init, update, release }: Partial<CanvasHandlers<any>>, opts) => {
    let el, ctx;
    let frame = 0;
    let time = 0;
    return {
        init(_el: HTMLCanvasElement, hctx: any, ...args: any[]) {
            el = _el;
            ctx = el.getContext(type, opts);
            time = Date.now();
            init && init(el, ctx, hctx, ...args);
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
