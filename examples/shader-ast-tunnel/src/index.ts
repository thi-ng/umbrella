import { intAbgr32Srgb } from "@thi.ng/color/int/int-srgb";
import { ABGR8888 } from "@thi.ng/pixel/format/abgr8888";
import { packedBuffer } from "@thi.ng/pixel/packed";
import { defSampler } from "@thi.ng/pixel/sample";
import type { FloatSym, Vec2Sym } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import {
    canvasRenderer,
    JS_DEFAULT_ENV,
    targetJS,
} from "@thi.ng/shader-ast-js";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain, defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec2, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, neg } from "@thi.ng/shader-ast/ast/ops";
import { program } from "@thi.ng/shader-ast/ast/scope";
import { $x, $xy, $xyz, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { atan, pow } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import { TextureFilter, TextureRepeat } from "@thi.ng/webgl/api/texture";
import { compileModel } from "@thi.ng/webgl/buffer";
import { draw } from "@thi.ng/webgl/draw";
import { defQuadModel } from "@thi.ng/webgl/geo/quad";
import { defShader } from "@thi.ng/webgl/shader";
import { FX_SHADER_SPEC } from "@thi.ng/webgl/shaders/pipeline";
import { defTexture } from "@thi.ng/webgl/texture";
import TEX_URL from "./tex.jpg";

// set URL hash to "#2d" to enable JS Canvas2D version
const JS_MODE = location.hash.indexOf("2d") >= 0;

// AST compile targets
const GL = targetGLSL({ version: GLSLVersion.GLES_100 }); // WebGL
const JS = targetJS();

// https://www.shadertoy.com/view/Ms2SWW (by iq)
const mainImage = defn(
    "vec4",
    "mainImage",
    ["vec2", "vec2", "float", "sampler2D"],
    (frag, res, time, tex) => {
        let p: Vec2Sym;
        let q: Vec2Sym;
        let uv: Vec2Sym;
        let r: FloatSym;
        return [
            (p = sym(div(add(neg(res), mul(frag, 2)), $y(res)))),
            (q = sym(pow(mul(p, p), vec2(4)))),
            (r = sym(pow(add($x(q), $y(q)), float(1 / 8)))),
            (uv = sym(
                vec2(
                    add(div(0.3, r), time),
                    div(atan($y(p), $x(p)), float(Math.PI))
                )
            )),
            ret(vec4(mul($xyz(texture(tex, uv)), r), 1)),
        ];
    }
);

// assemble all functions in a global scope for code generation...
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
        // codegen target, we're patching in a simple wrap-around 2D
        // lookup ourselves...
        // JS_DEFAULT_ENV.sampler2D.texture = (_, uv) => {
        //     let x = ((uv[0] * TW) | 0) % TW;
        //     let y = ((uv[1] * TH) | 0) % TH;
        //     x < 0 && (x += TW);
        //     y < 0 && (y += TH);
        //     return intAbgr32Srgb([], texData[y * TW + x]);
        // };

        // alternatively use custom image sampler to perform
        // filtered texture lookups:
        const sampler = defSampler(
            packedBuffer(TW, TH, ABGR8888, texData),
            "nearest",
            "wrap"
        );
        JS_DEFAULT_ENV.sampler2D.texture = (_, uv) =>
            intAbgr32Srgb([], sampler(uv[0] * TW, uv[1] * TH));

        // compile AST to actual JS:
        // under the hood all vector & matrix operations delegate to
        // thi.ng/vectors and thi.ng/matrices packages by default
        const fn = JS.compile(shaderProgram).mainImage;
        const rt = canvasRenderer(canvas);
        let time = 0;

        setInterval(() => {
            time += 0.05;
            rt((frag) => fn(frag, size, time));
        }, 16);
    });
} else {
    //
    // WebGL mode...
    //
    preload.then(() => {
        const ctx: WebGLRenderingContext = canvas.getContext("webgl")!;
        // build fullscreen quad
        const model = {
            ...defQuadModel({ uv: false }),
            shader: defShader(ctx, {
                ...FX_SHADER_SPEC,
                fs: (gl, unis, _, outs) => [
                    mainImage,
                    defMain(() => [
                        assign(
                            outs.fragColor,
                            mainImage(
                                $xy(gl.gl_FragCoord),
                                unis.resolution,
                                unis.time,
                                unis.tex
                            )
                        ),
                    ]),
                ],
                uniforms: {
                    resolution: ["vec2", [W, H]],
                    time: "float",
                    tex: ["sampler2D", 0],
                },
            }),
            textures: [
                defTexture(ctx, {
                    image: tex,
                    filter: TextureFilter.LINEAR,
                    wrap: TextureRepeat.REPEAT,
                }),
            ],
        };

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
