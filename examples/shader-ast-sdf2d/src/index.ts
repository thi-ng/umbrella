import {
    $,
    assign,
    cos,
    defn,
    float,
    FloatSym,
    min,
    mul,
    program,
    ret,
    sym,
    vec2,
    Vec2Sym,
    vec3,
    vec4
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { initRuntime, targetJS } from "@thi.ng/shader-ast-js";
import {
    aspectCorrectedUV,
    fit1101,
    sdfBox2,
    sdfSmoothUnion,
    sdfTriangle2
} from "@thi.ng/shader-ast-stdlib";
import {
    compileModel,
    draw,
    GLSL,
    quad,
    shader
} from "@thi.ng/webgl";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: 100 }); // WebGL
const JS = targetJS();

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("float", "scene", [["vec2"]], (pos) => {
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
        ret(d1)
    ];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
const main = defn(
    "vec4",
    "mainImage",
    [["vec2", "fragCoord"], ["vec2", "res"]],
    (frag, res) => {
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
            )
        ];
    }
);

// actual GLSL fragment shader main function
const glslMain = defn("void", "main", [], () => [
    assign(
        sym("vec4", "o_fragColor"),
        main($(GL.gl_FragCoord, "xy"), sym("vec2", "u_resolution"))
    )
]);

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program(main);

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
    const rt = initRuntime({ canvas });
    let time = 0;

    setInterval(() => {
        time += 0.1;
        rt.update((frag) => fn(frag, size));
    }, 16);
} else {
    //
    // WebGL mode...
    //
    // inject main fs function into AST program
    shaderProgram.body.push(glslMain);
    const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
    // build fullscreen quad
    const model = quad(false);
    // set shader
    model.shader = shader(ctx, {
        vs: GL(
            defn("void", "main", [], () => [
                assign(GL.gl_Position, vec4(sym("vec2", "a_position"), 0, 1))
            ])
        ),
        fs: GL(shaderProgram).replace(/\};/g, "}"),
        attribs: {
            position: GLSL.vec2
        },
        uniforms: {
            resolution: [GLSL.vec2, [W, H]]
        }
    });
    // compile model (attrib buffers)
    compileModel(ctx, model);

    // render loop
    setInterval(() => {
        draw(model);
    });
}
