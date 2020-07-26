import { ABGR8888, canvas2d, PackedBuffer } from "@thi.ng/pixel";
import {
    $x,
    $xyz,
    assign,
    defMain,
    fract,
    index,
    length,
    mul,
    pow,
    sin,
    sub,
    sym,
    texture,
    Vec2Sym,
    vec3,
    vec4,
    Vec4Sym,
} from "@thi.ng/shader-ast";
import { clamp01, fit1101, fragUV } from "@thi.ng/shader-ast-stdlib";
import {
    defMultiPass,
    glCanvas,
    readTexture,
    TextureFormat,
    TextureType,
} from "@thi.ng/webgl";

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
                                    $xyz(texture(index(unis.inputs, 0), uv)),
                                    pow(
                                        $x(texture(index(unis.inputs, 1), uv)),
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
new PackedBuffer(
    32,
    32,
    ABGR8888,
    readTexture(
        canvas.gl,
        toy.textures.bar,
        TextureFormat.RGBA,
        TextureType.UNSIGNED_BYTE,
        new Uint8Array(32 * 32 * 4)
    )
).blitCanvas(canv.canvas);

toy.start();

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => toy.stop());
}
