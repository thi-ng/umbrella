import { start } from "@thi.ng/hiccup-dom";

let frame = 0;

// reusable GL canvas component
const glcanvas = (init, update, attribs) => {
    let gl: WebGLRenderingContext;
    return [{
        init(el: HTMLCanvasElement) {
            gl = el.getContext("webgl");
            init(gl);
        },
        render() {
            gl && update(gl);
            return ["canvas", attribs]
        }
    }];
};

// canvas init hook
const initGL = (_: WebGLRenderingContext) => {
    // init here
};

// canvas render hook
const updateGL = (offset) =>
    (gl: WebGLRenderingContext) => {
        frame++;
        const f = offset + frame * 0.01;
        const red = Math.sin(f) * 0.5 + 0.5;
        const green = Math.sin(f + Math.PI * 1 / 3) * 0.5 + 0.5;
        const blue = Math.sin(f + Math.PI * 2 / 3) * 0.5 + 0.5;
        gl.clearColor(red, green, blue, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

start(
    document.getElementById("app"),
    // instantiate multiple canvases
    ["div",
        glcanvas(initGL, updateGL(0), { width: 100, height: 100 }),
        glcanvas(initGL, updateGL(200), { width: 100, height: 100 }),
        glcanvas(initGL, updateGL(400), { width: 100, height: 100 })]
);
