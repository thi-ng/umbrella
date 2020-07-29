import { Fn4, IObjectOf } from "@thi.ng/api";
import { Node2D } from "@thi.ng/scenegraph";
import {
    FloatSym,
    Func,
    Sampler2DSym,
    Sym,
    Vec2Sym,
    Vec4Sym,
} from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { GLSL, GLVec, ModelSpec, Texture } from "@thi.ng/webgl";

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
export interface OpSpec {
    /**
     * Shader function (will be transpiled to GLSL)
     */
    main: OpShaderFn;
    /**
     * Additional custom uniforms
     */
    unis: IObjectOf<[GLSL, number | GLVec]>;
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
export type OpShaderFn = Fn4<
    GLSLTarget,
    OpUniforms,
    { v_uv: Vec2Sym },
    { fragColor: Vec4Sym },
    (Sym<any> | Func<any>)[]
>;

export interface OpUniforms extends IObjectOf<Sym<any>> {
    u_in0: Sampler2DSym;
    u_in1: Sampler2DSym;
    u_in2: Sampler2DSym;
    u_in3: Sampler2DSym;
    u_time: FloatSym;
}
