import type { FloatSym, Vec2Sym, Vec3Sym } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { canvasRenderer } from "@thi.ng/shader-ast-js/runtime";
import { targetJS } from "@thi.ng/shader-ast-js/target";
import { fogExp2 } from "@thi.ng/shader-ast-stdlib/fog/exp2";
import {
    diffuseLighting,
    halfLambert,
} from "@thi.ng/shader-ast-stdlib/light/lambert";
import { clamp01 } from "@thi.ng/shader-ast-stdlib/math/clamp";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { lookat } from "@thi.ng/shader-ast-stdlib/matrix/lookat";
import { raymarchAO } from "@thi.ng/shader-ast-stdlib/raymarch/ao";
import { raymarchDir } from "@thi.ng/shader-ast-stdlib/raymarch/direction";
import { raymarchNormal } from "@thi.ng/shader-ast-stdlib/raymarch/normal";
import { rayPointAt } from "@thi.ng/shader-ast-stdlib/raymarch/point-at";
import { raymarchScene } from "@thi.ng/shader-ast-stdlib/raymarch/scene";
import { sdfBox3 } from "@thi.ng/shader-ast-stdlib/sdf/box";
import { sdfRepeat3 } from "@thi.ng/shader-ast-stdlib/sdf/repeat";
import { sdfSmoothUnion } from "@thi.ng/shader-ast-stdlib/sdf/smooth-union";
import { sdfSphere } from "@thi.ng/shader-ast-stdlib/sdf/sphere";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defMain, defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { gte, mul } from "@thi.ng/shader-ast/ast/ops";
import { program } from "@thi.ng/shader-ast/ast/scope";
import { $x, $xy, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { mix } from "@thi.ng/shader-ast/builtin/math";
import {
    compileModel,
    defQuadModel,
    defShader,
    draw,
    GLVec3,
} from "@thi.ng/webgl";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100, versionPragma: false }); // WebGL
const JS = targetJS();

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("vec2", "scene", ["vec3"], (pos) => {
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
        ),
    ];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
const mainImage = defn(
    "vec4",
    "mainImage",
    ["vec2", "vec2", "vec3", "vec3"],
    (frag, res, eyePos, lightDir) => {
        let dir: Vec3Sym;
        let result: Vec2Sym;
        let isec: Vec3Sym;
        let norm: Vec3Sym;
        let material: Vec3Sym;
        let diffuse: FloatSym;
        // background color
        const bg = vec3(1.5, 0.6, 0);
        const ambient = vec3(0.15, 0.06, 0);
        return [
            // compute ray dir from fragCoord, viewport res and FOV
            // then apply basic camera settings (eye, target, up)
            (dir = sym(
                $xyz(
                    mul(
                        lookat(eyePos, vec3(), vec3(0, 1, 0)),
                        vec4(raymarchDir(frag, res, float(120)), 0)
                    )
                )
            )),
            // perform raymarch
            (result = sym(
                // `raymarchScene` is a higher-order, configurable function which constructs
                // a raymarch function using our supplied scene fn
                raymarchScene(scene, { steps: JS_MODE ? 60 : 80, eps: 0.005 })(
                    eyePos,
                    dir
                )
            )),
            // early bailout if nothing hit
            ifThen(gte($x(result), float(10)), [ret(vec4(bg, 1))]),
            // set intersection pos
            (isec = sym(rayPointAt(eyePos, dir, $x(result)))),
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
                    halfLambert(norm, lightDir),
                    // higher order fn to compute ambient occlusion
                    raymarchAO(scene)(isec, norm)
                )
            )),
            // combine lighting & material colors
            ret(
                vec4(
                    mix(
                        clamp01(
                            diffuseLighting(diffuse, material, vec3(1), ambient)
                        ),
                        bg,
                        fogExp2($x(result), float(0.2))
                    ),
                    1
                )
            ),
        ];
    }
);

// build call graph for given entry function, sort in topological order
// and bundle all functions in a global scope for code generation...
const shaderProgram = program([mainImage]);

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
info.innerText = (JS_MODE ? "Canvas2D" : "WebGL") + " version";
document.body.appendChild(info);

const lightDir = [0.707, 0.707, 0];

if (JS_MODE) {
    //
    // JS Canvas 2D shader emulation from here...
    //
    const fn = JS.compile(shaderProgram).mainImage;
    const rt = canvasRenderer(canvas);
    let time = 0;

    setInterval(() => {
        time += 0.1;
        const eyePos = [
            Math.cos(time) * 2.5,
            Math.cos(time / 2) * 0.7,
            Math.sin(time) * 2.5,
        ];
        rt((frag) => fn(frag, size, eyePos, lightDir));
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
        vs: (_, __, attribs) => [
            defMain(() => [
                assign(GL.gl_Position, vec4(attribs.position, 0, 1)),
            ]),
        ],
        fs: (gl, unis, _, outputs) => [
            mainImage,
            defMain(() => [
                assign(
                    outputs.fragColor,
                    mainImage(
                        $xy(gl.gl_FragCoord),
                        unis.resolution,
                        unis.eyePos,
                        unis.lightDir
                    )
                ),
            ]),
        ],
        attribs: {
            position: "vec2",
        },
        uniforms: {
            eyePos: "vec3",
            lightDir: ["vec3", <GLVec3>lightDir],
            resolution: ["vec2", [W, H]],
        },
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
            Math.sin(time) * 2.5,
        ];
        draw(model);
    });
}
