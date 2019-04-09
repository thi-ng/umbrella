import { assert, IRelease } from "@thi.ng/api";
import { mergeDeepObj } from "@thi.ng/associative";
import { ceilPow2 } from "@thi.ng/binary";
import { illegalArgs } from "@thi.ng/errors";
import {
    assocObj,
    every,
    map,
    range,
    transduce
} from "@thi.ng/transducers";
import {
    GL_RGBA,
    GL_RGBA32F,
    GLSL,
    GPGPUJobConfig,
    GPGPUJobExecOpts,
    GPGPUOpts,
    ITexture,
    ModelSpec,
    ShaderSpec
} from "./api";
import { compileModel } from "./buffer";
import { getExtensions, glCanvas } from "./canvas";
import { draw } from "./draw";
import { FBO } from "./fbo";
import { FULLSCREEN_QUAD } from "./geo/quad";
import { VERSION_CHECK } from "./glsl/syntax";
import { shader } from "./shader";
import { floatTexture } from "./texture";
import { isGL2Context } from "./utils";

export const GPGPU_SHADER_TEMPLATE: ShaderSpec = {
    vs: `void main(){v_uv=a_uv;gl_Position=vec4(a_position,0.0,1.0);}`,
    fs: "",
    pre: VERSION_CHECK(300, "#define read texture", "#define read texture2D"),
    attribs: {
        position: GLSL.vec2,
        uv: GLSL.vec2
    },
    varying: {
        uv: GLSL.vec2
    },
    uniforms: {},
    ext: {}
};

export const gpgpu = (opts: GPGPUOpts) => new GPGPU(opts);

export class GPGPU implements IRelease {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    fbo: FBO;
    inputs: ITexture[];
    outputs: ITexture[];
    spec: ModelSpec;
    opts: GPGPUOpts;
    width: number;
    size: number;

    constructor(opts: GPGPUOpts) {
        opts = { version: 1, inputs: 1, outputs: 1, ...opts };
        const width = ceilPow2(Math.ceil(Math.sqrt(opts.size / 4)));
        let gl;
        if (opts.gl) {
            gl = opts.gl;
            opts.version = isGL2Context(gl) ? 2 : 1;
        } else {
            const res = glCanvas({
                opts: { antialias: false, alpha: false, depth: false },
                width: 1,
                height: 1,
                autoScale: false,
                version: opts.version
            });
            this.canvas = res.canvas;
            gl = res.gl;
        }
        const ext = getExtensions(
            gl,
            opts.version === 1
                ? ["WEBGL_color_buffer_float", "OES_texture_float"]
                : ["EXT_color_buffer_float"]
        );
        assert(
            every((id) => !!ext[id], Object.keys(ext)),
            "WebGL float extension unavailable"
        );
        this.gl = gl;
        this.opts = opts;
        this.width = width;
        this.size = width * width * 4;
        let tmp = new Float32Array(this.size);
        this.inputs = [
            ...map(
                () => floatTexture(gl, tmp, width, width),
                range(opts.inputs)
            )
        ];
        this.outputs = [
            ...map(
                () => floatTexture(gl, tmp, width, width),
                range(opts.outputs)
            )
        ];
        tmp = null;
        this.fbo = new FBO(gl);
        this.spec = compileModel(gl, <ModelSpec>{
            ...FULLSCREEN_QUAD,
            textures: this.inputs
        });
    }

    newJob(opts: Partial<GPGPUJobConfig>) {
        return new GPGPUJob(this, opts);
    }

    release() {
        this.fbo.release();
        for (let t of this.inputs) {
            t.release();
        }
        for (let t of this.outputs) {
            t.release();
        }
        delete this.inputs;
        delete this.outputs;
        delete this.spec;
        delete this.canvas;
        delete this.gl;
        delete this.fbo;
        delete this.opts;
        return true;
    }
}

export class GPGPUJob implements IRelease {
    ctx: GPGPU;
    spec: ModelSpec;
    opts: GPGPUJobConfig;

    constructor(ctx: GPGPU, opts: Partial<GPGPUJobConfig>) {
        opts = {
            inputs: 1,
            outputs: 1,
            ...opts
        };
        assert(
            opts.inputs <= ctx.opts.inputs,
            `context only supports max. ${ctx.opts.inputs} inputs`
        );
        assert(
            opts.outputs <= ctx.opts.outputs,
            `context only supports max. ${ctx.opts.outputs} outputs`
        );
        this.ctx = ctx;
        this.opts = <GPGPUJobConfig>opts;
        this.spec = this.buildSpec();
    }

    run(runOpts: GPGPUJobExecOpts) {
        const inputs = runOpts.inputs;
        const outputs = runOpts.outputs || [...range(this.opts.outputs)];
        assert(inputs.length <= this.opts.inputs, "too many inputs");
        assert(outputs.length <= this.opts.outputs, "too many outputs");
        const ctx = this.ctx;
        const gl = ctx.gl;
        const width = ctx.width;
        const format = ctx.opts.version === 2 ? GL_RGBA32F : GL_RGBA;
        const spec = this.spec;
        for (let i = 0; i < inputs.length; i++) {
            let tex = inputs[i];
            if (tex instanceof Float32Array) {
                assert(tex.length <= ctx.size, `input #${i} too large`);
                ctx.inputs[i].configure({
                    image: tex,
                    type: gl.FLOAT,
                    internalFormat: format,
                    height: width,
                    width
                });
                tex = ctx.inputs[i];
            }
            spec.textures[i] = <ITexture>tex;
        }
        spec.uniforms = { ...spec.uniforms, ...runOpts.uniforms };
        ctx.fbo.configure({ tex: outputs.map((i) => ctx.outputs[i]) });
        gl.viewport(0, 0, width, width);
        draw(spec);
        return this;
    }

    result(out?: Float32Array, id = 0) {
        const ctx = this.ctx;
        const gl = ctx.gl;
        const fbo = new FBO(gl, { tex: [ctx.outputs[id]] });
        out = out || new Float32Array(ctx.size);
        gl.readPixels(0, 0, ctx.width, ctx.width, gl.RGBA, gl.FLOAT, out);
        fbo.release();
        return out;
    }

    release() {
        this.spec.shader.release();
        delete this.spec;
        delete this.ctx;
        return true;
    }

    protected buildSpec() {
        const opts = this.opts;
        const ctx = this.ctx;
        const spec: ModelSpec = mergeDeepObj({}, ctx.spec);
        let shaderSpec: ShaderSpec;
        if (opts.src) {
            shaderSpec = mergeDeepObj({}, GPGPU_SHADER_TEMPLATE);
            shaderSpec.fs += opts.src;
            shaderSpec.outputs = transduce(
                map((i) => [`output${i}`, [GLSL.vec4, i]]),
                assocObj(),
                range(opts.outputs)
            );
            if (opts.uniforms) {
                Object.assign(shaderSpec.uniforms, opts.uniforms);
            }
        } else if (opts.shader) {
            shaderSpec = opts.shader;
            shaderSpec.uniforms = shaderSpec.uniforms || {};
            shaderSpec.ext = shaderSpec.ext || {};
        } else {
            illegalArgs("require either `src` or `shader` option");
        }
        shaderSpec.uniforms.inputs = [GLSL.sampler2D_array, opts.inputs];
        if (ctx.fbo.ext && opts.outputs > 1) {
            shaderSpec.ext["GL_EXT_draw_buffers"] = "require";
        }
        spec.uniforms.inputs = [...range(opts.inputs)];
        spec.textures = ctx.inputs.slice(0, opts.inputs);
        spec.shader = shader(ctx.gl, shaderSpec);
        return spec;
    }
}
