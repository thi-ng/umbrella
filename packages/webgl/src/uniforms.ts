import { Fn, Fn3, IObjectOf } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { IDENT22, IDENT33, IDENT44 } from "@thi.ng/matrices";
import {
    ReadonlyVec,
    ZERO2,
    ZERO3,
    ZERO4
} from "@thi.ng/vectors";
import { GLSL, GLVec, UniformValue } from "./api";

type SetterS = "f" | "i" | "ui";

type SetterV =
    | "1fv"
    | "2fv"
    | "3fv"
    | "4fv"
    | "1iv"
    | "2iv"
    | "3iv"
    | "4iv"
    | "1uiv"
    | "2uiv"
    | "3uiv"
    | "4uiv";

type SetterM = "2fv" | "3fv" | "4fv";

const uniformS = (fn: SetterS) => (
    gl: WebGLRenderingContext,
    loc: WebGLUniformLocation,
    defaultVal = 0
) => {
    let prev: number;
    return (x?: number) => {
        x = x === undefined ? defaultVal : x;
        if (x !== prev) {
            (<any>gl)["uniform1" + fn](loc, x);
            prev = x;
        }
    };
};

const uniformV = (fn: SetterV, sysDefault?: ReadonlyVec) => (
    gl: WebGLRenderingContext,
    loc: WebGLUniformLocation,
    defaultVal = sysDefault
) => {
    let prev: GLVec = [];
    return (x?: any) => {
        x = x === undefined ? defaultVal : x;
        if (!equivArrayLike(prev, x)) {
            (<any>gl)["uniform" + fn](loc, x);
            prev = x;
        }
    };
};

const uniformM = (fn: SetterM, sysDefault?: ReadonlyVec) => (
    gl: WebGLRenderingContext,
    loc: WebGLUniformLocation,
    defaultVal = sysDefault
) => {
    let prev: GLVec = [];
    return (x?: any) => {
        x = x === undefined ? defaultVal : x;
        if (!equivArrayLike(prev, x)) {
            (<any>gl)["uniformMatrix" + fn](loc, false, x);
            prev = x;
        }
    };
};

export const UNIFORM_SETTERS: IObjectOf<
    Fn3<
        WebGLRenderingContext,
        WebGLUniformLocation,
        number | ReadonlyVec | undefined,
        Fn<UniformValue | undefined | null, void>
    >
> = <any>{
    [GLSL.bool]: uniformS("i"),
    [GLSL.float]: uniformS("f"),
    [GLSL.int]: uniformS("i"),
    [GLSL.uint]: uniformS("ui"),
    [GLSL.bvec2]: uniformV("2iv", ZERO2),
    [GLSL.bvec3]: uniformV("3iv", ZERO3),
    [GLSL.bvec4]: uniformV("4iv", ZERO4),
    [GLSL.ivec2]: uniformV("2iv", ZERO2),
    [GLSL.ivec3]: uniformV("3iv", ZERO3),
    [GLSL.ivec4]: uniformV("4iv", ZERO4),
    [GLSL.vec2]: uniformV("2fv", ZERO2),
    [GLSL.vec3]: uniformV("3fv", ZERO3),
    [GLSL.vec4]: uniformV("4fv", ZERO4),
    [GLSL.mat2]: uniformM("2fv", IDENT22),
    [GLSL.mat3]: uniformM("3fv", IDENT33),
    [GLSL.mat4]: uniformM("4fv", IDENT44),
    [GLSL.sampler2D]: uniformS("i"),
    [GLSL.sampler2DShadow]: uniformS("i"),
    [GLSL.sampler3D]: uniformS("i"),
    [GLSL.samplerCube]: uniformS("i"),
    [GLSL.samplerCubeShadow]: uniformS("i"),
    [GLSL.bool_array]: uniformV("1iv"),
    [GLSL.float_array]: uniformV("1fv"),
    [GLSL.int_array]: uniformV("1iv"),
    [GLSL.uint_array]: uniformV("1uiv"),
    [GLSL.bvec2_array]: uniformV("2iv"),
    [GLSL.bvec3_array]: uniformV("3iv"),
    [GLSL.bvec4_array]: uniformV("4iv"),
    [GLSL.ivec2_array]: uniformV("2iv"),
    [GLSL.ivec3_array]: uniformV("3iv"),
    [GLSL.ivec4_array]: uniformV("4iv"),
    [GLSL.vec2_array]: uniformV("2fv"),
    [GLSL.vec3_array]: uniformV("3fv"),
    [GLSL.vec4_array]: uniformV("4fv"),
    [GLSL.mat2_array]: uniformM("2fv"),
    [GLSL.mat3_array]: uniformM("3fv"),
    [GLSL.mat4_array]: uniformM("4fv"),
    [GLSL.sampler2D_array]: uniformV("1iv"),
    [GLSL.sampler2DShadow_array]: uniformV("1iv"),
    [GLSL.sampler3D_array]: uniformV("1iv"),
    [GLSL.samplerCube_array]: uniformV("1iv"),
    [GLSL.samplerCubeShadow_array]: uniformV("1iv")
};
