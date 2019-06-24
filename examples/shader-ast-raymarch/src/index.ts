import {
    $,
    $x,
    add,
    assign,
    defn,
    float,
    FloatSym,
    gte,
    ifThen,
    mix,
    mul,
    program,
    ret,
    sym,
    TRUE,
    vec2,
    Vec2Sym,
    vec3,
    Vec3Sym,
    vec4
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { initRuntime, targetJS } from "@thi.ng/shader-ast-js";
import {
    clamp01,
    diffuseLighting,
    fit1101,
    fogExp2,
    lambert,
    lookat,
    raymarchAO,
    raymarchDir,
    raymarchNormal,
    raymarchScene,
    sdfBox3,
    sdfRepeat3,
    sdfSmoothUnion,
    sdfSphere
} from "@thi.ng/shader-ast-stdlib";
import {
    compileModel,
    draw,
    GLSL,
    GLVec3,
    quad,
    shader
} from "@thi.ng/webgl";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL(300); // WebGL2
const JS = targetJS();

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("vec2", "scene", [["vec3"]], (pos) => {
    let d1: FloatSym;
    let d2: FloatSym;
    let d3: FloatSym;
    let d4: FloatSym;
    return [
        assign(pos, sdfRepeat3(pos, vec3(2.1))),
        (d1 = sym(sdfSphere(pos, float(0.5)))),
        (d2 = sym(sdfBox3(pos, vec3(1, 0.2, 0.2)))),
        (d3 = sym(sdfBox3(pos, vec3(0.2, 0.2, 1)))),
        (d4 = sym(sdfBox3(pos, vec3(0.2, 1, 0.2)))),
        ret(
            vec2(
                sdfSmoothUnion(
                    sdfSmoothUnion(
                        sdfSmoothUnion(d1, d2, float(0.2)),
                        d3,
                        float(0.2)
                    ),
                    d4,
                    float(0.2)
                ),
                1
            )
        )
    ];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
const main = defn(
    "vec4",
    "mainImage",
    [
        ["vec2", "fragCoord"],
        ["vec2", "res"],
        ["vec3", "eyePos"],
        ["vec3", "lightDir"]
    ],
    (frag, res, eyePos, lightDir) => {
        let dir: Vec3Sym;
        let result: Vec2Sym;
        let isec: Vec3Sym;
        let norm: Vec3Sym;
        let material: Vec3Sym;
        let diffuse: FloatSym;
        // background color
        const bg = vec3(1.5, 0.6, 0);
        return [
            // compute ray dir from fragCoord, viewport res and FOV
            // then apply basic camera settings (eye, target, up)
            (dir = sym(
                $(
                    mul(
                        lookat(eyePos, vec3(), vec3(0, 1, 0)),
                        vec4(raymarchDir(frag, res, float(120)), 0)
                    ),
                    "xyz"
                )
            )),
            // perform raymarch
            (result = sym(
                // `raymarchScene` is a higher-order, configurable function which constructs
                // a raymarch function using our supplied scene fn
                raymarchScene(scene, { steps: JS_MODE ? 60 : 60, eps: 0.005 })(
                    eyePos,
                    dir
                )
            )),
            // early bailout if nothing hit
            ifThen(gte($x(result), float(10)), [ret(vec4(bg, 1))]),
            // set intersection pos
            (isec = sym(add(eyePos, mul(dir, $x(result))))),
            // surface normal
            (norm = sym(
                // higher-order fn to compute surface normal
                raymarchNormal(scene)(isec, float(0.01))
            )),
            // set material color
            (material = sym(fit1101(isec))),
            // compute diffuse term
            (diffuse = sym(
                mul(
                    lambert(norm, lightDir, TRUE),
                    // higher order fn to compute ambient occlusion
                    raymarchAO(scene)(isec, norm)
                )
            )),
            // combine lighting & material colors
            ret(
                vec4(
                    mix(
                        clamp01(
                            diffuseLighting(
                                diffuse,
                                material,
                                vec3(1),
                                vec3(0.2)
                            )
                        ),
                        bg,
                        fogExp2($x(result), float(0.2))
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
        main(
            $(GL.gl_FragCoord, "xy"),
            sym("vec2", "u_resolution"),
            sym("vec3", "u_eyePos"),
            sym("vec3", "u_lightDir")
        )
    )
]);

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program(main);

console.log("JS");
console.log(JS(shaderProgram));
console.log("GLSL");
console.log(GL(shaderProgram));

const W = 320;
const H = 240;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);
const info = document.createElement("div");
info.innerText = (JS_MODE ? "Canvas2D" : "WebGL2") + " version";
document.body.appendChild(info);

const lightDir = [0.707, 0.707, 0];

if (JS_MODE) {
    //
    // JS Canvas 2D shader emulation from here...
    //
    const fn = JS.compile(shaderProgram).mainImage;
    const rt = initRuntime({ canvas });
    let time = 0;

    setInterval(() => {
        time += 0.1;
        const eyePos = [
            Math.cos(time) * 2.5,
            Math.cos(time / 2) * 0.7,
            Math.sin(time) * 2.5
        ];
        rt.update((frag) => fn(frag, size, eyePos, lightDir));
    }, 16);
} else {
    //
    // WebGL mode...
    //
    // inject main fs function into AST program
    shaderProgram.body.push(glslMain);
    const ctx: WebGL2RenderingContext = canvas.getContext("webgl2")!;
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
            eyePos: GLSL.vec3,
            lightDir: [GLSL.vec3, <GLVec3>lightDir],
            resolution: [GLSL.vec2, [W, H]]
        }
    });
    // compile model (attrib buffers)
    compileModel(ctx, model);

    const t0 = Date.now();
    // render loop
    setInterval(() => {
        const time = (Date.now() - t0) * 0.001;
        model.uniforms!.eyePos = [
            Math.cos(time) * 2.5,
            Math.cos(time / 2) * 0.7,
            Math.sin(time) * 2.5
        ];
        draw(model);
    });
}
