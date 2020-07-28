import { Fn4, IObjectOf } from "@thi.ng/api";
import { Node2D } from "@thi.ng/scenegraph";
import { Func, Sym } from "@thi.ng/shader-ast";
import { GLSLTarget } from "@thi.ng/shader-ast-glsl";
import { GLSL, GLVec, ModelSpec, Texture } from "@thi.ng/webgl";

export interface AppCtx {
    width: number;
    height: number;
    texSize: number;
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    opQuad: ModelSpec;
    mainQuad: ModelSpec;
}

export interface OpSpec {
    main: OpShaderFn;
    unis: IObjectOf<[GLSL, number | GLVec]>;
    inputs: Texture[];
    node: Node2D;
}

export type OpShaderFn = Fn4<
    GLSLTarget,
    IObjectOf<Sym<any>>,
    IObjectOf<Sym<any>>,
    IObjectOf<Sym<any>>,
    (Sym<any> | Func<any>)[]
>;
