import type { IDeref } from "@thi.ng/api";
import { sin } from "@thi.ng/dsp";
import { start } from "@thi.ng/hdom";
import { canvasWebGL2 } from "@thi.ng/hdom-components";
import { lookAt, perspective, transform44 } from "@thi.ng/matrices";
import { fromRAF, tweenNumber } from "@thi.ng/rstream";
import { benchmark, map, movingAverage, repeatedly } from "@thi.ng/transducers";
import { rotateY } from "@thi.ng/vectors";
import {
    checkerboard,
    compileModel,
    defCubeModel,
    defFBO,
    defQuadModel,
    defRBO,
    defShader,
    defTexture,
    draw,
    FBO,
    GLMat4,
    GLVec3,
    ModelSpec,
    TextureFilter,
    TextureFormat,
    TextureOpts,
    TextureRepeat,
} from "@thi.ng/webgl";
import { CONTROLS, PARAMS, PARAM_DEFS } from "./params";
import { FINAL_SHADER, LIGHT_SHADER, SSAO_SHADER } from "./shaders";

// FBO size
const W = 1024;
const H = 512;

const LIGHT_POS = [-5, 1.5, -1];
const Z_NEAR = 0.1;
const Z_FAR = 20;

// noise texture data for SSAO shader
const NOISE = new Float32Array([
    ...repeatedly(() => Math.random() * 2 - 1, W * H * 2),
]);

// instance position data for animated cubes
const instancePositions = (o: number) =>
    // prettier-ignore
    new Float32Array([
    -o, 0, 0, o, 0, 0,
    0, -2 * o, 0, 0, 2 * o, 0,
    0, 0, -2 * o, 0, 0, 2 * o
]);

const app = () => {
    let model: ModelSpec;
    let ssaoQuad: ModelSpec;
    let finalQuad: ModelSpec;
    let fboGeo: FBO;
    let fboSSAO: FBO;
    const raf = fromRAF();
    const fps = raf.transform(
        benchmark(),
        movingAverage(100),
        map((x: number) => (1000 / x).toFixed(2))
    );
    const canvas = canvasWebGL2({
        init(_, gl: WebGL2RenderingContext) {
            if (!gl.getExtension("EXT_color_buffer_float")) {
                alert("EXT_color_buffer_float not available");
                return;
            }
            const [colorTex, posTex, normTex, noiseTex, ssaoTex] = [
                {},
                { format: TextureFormat.RGBA16F },
                { format: TextureFormat.RGBA16F },
                {
                    image: NOISE,
                    format: TextureFormat.RG16F,
                },
                {},
            ].map((opts: Partial<TextureOpts>) =>
                defTexture(gl, {
                    width: W,
                    height: H,
                    image: null,
                    filter: TextureFilter.NEAREST,
                    wrap: TextureRepeat.CLAMP,
                    ...opts,
                })
            );
            fboGeo = defFBO(gl, {
                tex: [colorTex, posTex, normTex],
                depth: defRBO(gl, { width: W, height: H }),
            });
            fboSSAO = defFBO(gl, {
                tex: [ssaoTex],
            });
            model = compileModel(gl, {
                ...defCubeModel({ uv: true }),
                shader: defShader(gl, LIGHT_SHADER),
                instances: {
                    attribs: {
                        offset: {
                            data: instancePositions(1.05),
                        },
                    },
                    num: 6,
                },
                uniforms: {
                    eyePos: <IDeref<GLVec3>>(
                        tweenNumber(
                            PARAMS.eyeDist,
                            PARAM_DEFS.eyeDist[2],
                            0.05,
                            1e-3,
                            raf
                        ).transform(map((z) => [0, 0, z]))
                    ),
                    lightPos: <IDeref<GLVec3>>(
                        tweenNumber(
                            PARAMS.lightTheta,
                            PARAM_DEFS.lightTheta[2],
                            0.05,
                            1e-3,
                            raf
                        ).transform(
                            map(
                                (theta) => <GLVec3>rotateY([], LIGHT_POS, theta)
                            )
                        )
                    ),
                    specular: <IDeref<number>>PARAMS.specular,
                },
                textures: [
                    defTexture(gl, {
                        image: checkerboard({
                            size: 16,
                            col1: 0xffc0c0c0,
                            col2: 0xffe0e0e0,
                            corners: true,
                        }),
                        filter: TextureFilter.NEAREST,
                        wrap: TextureRepeat.CLAMP,
                    }),
                ],
            });
            ssaoQuad = compileModel(gl, {
                ...defQuadModel({ uv: false }),
                shader: defShader(gl, SSAO_SHADER),
                textures: [posTex, normTex, noiseTex],
                uniforms: {
                    sampleRadius: <IDeref<number>>PARAMS.radius,
                    bias: <IDeref<number>>PARAMS.bias,
                    attenuate: <IDeref<number>>PARAMS.baseAttenuation,
                    attenuateDist: <IDeref<number>>PARAMS.distAttenuation,
                    depthRange: [Z_NEAR, Z_FAR],
                },
            });
            finalQuad = compileModel(gl, {
                ...defQuadModel(),
                shader: defShader(gl, FINAL_SHADER),
                textures: [colorTex, ssaoTex],
                uniforms: {
                    amp: <IDeref<number>>PARAMS.amp,
                },
            });
        },
        update(_, gl, __, time, frame) {
            if (frame < 1 || !model) return;
            const bg = 0.1;
            const eye = (<IDeref<GLVec3>>model.uniforms!.eyePos).deref();
            const p = perspective([], 45, W / H, Z_NEAR, Z_FAR);
            const v = lookAt([], eye, [0, 0, 0], [0, 1, 0]);
            const m = transform44(
                [],
                [0, 0, 0],
                [sin(time, 0.00005, 1, 0), time * 0.0003, 0],
                1
            );
            model.instances!.attribs.offset.buffer!.set(
                instancePositions(sin(time, 0.0004, 0.14, 1.15))
            );
            model.uniforms!.model = <GLMat4>m;
            model.uniforms!.view = <GLMat4>v;
            model.uniforms!.proj = <GLMat4>p;
            gl.viewport(0, 0, W, H);
            fboGeo.bind();
            gl.clearColor(bg, bg, bg, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw(model);
            fboSSAO.bind();
            draw(ssaoQuad);
            fboSSAO.unbind();
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            draw(finalQuad);
        },
    });
    return () => [
        "div.sans-serif.pa3.bg-dark-gray.white",
        [canvas, { width: W, height: H }],
        ["div.fixed.top-0.left-0.z-1.ma3.pa3", fps, " fps"],
        ["div.mt3", ...CONTROLS],
    ];
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
