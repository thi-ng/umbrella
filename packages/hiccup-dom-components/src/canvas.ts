export interface CanvasOpts {
    width: number;
    height: number;
    [id: string]: any;
}

const _canvas = (type, init, update, attribs, opts) => {
    let ctx;
    let frame = 0;
    return [{
        init(el: HTMLCanvasElement) {
            ctx = el.getContext(type, opts);
            init(ctx);
        },
        render() {
            ctx && update(ctx, frame++);
            return ["canvas", attribs]
        }
    }];
};

export const canvasWebGL = (
    init: (gl: WebGLRenderingContext) => void,
    update: (gl: WebGLRenderingContext, frame: number) => void,
    attribs: CanvasOpts,
    glopts?: WebGLContextAttributes) =>
    _canvas("webgl", init, update, attribs, glopts);

export const canvas2D = (
    init: (gl: CanvasRenderingContext2D) => void,
    update: (gl: CanvasRenderingContext2D, frame: number) => void,
    attribs: CanvasOpts,
    ctxopts?: Canvas2DContextAttributes) =>
    _canvas("2d", init, update, attribs, ctxopts);
