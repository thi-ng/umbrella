import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components/canvas";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";

// canvas init hook
const initGL = (_: HTMLCanvasElement, __: WebGLRenderingContext) => {
    console.log("init webgl canvas");
    // GL context initialization steps
    // ...
};

/**
 * WebGL canvas update/render hook
 *
 * @param el canvas element
 * @param gl GL context
 * @param ctx hdom user context
 * @param time ms since init
 * @param frame current frame
 * @param args component args
 */
const updateGL = (el: HTMLCanvasElement, gl: WebGLRenderingContext, ctx: any, time: number, frame: number, ...args: any[]) => {
    // destructure args passed to component (see below in `app()`)
    // (ignore 1st arg, i.e. canvas attribs)
    const [_, phase, freq] = args;
    const f = phase + frame * freq;
    const red = Math.sin(f) * 0.5 + 0.5;
    const green = Math.sin(f + Math.PI * 1 / 3) * 0.5 + 0.5;
    const blue = Math.sin(f + Math.PI * 2 / 3) * 0.5 + 0.5;
    gl.clearColor(red, green, blue, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

const app = () => {
    const attribs = { width: 100, height: 100 };
    const [c1, c2, c3] = repeatedly(() => canvasWebGL({ init: initGL, update: updateGL }), 3);
    return ["div",
        ["p", "3 WebGL canvas component instances"],
        [c1, attribs, 0, 0.01],
        [c2, attribs, 200, 0.025],
        [c3, attribs, 400, 0.05]];
};

start("app", app());
