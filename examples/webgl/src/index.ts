import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components/canvas";

// canvas init hook
const initGL = (_: WebGLRenderingContext) => {
    // GL context initialization steps
    // ...
};

// canvas render hook closure
const updateGL = (offset, freq) =>
    (gl: WebGLRenderingContext, frame) => {
        const f = offset + frame * freq;
        const red = Math.sin(f) * 0.5 + 0.5;
        const green = Math.sin(f + Math.PI * 1 / 3) * 0.5 + 0.5;
        const blue = Math.sin(f + Math.PI * 2 / 3) * 0.5 + 0.5;
        gl.clearColor(red, green, blue, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

start(
    document.getElementById("app"),
    // instantiate multiple canvases w/ different configs
    ["div",
        canvasWebGL(initGL, updateGL(0, 0.01), { width: 100, height: 100 }),
        canvasWebGL(initGL, updateGL(200, 0.025), { width: 100, height: 100 }),
        canvasWebGL(initGL, updateGL(400, 0.05), { width: 100, height: 100 })]
);
