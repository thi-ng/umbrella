import { swizzle8 } from "@thi.ng/binary";
import { rgbaInt } from "@thi.ng/color";
import {
    $,
    add,
    aspectCorrectedUV,
    assign,
    clamp01,
    defn,
    diffuseLighting,
    eq,
    fit1101,
    float,
    ifThen,
    lambert,
    mul,
    program,
    raymarch,
    raymarchDir,
    raymarchNormal,
    ret,
    sdAABB,
    sdBlend,
    sdSphere,
    Sym,
    sym,
    targetGLSL,
    targetJS,
    TRUE,
    vec2,
    vec3,
    vec4
} from "@thi.ng/shader-ast";
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
const GL = targetGLSL();
const JS = targetJS();

// scene definition for raymarch function. uses SDF primitive functions
// included in "standard library" bundled with shader-ast pkg
const scene = defn("vec2", "scene", [["vec3"]], (pos) => {
    let d1: Sym<"f32">;
    let d2: Sym<"f32">;
    let d3: Sym<"f32">;
    return [
        (d1 = sym(sdSphere(pos, float(0.5)))),
        (d2 = sym(sdAABB(pos, vec3(1, 0.2, 0.2)))),
        (d3 = sym(sdAABB(pos, vec3(0.2, 0.2, 1)))),
        ret(vec2(sdBlend(sdBlend(d1, d2, float(0.2)), d3, float(0.2)), 1))
    ];
});

// build raymarcher using provided scene function
// `raymarch` is a higher-order, configurable function which constructs
// a raymarch function using our supplied scene fn
const march = raymarch(scene, { steps: JS_MODE ? 40 : 60 });
const normal = raymarchNormal(scene);

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
        let uv: Sym<"vec2">;
        let dir: Sym<"vec3">;
        let result: Sym<"vec2">;
        let isec: Sym<"vec3">;
        let material: Sym<"vec3">;
        let diffuse: Sym<"f32">;
        return [
            // compute UV from fragCoord & viewport res
            (uv = sym(aspectCorrectedUV(frag, res))),
            // ray dir for given fragment & basic camera settings (eye, target, up)
            (dir = sym(raymarchDir(eyePos, vec3(), vec3(0, 1, 0), uv))),
            // perform raymarch
            (result = sym(march(eyePos, dir))),
            // set intersection pos
            (isec = sym(add(eyePos, mul(dir, $(result, "x"))))),
            // set material
            (material = sym(vec3())),
            ifThen(eq($(result, "y"), float(1)), [
                assign(material, fit1101(isec))
            ]),
            // compute diffuse term
            (diffuse = sym(lambert(normal(isec, float(0.01)), lightDir, TRUE))),
            // combine lighting & material colors
            ret(
                vec4(
                    clamp01(
                        diffuseLighting(diffuse, material, vec3(1), vec3(0.2))
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

    const ctx = canvas.getContext("2d")!;
    const img = ctx.getImageData(0, 0, W, H);
    const u32 = new Uint32Array(img.data.buffer);
    let time = 0;

    setInterval(() => {
        time += 0.1;
        const frag = [];
        const eyePos = [Math.cos(time * 0.75) * 1.5, Math.sin(time) * 1.5, 1];
        for (let y = 0, i = 0; y < H; y++) {
            frag[1] = y;
            for (let x = 0; x < W; x++) {
                frag[0] = x;
                u32[i++] = swizzle8(
                    rgbaInt(fn(frag, size, eyePos, lightDir)),
                    0,
                    3,
                    2,
                    1
                );
            }
        }
        ctx.putImageData(img, 0, 0);
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
            Math.cos(time * 0.75) * 1.5,
            Math.sin(time) * 1.5,
            1
        ];
        draw(model);
    });
}
