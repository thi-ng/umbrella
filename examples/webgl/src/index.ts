import { start } from "@thi.ng/hiccup-dom";

// reusable GL canvas component
const glcanvas = (init, update, attribs) => {
    let gl: WebGLRenderingContext;
    let frame = 0;
    return [{
        init(el: HTMLCanvasElement) {
            gl = el.getContext("webgl");
            init(gl);
        },
        render() {
            gl && update(gl, frame++);
            return ["canvas", attribs]
        }
    }];
};

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
        glcanvas(initGL, updateGL(0, 0.01), { width: 100, height: 100 }),
        glcanvas(initGL, updateGL(200, 0.025), { width: 100, height: 100 }),
        glcanvas(initGL, updateGL(400, 0.05), { width: 100, height: 100 })]
);
