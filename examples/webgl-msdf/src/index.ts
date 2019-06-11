import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components";
import { fitClamped } from "@thi.ng/math";
import {
    concat,
    lookAt,
    perspective,
    transform44
} from "@thi.ng/matrices";
import { SYSTEM } from "@thi.ng/random";
import { fromDOMEvent, Subscription } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { AttribPool, GLType } from "@thi.ng/vector-pools";
import {
    fit3,
    madd,
    mixN,
    mulN,
    ReadonlyVec,
    Y3,
    ZERO3
} from "@thi.ng/vectors";
import {
    adaptDPI,
    compileModel,
    DEFAULT_BLEND,
    draw,
    GLMat4,
    GLSL,
    ModelSpec,
    shader,
    texture
} from "@thi.ng/webgl";
import {
    alignCenter,
    convertGlyphs,
    MSDFFont,
    msdfShader,
    text
} from "@thi.ng/webgl-msdf";
import GLYPHS from "../assets/inputmono-extralight-msdf.json";
import GLYPH_TEX from "../assets/inputmono-extralight.png";

const TEXT = `Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.

Though wise men at their end know dark is right,
Because their words had forked no lightning they
Do not go gentle into that good night.

Good men, the last wave by, crying how bright
Their frail deeds might have danced in a green bay,
Rage, rage against the dying of the light.

Wild men who caught and sang the sun in flight,
And learn, too late, they grieved it on its way,
Do not go gentle into that good night.

Grave men, near death, who see with blinding sight
Blind eyes could blaze like meteors and be gay,
Rage, rage against the dying of the light.

And you, my father, there on that sad height,
Curse, bless, me now with your fierce tears, I pray.
Do not go gentle into that good night.
Rage, rage against the dying of the light.

Dylan Thomas`;

const createText = (
    gl: WebGLRenderingContext,
    font: MSDFFont,
    img: HTMLImageElement,
    txt: string,
    col = [1, 0.8, 0, 1]
) => {
    const model = {
        ...text(font, txt, {
            align: alignCenter,
            leading: 1.4,
            spacing: 1,
            dirY: -1,
            useColor: true
        }),
        shader: shader(gl, msdfShader({ color: true })),
        textures: [
            texture(gl, {
                image: img,
                filter: gl.LINEAR,
                wrap: gl.CLAMP_TO_EDGE
            })
        ],
        uniforms: {
            bg: [0, 0, 0, 1],
            thresh: -0.2
        }
    };
    // update bottom vertex colors of each character
    for (let i = 2; i < model.attribPool!.capacity; i += 4) {
        model.attribPool!.setAttribValues("color", [col, col], i);
    }
    return compileModel(gl, model);
};

const createStarField = (gl: WebGLRenderingContext, num = 1000) => {
    const pool = new AttribPool({
        attribs: {
            position: { type: GLType.F32, size: 3, byteOffset: 0 },
            dir: { type: GLType.F32, size: 3, byteOffset: 12 },
            id: { type: GLType.F32, size: 1, byteOffset: 24 }
        },
        mem: {
            size: num * 28 + 8
        },
        num
    });
    for (let i = 0, r = SYSTEM; i < num; i++) {
        const pos = [r.minmax(-15, 15), r.minmax(0, 10), 0];
        pool.setAttribValue("position", i, pos);
        pool.setAttribValue(
            "dir",
            i,
            mixN([], mulN([], pos, 0.1), [0, -1, r.minmax(2, 5)], 0.8)
        );
        pool.setAttribValue("id", i, i);
    }
    return compileModel(gl, {
        attribs: {},
        attribPool: pool,
        uniforms: {},
        shader: shader(gl, {
            vs: `void main() {
                v_alpha = sin(a_id * 37.13829) * 0.3 + 0.7;
                vec3 pos = mod(a_position + a_dir * u_time, 10.) - vec3(5.);
                gl_Position = u_proj * u_modelview * vec4(pos, 1.);
                gl_PointSize = 20. / gl_Position.w;
            }`,
            fs: `void main() {
                float a = 1. - smoothstep(0.1, 0.5, length(gl_PointCoord - vec2(0.5)));
                o_fragColor = vec4(v_alpha,v_alpha, v_alpha, a);
            }`,
            attribs: {
                position: GLSL.vec3,
                dir: GLSL.vec3,
                id: GLSL.float
            },
            varying: {
                alpha: GLSL.float
            },
            uniforms: {
                modelview: GLSL.mat4,
                proj: GLSL.mat4,
                time: GLSL.float
            },
            state: {
                blend: true,
                blendFn: DEFAULT_BLEND
            }
        }),
        mode: gl.POINTS,
        num
    });
};

const app = () => {
    const glyphs = convertGlyphs(GLYPHS);
    let stars: ModelSpec;
    let body: ModelSpec;
    let mouse: Subscription<any, ReadonlyVec>;
    let bg = 0;
    const canvas = canvasWebGL({
        init: async (el, gl) => {
            const img = new Image();
            img.src = GLYPH_TEX;
            await img.decode();
            body = createText(gl, glyphs, img, TEXT);
            stars = createStarField(gl);
            body.uniforms!.proj = stars.uniforms!.proj = <GLMat4>(
                perspective(
                    [],
                    60,
                    gl.drawingBufferWidth / gl.drawingBufferHeight,
                    0.1,
                    20
                )
            );
            mouse = fromDOMEvent(el, "mousemove").transform(
                map((e) =>
                    fit3(
                        [],
                        [e.clientX, e.clientY, 0],
                        ZERO3,
                        [window.innerWidth, window.innerHeight, 0],
                        [-1, -1, 0],
                        [1, 1, 0]
                    )
                )
            );
        },
        update: (el, gl, __, time) => {
            if (!body) return;
            adaptDPI(el, window.innerWidth, window.innerHeight);
            // prettier-ignore
            const eye = madd(
                null,
                [0, -4, 5],
                mouse.deref() || ZERO3,
                [2, 0.5, 0]
            );
            const view = lookAt([], eye, ZERO3, Y3);
            body.uniforms!.modelview = <GLMat4>(
                concat(
                    [],
                    view,
                    transform44(
                        [],
                        [0, fitClamped(time % 70000, 0, 70000, -3.5, 20), 0],
                        ZERO3,
                        0.005
                    )
                )
            );
            stars.uniforms!.modelview = <GLMat4>view;
            stars.uniforms!.time = 10 + time * 0.001;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(bg, bg, bg, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw([stars, body]);
        }
    });
    return [canvas, { width: window.innerWidth, height: window.innerHeight }];
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
