import { IObjectOf } from "@thi.ng/api";
import { mat23to44 } from "@thi.ng/matrices";
import {
    defFBO,
    defShader,
    defTexture,
    draw,
    FBO,
    FX_SHADER_SPEC_UV,
    GLMat4,
    GLVec,
    Shader,
    Texture,
    TextureFilter,
} from "@thi.ng/webgl";
import { AppCtx, OpSpec } from "./api";

export class OpNode {
    tex: Texture;
    fbo: FBO;
    shader: Shader;
    params: IObjectOf<number | GLVec>;

    constructor(public ctx: AppCtx, public spec: OpSpec) {
        this.tex = defTexture(ctx.gl, {
            width: ctx.texSize,
            height: ctx.texSize,
            filter: TextureFilter.LINEAR,
            image: null,
        });
        this.fbo = defFBO(ctx.gl, { tex: [this.tex] });
        this.shader = defShader(ctx.gl, {
            ...FX_SHADER_SPEC_UV,
            fs: spec.main,
            uniforms: {
                u_in0: ["sampler2D", 0],
                u_in1: ["sampler2D", 1],
                u_in2: ["sampler2D", 2],
                u_in3: ["sampler2D", 3],
                u_time: ["float", 0],
                ...spec.unis,
            },
        });
        this.params = Object.entries(spec.unis).reduce((acc, [id, val]) => {
            acc[id] = val[1];
            return acc;
        }, <any>{});
    }

    update(time: number) {
        this.fbo.bind();
        this.ctx.gl.viewport(0, 0, this.ctx.texSize, this.ctx.texSize);
        draw({
            ...this.ctx.opQuad,
            shader: this.shader,
            textures: this.spec.inputs,
            uniforms: { u_time: time, ...this.params },
        });
        this.fbo.unbind();
    }

    draw() {
        draw({
            ...this.ctx.mainQuad,
            textures: [this.tex],
            uniforms: {
                model: <GLMat4>mat23to44([], this.spec.node.mat),
            },
        });
    }
}
