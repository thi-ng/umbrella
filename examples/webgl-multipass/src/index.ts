import { canvas2d } from "@thi.ng/pixel/canvas";
import { GRAY8 } from "@thi.ng/pixel/format/gray8";
import { packedBuffer } from "@thi.ng/pixel/packed";
import type { Vec2Sym, Vec4Sym } from "@thi.ng/shader-ast";
import { clamp01 } from "@thi.ng/shader-ast-stdlib/math/clamp";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { fragUV } from "@thi.ng/shader-ast-stdlib/screen/uv";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { defMain } from "@thi.ng/shader-ast/ast/function";
import { vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { $x, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { fract, length, pow, sin } from "@thi.ng/shader-ast/builtin/math";
import { texture } from "@thi.ng/shader-ast/builtin/texture";
import { TextureFormat, TextureType } from "@thi.ng/webgl/api/texture";
import { glCanvas } from "@thi.ng/webgl/canvas";
import { defMultiPass } from "@thi.ng/webgl/multipass";
import { readTexture } from "@thi.ng/webgl/readpixels";

// create WebGL canvas
const canvas = glCanvas({
    // width: window.innerWidth,
    // height: window.innerHeight,
    width: 512,
    height: 512,
    parent: document.body,
    version: 2,
});

// init multipass shader pipeline
const toy = defMultiPass({
    gl: canvas.gl,
    width: 32,
    height: 32,
    textures: {
        foo: { format: TextureFormat.RGBA32F },
        bar: { format: TextureFormat.R32F },
    },
    passes: [
        {
            fs: (gl, unis, _, outs) => [
                defMain(() => {
                    let uv: Vec2Sym;
                    return [
                        (uv = sym(fragUV(gl.gl_FragCoord, unis.resolution))),
                        assign(
                            outs.output0,
                            vec4(vec3(uv, fract(unis.time)), 1)
                        ),
                        assign(
                            outs.output1,
                            vec4(clamp01(length(sub(uv, 0.5))))
                        ),
                    ];
                }),
            ],
            inputs: [],
            outputs: ["foo", "bar"],
            uniforms: {
                time: "float",
                resolution: "vec2",
            },
            uniformVals: {
                // foo: () => Math.random()
            },
        },
        {
            fs: (gl, unis, _, outs) => [
                defMain(() => {
                    let uv: Vec2Sym;
                    return [
                        (uv = sym(fragUV(gl.gl_FragCoord, unis.resolution))),
                        assign(
                            <Vec4Sym>outs.fragColor,
                            vec4(
                                mul(
                                    $xyz(texture(unis.input0, uv)),
                                    pow(
                                        $x(texture(unis.input1, uv)),
                                        fit1101(sin(unis.time))
                                    )
                                ),
                                1
                            )
                        ),
                    ];
                }),
            ],
            inputs: ["foo", "bar"],
            outputs: [],
            uniforms: {
                resolution: "vec2",
                time: "float",
            },
        },
    ],
});

toy.update(0);

const canv = canvas2d(32, 32);
document.body.appendChild(canv.canvas);
packedBuffer(
    32,
    32,
    GRAY8,
    readTexture(
        canvas.gl,
        toy.textures.bar,
        TextureFormat.RED,
        TextureType.UNSIGNED_BYTE,
        new Uint8Array(32 * 32)
    )
).blitCanvas(canv.canvas);

toy.start();
