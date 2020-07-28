import { assert, IObjectOf } from "@thi.ng/api";
import { assocObj, map, range, some, transduce } from "@thi.ng/transducers";
import type { ExtensionBehaviors } from "./api/ext";
import type { Multipass, MultipassOpts, PassOpts } from "./api/multipass";
import type {
    ShaderOutputSpec,
    ShaderSpec,
    ShaderUniformSpecs,
} from "./api/shader";
import type { ITexture } from "./api/texture";
import { compileModel } from "./buffer";
import { isFloatTexture, isGL2Context } from "./checks";
import { draw } from "./draw";
import { defFBO } from "./fbo";
import { defQuadModel } from "./geo/quad";
import { defShader } from "./shader";
import { PASSTHROUGH_VS } from "./shaders/pipeline";
import { defTexture } from "./texture";

export const defMultiPass = (opts: MultipassOpts) => {
    const gl = opts.gl;
    const isGL2 = isGL2Context(gl);
    const numPasses = opts.passes.length;
    assert(numPasses > 0, "require at least one shader pass");

    const initShader = (pass: PassOpts) => {
        const numIns = pass.inputs.length;
        const numOuts = pass.outputs.length;
        const ext: ExtensionBehaviors = {};
        const spec: ShaderSpec = {
            vs: pass.vs || PASSTHROUGH_VS,
            fs: pass.fs,
            attribs: pass.attribs || {
                position: "vec2",
            },
            varying: pass.varying,
            uniforms: <ShaderUniformSpecs>{
                ...pass.uniforms,
                ...(numIns
                    ? {
                          inputs: ["sampler2D[]", numIns, [...range(numIns)]],
                      }
                    : null),
            },
            outputs: numOuts
                ? transduce(
                      map<number, [string, ShaderOutputSpec]>((i) => [
                          `output${i}`,
                          ["vec4", i],
                      ]),
                      assocObj(),
                      range(numOuts)
                  )
                : undefined,
            state: pass.state,
            pre: pass.pre,
            post: pass.post,
            replacePrelude: pass.replacePrelude,
            generateDecls: pass.generateDecls,
            ext,
        };
        const floatIn = some((id) => isFloatTexture(textures[id]), pass.inputs);
        const floatOut = some(
            (id) => isFloatTexture(textures[id]),
            pass.outputs
        );
        if (!isGL2) {
            floatIn && (ext.OES_texture_float = "require");
            numOuts > 1 && (ext.WEBGL_draw_buffers = "require");
        }
        if (floatOut) {
            ext[isGL2 ? "EXT_color_buffer_float" : "WEBGL_color_buffer_float"] =
                "require";
        }
        return defShader(gl, spec);
    };

    const textures = Object.keys(opts.textures).reduce((acc, id) => {
        acc[id] = defTexture(gl, {
            width: opts.width,
            height: opts.height,
            filter: gl.NEAREST,
            wrap: gl.CLAMP_TO_EDGE,
            image: null,
            ...opts.textures[id],
        });
        return acc;
    }, <IObjectOf<ITexture>>{});

    const model = compileModel(gl, defQuadModel({ uv: false }));
    const models = opts.passes.map((pass) => {
        const m = pass.model ? compileModel(gl, <any>pass.model) : { ...model };
        m.shader = initShader(pass);
        m.uniforms = { ...pass.uniformVals };
        pass.inputs.length > 0 &&
            (m.textures = pass.inputs.map((id) => textures[id]));
        return m;
    });

    const useMainBuffer = !opts.passes[numPasses - 1].outputs.length;
    const fbos = (useMainBuffer
        ? opts.passes.slice(0, numPasses - 1)
        : opts.passes
    ).map((pass) =>
        defFBO(gl, { tex: pass.outputs.map((id) => textures[id]) })
    );

    const drawPass = (i: number, time: number) => {
        const pass = opts.passes[i];
        const model = models[i];
        const shader = model.shader;
        const size = pass.outputs.length
            ? textures[pass.outputs[0]].size
            : [gl.drawingBufferWidth, gl.drawingBufferHeight];
        shader.uniforms.resolution && (model.uniforms!.resolution = size);
        shader.uniforms.time && (model.uniforms!.time = time);
        gl.viewport(0, 0, size[0], size[1]);
        draw(model);
    };

    const update = (time: number) => {
        for (let i = 0; i < fbos.length; i++) {
            fbos[i].bind();
            drawPass(i, time);
            fbos[i].unbind();
        }
        useMainBuffer && drawPass(numPasses - 1, time);
    };

    const updateRAF = () => {
        update((Date.now() - t0) * 1e-3);
        active && (rafID = requestAnimationFrame(updateRAF));
    };

    let active: boolean;
    let t0 = Date.now();
    let rafID: number;

    const instance: Multipass = {
        start() {
            t0 = Date.now();
            active = true;
            rafID = requestAnimationFrame(updateRAF);
        },
        stop() {
            if (active) {
                active = false;
                cancelAnimationFrame(rafID);
            }
        },
        update(time: number) {
            update(time);
        },
        passes: opts.passes,
        fbos,
        models,
        textures,
    };

    return instance;
};
