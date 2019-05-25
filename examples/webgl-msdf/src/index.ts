import { sin } from "@thi.ng/dsp";
import { start } from "@thi.ng/hdom";
import { canvasWebGL } from "@thi.ng/hdom-components";
import { transform44 } from "@thi.ng/matrices";
import {
    adaptDPI,
    compileModel,
    draw,
    FX_SHADER_SPEC,
    GLMat4,
    ModelSpec,
    quad,
    screen2d,
    shader,
    texture
} from "@thi.ng/webgl";
import {
    alignCenter,
    convertGlyphs,
    MSDF_SHADER,
    text
} from "@thi.ng/webgl-msdf";
import GLYPHS from "../assets/inputmono-extralight-msdf.json";
import GLYPH_TEX from "../assets/inputmono-extralight.png";

const app = () => {
    const glyphs = convertGlyphs(GLYPHS);
    let bgmodel: ModelSpec;
    let model: ModelSpec;
    let bg = 0.2;
    const canvas = canvasWebGL({
        init: async (_, gl) => {
            const img = new Image();
            img.src = GLYPH_TEX;
            await img.decode();
            model = compileModel(
                gl,
                text(
                    glyphs,
                    "01234567890\n-=`~!@#$%^&*()_+;',./:\"{}<>?\\|\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ",
                    { align: alignCenter, useColor: true }
                )
            );
            model.shader = shader(gl, MSDF_SHADER({ color: true }));
            model.textures = [
                texture(gl, {
                    image: img,
                    filter: gl.LINEAR,
                    wrap: gl.CLAMP_TO_EDGE
                })
            ];
            model.uniforms.proj = screen2d(
                gl.drawingBufferWidth,
                gl.drawingBufferHeight
            );
            model.uniforms.fg = [0, 1, 1, 1];
            model.uniforms.bg = [0, 0, 0, 1];
            model.uniforms.thresh = -0.2;

            // update bottom vertex colors for each character
            for (
                let i = 2, col = [1, 0, 0, 1];
                i < model.attribPool.capacity;
                i += 4
            ) {
                model.attribPool.setAttribValues("color", [col, col], i);
            }
            model.attribs.color.buffer.set(model.attribPool.bytes());

            bgmodel = compileModel(gl, {
                ...quad(),
                shader: shader(gl, FX_SHADER_SPEC),
                textures: model.textures
            });
        },
        update: (el, gl, __, time) => {
            if (!model) return;
            adaptDPI(el, window.innerWidth, window.innerHeight);
            model.uniforms.modelview = <GLMat4>(
                transform44(
                    [],
                    [
                        gl.drawingBufferWidth / 2,
                        gl.drawingBufferHeight * 0.45,
                        0
                    ],
                    [0, 0, time * 0.0003],
                    sin(time, 0.0001, 1.66, 2)
                )
            );
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(bg, bg, bg, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            draw([bgmodel, model]);
        }
    });
    return [canvas, { width: window.innerWidth, height: window.innerHeight }];
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
