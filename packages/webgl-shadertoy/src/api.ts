import { Fn2 } from "@thi.ng/api";
import {
    FloatSym,
    IntSym,
    ScopeBody,
    Vec2Sym
} from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { ITexture, ModelSpec, ShaderUniformSpecs } from "@thi.ng/webgl";

export type MainImageFn = Fn2<GLSLTarget, ShaderToyUniforms, ScopeBody>;

export interface ShaderToyUniforms {
    resolution: Vec2Sym;
    mouse: Vec2Sym;
    mouseButtons: IntSym;
    time: FloatSym;
}

export interface ShaderToyOpts {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    /**
     * Main user shader function
     */
    main: MainImageFn;
    /**
     * Optional additional uniforms
     */
    uniforms?: ShaderUniformSpecs;
    /**
     * Optional textures to bind
     */
    textures?: ITexture[];
}

export interface ShaderToy {
    start(): void;
    stop(): void;
    recompile(main: MainImageFn): void;
    model: ModelSpec;
}
