import { swizzle8 } from "@thi.ng/binary";
import { int32Rgba, rgbaInt } from "@thi.ng/color";
import {
    $,
    add,
    assign,
    atan,
    defn,
    div,
    float,
    JS_DEFAULT_ENV,
    mul,
    neg,
    pow,
    ret,
    scope,
    sym,
    Sym,
    targetGLSL,
    targetJS,
    texture,
    vec2,
    vec4
} from "@thi.ng/shader-ast";
import {
    compileModel,
    draw,
    GLSL,
    quad,
    shader,
    texture as glTexture
} from "@thi.ng/webgl";
import TEX_URL from "../assets/tex.jpg";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL(100);
const JS = targetJS();

// https://www.shadertoy.com/view/Ms2SWW (by iq)
const main = defn(
    "vec4",
    "mainImage",
    [
        ["vec2", "fragCoord"],
        ["vec2", "res"],
        ["f32", "time"],
        ["sampler2D", "tex"]
    ],
    (frag, res, time, tex) => {
        let p: Sym<"vec2">;
        let uv: Sym<"vec2">;
        let col: Sym<"vec3">;
        let r: Sym<"f32">;
        return [
            (p = sym(div(add(neg(res), mul(frag, float(2))), $(res, "y")))),
            (r = sym(
                pow(
                    add(
                        pow(mul($(p, "x"), $(p, "x")), float(4)),
                        pow(mul($(p, "y"), $(p, "y")), float(4))
                    ),
                    float(1 / 8)
                )
            )),
            (uv = sym(
                vec2(
                    add(div(float(0.3), r), time),
                    div(atan(div($(p, "y"), $(p, "x"))), float(Math.PI))
                )
            )),
            (col = sym(mul($(texture(tex, uv), "xyz"), r))),
            ret(vec4(col, float(1)))
        ];
    }
);

// actual GLSL fragment shader main function
const glslMain = defn(
    "void",
    "main",
    [],
    () => [
        assign(
            sym("vec4", "o_fragColor"),
            main(
                $(GL.gl_FragCoord, "xy"),
                sym("vec2", "u_resolution"),
                sym("f32", "u_time"),
                sym("sampler2D", "u_tex")
            )
        )
    ]
    // [main]
);

// assemble all functions in a global scope for code generation...
const shaderProgram = scope([main, glslMain], true);

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

const tex = new Image();

// preload texture
const preload = (async () => {
    tex.src = TEX_URL;
    await tex.decode();
})();

if (JS_MODE) {
    //
    // JS Canvas 2D shader emulation from here...
    //
    preload.then(() => {
        const texCanv = document.createElement("canvas");
        const TW = (texCanv.width = tex.width);
        const TH = (texCanv.height = tex.height);
        const texCtx = texCanv.getContext("2d")!;
        texCtx.drawImage(tex, 0, 0);
        const texData = new Uint32Array(
            texCtx!.getImageData(0, 0, TW, TH).data.buffer
        );

        // since texture sampling is not (yet) supported for the JS
        // codegen target, we're patching in a simple wrap around lookup
        // ourselves...
        const env = { ...JS_DEFAULT_ENV };
        env.sampler2D.texture = (_, uv) => {
            let x = ((uv[0] * TW) | 0) % TW;
            let y = ((uv[1] * TH) | 0) % TH;
            x < 0 && (x += TW);
            y < 0 && (y += TH);
            return int32Rgba([], swizzle8(texData[y * TW + x], 0, 3, 2, 1));
        };

        // compile AST to actual JS:
        // under the hood all vector & matrix operations delegate to
        // thi.ng/vectors and thi.ng/matrices packages by default
        const fn = JS.compile(shaderProgram).mainImage;

        // prep main pixel buffer
        const ctx = canvas.getContext("2d");
        const img = ctx!.getImageData(0, 0, W, H);
        const u32 = new Uint32Array(img.data.buffer);
        let time = 0;

        setInterval(() => {
            time += 0.05;
            const frag = [];
            for (let y = 0, i = 0; y < H; y++) {
                frag[1] = y;
                for (let x = 0; x < W; x++) {
                    frag[0] = x;
                    // the swizzle8 is needed to convert RGBA to BGRA
                    const col = swizzle8(
                        rgbaInt(fn(frag, size, time)),
                        0,
                        3,
                        2,
                        1
                    );
                    u32[i++] = col;
                }
            }
            ctx!.putImageData(img, 0, 0);
        }, 16);
    });
} else {
    //
    // WebGL mode...
    //
    preload.then(() => {
        const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
        // build fullscreen quad
        const model = quad(false);
        // set shader
        model.shader = shader(ctx, {
            vs: GL(
                defn("void", "main", [], () => [
                    assign(
                        GL.gl_Position,
                        vec4(sym("vec2", "a_position"), 0, 1)
                    )
                ])
            ),
            fs: GL(shaderProgram).replace(/\};/g, "}"),
            attribs: {
                position: GLSL.vec2
            },
            uniforms: {
                resolution: [GLSL.vec2, [W, H]],
                time: GLSL.float,
                tex: [GLSL.sampler2D, 0]
            }
        });
        model.textures = [glTexture(ctx, { image: tex, filter: ctx.LINEAR })];

        // compile model (attrib buffers)
        compileModel(ctx, model);

        const t0 = Date.now();
        // render loop
        setInterval(() => {
            const time = (Date.now() - t0) * 0.001;
            model.uniforms!.time = time;
            draw(model);
        });
    });
}
