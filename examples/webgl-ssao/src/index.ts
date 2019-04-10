import { sin } from "@thi.ng/dsp";
import { start } from "@thi.ng/hdom";
import { canvasWebGL2 } from "@thi.ng/hdom-components";
import { lookAt, perspective, transform44 } from "@thi.ng/matrices";
import { map, repeatedly } from "@thi.ng/transducers";
import { rotateY } from "@thi.ng/vectors";
import {
    checkerboard,
    compileModel,
    cube,
    draw,
    error,
    fbo,
    FBO,
    GLMat4,
    GLVec3,
    ModelSpec,
    quad,
    rbo,
    shader,
    texture,
    TextureOpts
} from "@thi.ng/webgl";
import { CONTROLS, PARAMS } from "./params";
import { FINAL_SHADER, LIGHT_SHADER, SSAO_SHADER } from "./shaders";

const W = 1024;
const H = 512;

const LIGHT_POS = [-5, 1.5, -1];
const Z_NEAR = 0.1;
const Z_FAR = 20;

const NOISE = new Float32Array([
    ...repeatedly(() => Math.random() * 2 - 1, W * H * 2)
]);

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
    const canvas = canvasWebGL2({
        init(_, gl: WebGL2RenderingContext) {
            if (!gl.getExtension("EXT_color_buffer_float")) {
                error("EXT_color_buffer_float not available");
            }
            const [colorTex, posTex, normTex, noiseTex, ssaoTex] = [
                {},
                { internalFormat: gl.RGBA16F, type: gl.FLOAT },
                { internalFormat: gl.RGBA16F, type: gl.FLOAT },
                {
                    image: NOISE,
                    internalFormat: gl.RG16F,
                    format: gl.RG,
                    type: gl.FLOAT
                },
                {}
            ].map((opts: Partial<TextureOpts>) =>
                texture(gl, {
                    width: W,
                    height: H,
                    image: null,
                    filter: gl.NEAREST,
                    wrap: gl.CLAMP_TO_EDGE,
                    ...opts
                })
            );
            fboGeo = fbo(gl, {
                tex: [colorTex, posTex, normTex],
                depth: rbo(gl, { width: W, height: H })
            });
            fboSSAO = fbo(gl, {
                tex: [ssaoTex]
            });
            model = compileModel(gl, {
                ...cube({ uv: true }),
                shader: shader(gl, LIGHT_SHADER),
                instances: {
                    attribs: {
                        offset: {
                            data: instancePositions(1.05)
                        }
                    },
                    num: 6
                },
                uniforms: {
                    eyePos: PARAMS.eyeDist.transform(map((z) => [0, 0, z])),
                    lightPos: PARAMS.lightTheta.transform(
                        map((theta) => <GLVec3>rotateY([], LIGHT_POS, theta))
                    ),
                    specular: PARAMS.specular
                },
                textures: [
                    texture(gl, {
                        image: checkerboard({
                            size: 16,
                            col1: 0xffc0c0c0,
                            col2: 0xffe0e0e0,
                            corners: true
                        }),
                        filter: gl.NEAREST,
                        wrap: gl.CLAMP_TO_EDGE
                    })
                ]
            });
            ssaoQuad = compileModel(gl, {
                ...quad(false),
                shader: shader(gl, SSAO_SHADER),
                textures: [posTex, normTex, noiseTex],
                uniforms: {
                    sampleRadius: PARAMS.radius,
                    bias: PARAMS.bias,
                    attenuate: PARAMS.baseAttenuation,
                    attenuateDist: PARAMS.distAttenuation,
                    depthRange: [Z_NEAR, Z_FAR]
                }
            });
            finalQuad = compileModel(gl, {
                ...quad(),
                shader: shader(gl, FINAL_SHADER),
                textures: [colorTex, ssaoTex],
                uniforms: {
                    amp: PARAMS.amp
                }
            });
        },
        update(_, gl, __, time) {
            const bg = 0.1;
            const eye = [0, 0, PARAMS.eyeDist.deref()];
            const p = perspective([], 45, W / H, Z_NEAR, Z_FAR);
            const v = lookAt([], eye, [0, 0, 0], [0, 1, 0]);
            const m = transform44(
                [],
                [0, 0, 0],
                [sin(time, 0.00005, 1, 0), time * 0.0003, 0],
                1
            );
            model.instances.attribs.offset.buffer.set(
                instancePositions(sin(time, 0.0004, 0.14, 1.15))
            );
            model.uniforms.model = <GLMat4>m;
            model.uniforms.view = <GLMat4>v;
            model.uniforms.proj = <GLMat4>p;
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
        }
    });
    return () => [
        "div.sans-serif.ma3",
        [canvas, { width: W, height: H }],
        ["div.mt3", ...CONTROLS]
    ];
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}

window["params"] = PARAMS;
