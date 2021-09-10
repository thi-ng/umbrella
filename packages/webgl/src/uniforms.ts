import type { Fn, Fn3, IObjectOf } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { IDENT22, IDENT33, IDENT44 } from "@thi.ng/matrices/constants";
import { ReadonlyVec, ZERO2, ZERO3, ZERO4 } from "@thi.ng/vectors/api";
import type { GLVec } from "./api/glsl";
import type { UniformValue } from "./api/shader";

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

const uniformS =
    (fn: SetterS) =>
    (gl: WebGLRenderingContext, loc: WebGLUniformLocation, defaultVal = 0) => {
        let prev: number;
        return (x?: number) => {
            x = x === undefined ? defaultVal : x;
            if (x !== prev) {
                (<any>gl)["uniform1" + fn](loc, x);
                prev = x;
            }
        };
    };

const uniformV =
    (fn: SetterV, sysDefault: ReadonlyVec) =>
    (
        gl: WebGLRenderingContext,
        loc: WebGLUniformLocation,
        defaultVal = sysDefault
    ) => {
        let prev: GLVec = [];
        return (x?: ReadonlyVec) => {
            x = x === undefined ? defaultVal : x;
            if (!equivArrayLike(prev, x)) {
                (<any>gl)["uniform" + fn](loc, x);
                prev = [...x];
            }
        };
    };

const uniformM =
    (fn: SetterM, sysDefault?: ReadonlyVec) =>
    (
        gl: WebGLRenderingContext,
        loc: WebGLUniformLocation,
        defaultVal = sysDefault
    ) => {
        let prev: GLVec = [];
        return (x?: any) => {
            x = x === undefined ? defaultVal : x;
            if (!equivArrayLike(prev, x)) {
                (<any>gl)["uniformMatrix" + fn](loc, false, x);
                prev = [...x];
            }
        };
    };

const Z1 = [0];

export const UNIFORM_SETTERS: IObjectOf<
    Fn3<
        WebGLRenderingContext,
        WebGLUniformLocation,
        number | ReadonlyVec | undefined,
        Fn<UniformValue | undefined | null, void>
    >
> = <any>{
    bool: uniformS("i"),
    float: uniformS("f"),
    int: uniformS("i"),
    uint: uniformS("ui"),
    bvec2: uniformV("2iv", ZERO2),
    bvec3: uniformV("3iv", ZERO3),
    bvec4: uniformV("4iv", ZERO4),
    ivec2: uniformV("2iv", ZERO2),
    ivec3: uniformV("3iv", ZERO3),
    ivec4: uniformV("4iv", ZERO4),
    vec2: uniformV("2fv", ZERO2),
    vec3: uniformV("3fv", ZERO3),
    vec4: uniformV("4fv", ZERO4),
    mat2: uniformM("2fv", IDENT22),
    mat3: uniformM("3fv", IDENT33),
    mat4: uniformM("4fv", IDENT44),
    sampler2D: uniformS("i"),
    sampler2DShadow: uniformS("i"),
    sampler3D: uniformS("i"),
    samplerCube: uniformS("i"),
    samplerCubeShadow: uniformS("i"),
    "bool[]": uniformV("1iv", Z1),
    "float[]": uniformV("1fv", Z1),
    "int[]": uniformV("1iv", Z1),
    "uint[]": uniformV("1uiv", Z1),
    "bvec2[]": uniformV("2iv", ZERO2),
    "bvec3[]": uniformV("3iv", ZERO3),
    "bvec4[]": uniformV("4iv", ZERO4),
    "ivec2[]": uniformV("2iv", ZERO2),
    "ivec3[]": uniformV("3iv", ZERO3),
    "ivec4[]": uniformV("4iv", ZERO4),
    "vec2[]": uniformV("2fv", ZERO2),
    "vec3[]": uniformV("3fv", ZERO3),
    "vec4[]": uniformV("4fv", ZERO4),
    "mat2[]": uniformM("2fv", ZERO2),
    "mat3[]": uniformM("3fv", ZERO3),
    "mat4[]": uniformM("4fv", ZERO4),
    "sampler2D[]": uniformV("1iv", Z1),
    "sampler2DShadow[]": uniformV("1iv", Z1),
    "sampler3D[]": uniformV("1iv", Z1),
    "samplerCube[]": uniformV("1iv", Z1),
    "samplerCubeShadow[]": uniformV("1iv", Z1),
};
