import type { Fn4 } from "@thi.ng/api";
import type { Node2D } from "@thi.ng/scenegraph";
import type {
    FloatSym,
    Func,
    Sampler2DSym,
    Sym,
    Vec2Sym,
    Vec4Sym,
} from "@thi.ng/shader-ast";
import type { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import type { ModelSpec, Texture } from "@thi.ng/webgl";

export interface AppCtx {
    /**
     * Main canvas width
     */
    width: number;
    /**
     * Main canvas height
     */
    height: number;
    /**
     * Offscreen texture size (square)
     */
    texSize: number;
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    /**
     * Pre-compiled geometry for offscreen drawing
     */
    opQuad: ModelSpec;
    /**
     * Pre-compiled geometry for drawing to main canvas
     */
    mainQuad: ModelSpec;
}

/**
 * Options / specification for shader node
 */
export interface OpSpec<T extends UserUniforms> {
    /**
     * Shader function (will be transpiled to GLSL)
     */
    main: OpShaderFn<T>;
    /**
     * Additional custom uniforms
     */
    unis: T;
    /**
     * Max. 4 texture inputs from other shader nodes
     */
    inputs: Texture[];
    /**
     * Scenegraph node for controlling where to draw in main canvas
     */
    node: Node2D;
}

/**
 * Type alias for OpNode shaders
 */
export type OpShaderFn<T extends UserUniforms> = Fn4<
    GLSLTarget,
    OpUniforms & UserUniformTypes<T>,
    { v_uv: Vec2Sym },
    { fragColor: Vec4Sym },
    (Sym<any> | Func<any>)[]
>;

export interface OpUniforms {
    u_in0: Sampler2DSym;
    u_in1: Sampler2DSym;
    u_in2: Sampler2DSym;
    u_in3: Sampler2DSym;
    u_time: FloatSym;
}

type UType = "vec2" | "vec3" | "vec4" | "float";

export type UserUniforms = Record<string, [UType, number | number[]]>;

export type UserUniformTypes<T extends UserUniforms> = {
    [k in keyof T]: Sym<T[k][0]>;
};
