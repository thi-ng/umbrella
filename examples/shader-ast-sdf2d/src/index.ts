import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { canvasRenderer, targetJS } from "@thi.ng/shader-ast-js";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { aspectCorrectedUV } from "@thi.ng/shader-ast-stdlib/screen/uv";
import { sdfBox2 } from "@thi.ng/shader-ast-stdlib/sdf/box";
import { sdfSmoothUnion } from "@thi.ng/shader-ast-stdlib/sdf/smooth-union";
import { sdfTriangle2 } from "@thi.ng/shader-ast-stdlib/sdf/tri";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain, defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";
import { program } from "@thi.ng/shader-ast/ast/scope";
import { $xy } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { cos, min } from "@thi.ng/shader-ast/builtin/math";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defQuadModel } from "@thi.ng/webgl/geo/quad";
import { defShader } from "@thi.ng/webgl/shader";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100 }); // WebGL
const JS = targetJS();

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("float", "scene", ["vec2"], (pos) => {
    let d1: FloatSym;
    let d2: FloatSym;
    let d3: FloatSym;
    return [
        // assign(pos, sdTxRepeat2(pos, vec2(2))),
        (d1 = sym(
            sdfTriangle2(pos, vec2(1, 0.7), vec2(0, -1.3), vec2(-1, 0.7))
        )),
        assign(
            d1,
            min(
                d1,
                sdfTriangle2(pos, vec2(1, -0.7), vec2(0, 1.3), vec2(-1, -0.7))
            )
        ),
        (d2 = sym(sdfBox2(pos, vec2(1.5, 0.2)))),
        (d3 = sym(sdfBox2(pos, vec2(0.2, 1.5)))),
        assign(
            d1,
            sdfSmoothUnion(sdfSmoothUnion(d3, d2, float(0.5)), d1, float(0.5))
        ),
        ret(d1),
    ];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
const mainImage = defn("vec4", "mainImage", ["vec2", "vec2"], (frag, res) => {
    let uv: Vec2Sym;
    let d: FloatSym;
    let f = 100;
    return [
        (uv = sym(mul(aspectCorrectedUV(frag, res), float(2)))),
        (d = sym(scene(uv))),
        ret(
            vec4(
                vec3(
                    fit1101(cos(mul(d, float(f)))),
                    fit1101(cos(mul(d, float(f * 1.02)))),
                    fit1101(cos(mul(d, float(f * 1.05))))
                ),
                1
            )
        ),
    ];
});

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program([mainImage]);

console.log("JS");
console.log(JS(shaderProgram));
console.log("GLSL");
console.log(GL(shaderProgram));

const W = 640;
const H = 640;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);
const info = document.createElement("div");
info.innerText = (JS_MODE ? "Canvas2D" : "WebGL2") + " version";
document.body.appendChild(info);

if (JS_MODE) {
    //
    // JS Canvas 2D shader emulation from here...
    //
    const fn = JS.compile(shaderProgram).mainImage;
    const rt = canvasRenderer(canvas);

    setInterval(() => {
        rt((frag) => fn(frag, size));
    }, 16);
} else {
    //
    // WebGL mode...
    //
    const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
    // build fullscreen quad
    const model = defQuadModel({ uv: false });
    // set shader
    model.shader = defShader(ctx, {
        vs: (gl, _, attribs) => [
            defMain(() => [
                assign(gl.gl_Position, vec4(attribs.position, 0, 1)),
            ]),
        ],
        fs: (gl, unis, _, outs) => [
            mainImage,
            defMain(() => [
                assign(
                    outs.fragColor,
                    mainImage($xy(gl.gl_FragCoord), unis.resolution)
                ),
            ]),
        ],
        attribs: {
            position: "vec2",
        },
        uniforms: {
            resolution: ["vec2", [W, H]],
        },
    });
    // compile model (attrib buffers)
    compileModel(ctx, model);

    // render loop
    setInterval(() => {
        draw(model);
    });
}
