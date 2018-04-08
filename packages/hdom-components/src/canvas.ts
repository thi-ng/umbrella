export interface CanvasOpts {
    width: number;
    height: number;
    [id: string]: any;
}

export type WebGLInitFn = (el: HTMLCanvasElement, gl: WebGLRenderingContext, hctx?: any) => void;
export type WebGLUpdateFn = (el: HTMLCanvasElement, gl: WebGLRenderingContext, hctx?: any, frame?: number) => void;

export type Canvas2DInitFn = (el: HTMLCanvasElement, gl: CanvasRenderingContext2D, hctx?: any) => void;
export type Canvas2DUpdateFn = (el: HTMLCanvasElement, gl: CanvasRenderingContext2D, hctx?: any, frame?: number) => void;

const _canvas = (type, init, update, attribs, opts) => {
    let el, ctx;
    let frame = 0;
    return [{
        init(el: HTMLCanvasElement, hctx: any) {
            ctx = el.getContext(type, opts);
            init(el, ctx, hctx);
        },
        render(hctx: any) {
            ctx && update(el, ctx, hctx, frame++);
            return ["canvas", attribs]
        }
    }];
};

export const canvasWebGL = (
    init: WebGLInitFn,
    update: WebGLUpdateFn,
    attribs: CanvasOpts,
    glopts?: WebGLContextAttributes) =>
    _canvas("webgl", init, update, attribs, glopts);

export const canvas2D = (
    init: Canvas2DInitFn,
    update: Canvas2DUpdateFn,
    attribs: CanvasOpts,
    ctxopts?: Canvas2DContextAttributes) =>
    _canvas("2d", init, update, attribs, ctxopts);
