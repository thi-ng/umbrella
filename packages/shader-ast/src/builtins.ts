import { illegalArgs } from "@thi.ng/errors";
import {
    BVec,
    FloatTerm,
    FnCall,
    IntTerm,
    ISampler2DTerm,
    ISampler3DTerm,
    ISamplerCubeTerm,
    IVec,
    IVec2Term,
    IVec3Term,
    Mat,
    Prim,
    Sampler,
    Sampler2DTerm,
    Sampler3DTerm,
    SamplerCubeTerm,
    Sym,
    Term,
    USampler2DTerm,
    USampler3DTerm,
    USamplerCubeTerm,
    Vec,
    Vec2Term,
    Vec3Term,
    Vec4Term
} from "./api";
import {
    builtinCall,
    FLOAT0,
    INT0,
    isVec
} from "./ast";

const primOp1 = (name: string) => <T extends Prim>(a: Term<T>) =>
    builtinCall(name, a.type, a);

const primOp2 = (name: string) => <A extends Prim, B extends A>(
    a: Term<A>,
    b: Term<B>
) => builtinCall(name, a.type, a, b);

const primOp3 = (name: string) => <A extends Prim, B extends A, C extends B>(
    a: Term<A>,
    b: Term<B>,
    c: Term<C>
) => builtinCall(name, a.type, a, b, c);

const $bvec = (t: string) => <any>("bvec" + t[t.length - 1]);

/**
 * Returns normalized version of given vector.
 *
 * @param v
 */
export const normalize = <T extends Vec>(v: Term<T>) =>
    builtinCall("normalize", v.type, v);

/**
 * Returns length / magnitude of given vector.
 *
 * @param v
 */
export const length = <T extends Vec>(v: Term<T>) =>
    builtinCall("length", "float", v);

export const distance = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("distance", "float", a, b);

/**
 * Returns dot product of given vectors.
 *
 * @param a
 * @param b
 */
export const dot = <A extends Vec, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("dot", "float", a, b);

/**
 * Returns cross product of given 3D vectors.
 *
 * @param a
 * @param b
 */
export const cross = (a: Vec3Term, b: Vec3Term) =>
    builtinCall("cross", a.type, a, b);

export const reflect = <I extends Vec, N extends I>(i: Term<I>, n: Term<N>) =>
    builtinCall("reflect", i.type, i, n);

export const refract = <I extends Vec, N extends I>(
    i: Term<I>,
    n: Term<N>,
    ior: FloatTerm
) => builtinCall("refract", i.type, i, n, ior);

export const faceForward = <I extends Vec, N extends I, R extends I>(
    i: Term<I>,
    n: Term<N>,
    nref: Term<R>
) => builtinCall("faceForward", i.type, i, n, nref);

export const min = primOp2("min");
export const max = primOp2("max");
export const clamp = primOp3("clamp");

export const step = primOp2("step");
export const smoothstep = primOp3("smoothstep");

export const radians = primOp1("radians");
export const degrees = primOp1("degrees");

export const cos = primOp1("cos");
export const sin = primOp1("sin");
export const tan = primOp1("tan");
export const acos = primOp1("acos");
export const asin = primOp1("asin");
export const atan = primOp1("atan");

export const pow = primOp2("pow");
export const exp = primOp1("exp");
export const log = primOp1("log");
export const exp2 = primOp1("exp2");
export const log2 = primOp1("log2");
export const sqrt = primOp1("sqrt");
export const inversesqrt = primOp1("inversesqrt");

export const abs = primOp1("abs");
export const sign = primOp1("sign");
export const floor = primOp1("floor");
export const ceil = primOp1("ceil");
export const fract = primOp1("fract");

// prettier-ignore
export function mod<A extends Prim, B extends A>(a: Term<A>, b: Term<B>): FnCall<A>;
export function mod<A extends Prim>(a: Term<A>, b: FloatTerm): FnCall<A>;
export function mod(a: Term<any>, b: Term<any>): FnCall<any> {
    const f = builtinCall("mod", a.type, a, b);
    b.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export function mix<A extends Prim, B extends A, C extends B>(a: Term<A>, b: Term<B>, c: Term<C>): FnCall<A>;
// prettier-ignore
export function mix<A extends Prim, B extends A>(a: Term<A>, b: Term<B>, c: FloatTerm): FnCall<A>;
export function mix(a: Term<any>, b: Term<any>, c: Term<any>): FnCall<any> {
    const f = builtinCall("mix", a.type, a, b, c);
    c.type === "float" && (f.info = "n");
    return f;
}

// prettier-ignore
export const matrixCompMult = <A extends Mat, B extends A>(a: Term<A>, b: Term<B>) =>
    builtinCall("matrixCompMult", a.type, a, b);

// prettier-ignore
export function lessThan<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function lessThan<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function lessThan<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function lessThan(a: Term<any>, b: Term<any>) {
    return builtinCall("lessThan", $bvec(a.type), a, b);
}

// prettier-ignore
export function lessThanEqual<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function lessThanEqual<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function lessThanEqual<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function lessThanEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("lessThanEqual", $bvec(a.type), a, b);
}

// prettier-ignore
export function greaterThan<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function greaterThan<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function greaterThan<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function greaterThan(a: Term<any>, b: Term<any>) {
    return builtinCall("greaterThan", $bvec(a.type), a, b);
}

// prettier-ignore
export function greaterThanEqual<A extends "vec2" | "ivec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function greaterThanEqual<A extends "vec3" | "ivec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function greaterThanEqual<A extends "vec4" | "ivec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function greaterThanEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("greaterThanEqual", $bvec(a.type), a, b);
}

// prettier-ignore
export function equal<A extends "vec2" | "ivec2" | "bvec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function equal<A extends "vec3" | "ivec3" | "bvec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function equal<A extends "vec4" | "ivec4" | "bvec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function equal(a: Term<any>, b: Term<any>) {
    return builtinCall("equal", $bvec(a.type), a, b);
}

// prettier-ignore
export function notEqual<A extends "vec2" | "ivec2" | "bvec2", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec2">;
// prettier-ignore
export function notEqual<A extends "vec3" | "ivec3" | "bvec3", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec3">;
// prettier-ignore
export function notEqual<A extends "vec4" | "ivec4" | "bvec4", B extends A>(a: Term<A>, b: Term<B>): FnCall<"bvec4">;
export function notEqual(a: Term<any>, b: Term<any>) {
    return builtinCall("notEqual", $bvec(a.type), a, b);
}

export const _any = (v: Term<BVec>): FnCall<"bool"> =>
    builtinCall("any", "bool", v);

export const all = (v: Term<BVec>): FnCall<"bool"> =>
    builtinCall("all", "bool", v);

export const _not = <T extends BVec>(v: Term<T>) =>
    builtinCall("all", v.type, v);

const texRetType = (sampler: Term<Sampler>) => {
    const t = sampler.type[0];
    const shadow = sampler.type.indexOf("Shadow") > 0;
    return t === "s"
        ? shadow
            ? "float"
            : "vec4"
        : t === "i"
        ? shadow
            ? "int"
            : "ivec4"
        : t === "u"
        ? shadow
            ? "uint"
            : "uvec4"
        : illegalArgs(`unknown sampler type ${sampler.type}`);
};

// prettier-ignore
export function textureSize(sampler: Sampler2DTerm, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Sampler3DTerm, lod: IntTerm): FnCall<"ivec3">;
// prettier-ignore
export function textureSize(sampler: SamplerCubeTerm, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Term<"sampler2DShadow">, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Term<"samplerCubeShadow">, lod: IntTerm): FnCall<"ivec2">;
// prettier-ignore
export function textureSize(sampler: Term<Sampler>, lod: IntTerm): FnCall<any> {
    return builtinCall(
        "textureSize",
        /(3D|Array)/.test(sampler.type) ? "ivec3" : "ivec2",
        sampler,
        lod
    );
}

// prettier-ignore
export function texture(sampler: Sampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: Sampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: SamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function texture(sampler: ISampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function texture(sampler: ISampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function texture(sampler: ISamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function texture(sampler: USampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function texture(sampler: USampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function texture(sampler: USamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function texture(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function texture(sampler: Term<"samplerCubeShadow">, uvw: Vec4Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function texture(sampler: Term<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "texture",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    !isVec(f) && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureProj(sampler: Sampler2DTerm, uvw: Term<"vec3" | "vec4">, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProj(sampler: Sampler3DTerm, uvw: Vec4Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProj(sampler: ISampler2DTerm, uvw: Term<"vec3" | "vec4">, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProj(sampler: ISampler3DTerm, uvw: Vec4Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProj(sampler: USampler2DTerm, uvw: Term<"vec3" | "vec4">, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProj(sampler: USampler3DTerm, uvw: Vec4Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProj(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureProj(sampler: Term<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureProj",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    !isVec(f) && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureLod(sampler: Sampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: Sampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: SamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: ISampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: ISampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: ISamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: USampler2DTerm, uv: Vec2Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: USampler3DTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: USamplerCubeTerm, uvw: Vec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureLod(sampler: Term<Sampler>, uv: Term<Vec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureLod",
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    !isVec(f) && (f.info = "n");
    return f;
}

// prettier-ignore
export function textureOffset(sampler: Sampler2DTerm, uvw: Vec2Term, off: IVec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureOffset(sampler: Sampler3DTerm, uvw: Vec3Term, off: IVec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureOffset(sampler: ISampler2DTerm, uvw: Vec2Term, off: IVec2Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureOffset(sampler: ISampler3DTerm, uvw: Vec3Term, off: IVec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureOffset(sampler: USampler2DTerm, uvw: Vec2Term, off: IVec2Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureOffset(sampler: USampler3DTerm, uvw: Vec3Term, off: IVec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureOffset(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, off: IVec2Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureOffset(sampler: Term<Sampler>, uv: Term<Vec>, off: Term<IVec>, bias?: FloatTerm): FnCall<any> {
    const f = builtinCall(
        "textureOffset",
        texRetType(sampler),
        sampler,
        uv,
        off,
        bias || FLOAT0
    );
    !isVec(f) && (f.info = "n");
    return f;
}

// prettier-ignore
export function texelFetch(sampler: Sampler2DTerm, uv: IVec2Term, lod?: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: Sampler3DTerm, uvw: IVec3Term, lod?: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: ISampler2DTerm, uv: IVec2Term, lod?: IntTerm): FnCall<"ivec4">;
// prettier-ignore
export function texelFetch(sampler: ISampler3DTerm, uvw: IVec3Term, lod?: IntTerm): FnCall<"ivec4">;
// prettier-ignore
export function texelFetch(sampler: USampler2DTerm, uv: IVec2Term, lod?: IntTerm): FnCall<"uvec4">;
// prettier-ignore
export function texelFetch(sampler: USampler3DTerm, uvw: IVec3Term, lod?: IntTerm): FnCall<"uvec4">;
// prettier-ignore
export function texelFetch(sampler: Term<Sampler>, uv: Term<IVec>, lod?: IntTerm): FnCall<any> {
    return builtinCall(
        "texelFetch",
        texRetType(sampler),
        sampler,
        uv,
        lod || INT0
    );
}

// prettier-ignore
export function texelFetchOffset(sampler: Sampler2DTerm, uv: IVec2Term, lod: IntTerm, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function texelFetchOffset(sampler: Sampler3DTerm, uvw: IVec3Term, lod: IntTerm, offset: IVec3Term): FnCall<"vec4">;
// prettier-ignore
export function texelFetchOffset(sampler: ISampler2DTerm, uv: IVec2Term, lod: IntTerm, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function texelFetchOffset(sampler: ISampler3DTerm, uvw: IVec3Term, lod: IntTerm, offset: IVec3Term): FnCall<"ivec4">;
// prettier-ignore
export function texelFetchOffset(sampler: USampler2DTerm, uv: IVec2Term, lod: IntTerm, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function texelFetchOffset(sampler: USampler3DTerm, uvw: IVec3Term, lod: IntTerm, offset: IVec3Term): FnCall<"uvec4">;
// prettier-ignore
export function texelFetchOffset(sampler: Term<Sampler>, uv: Term<IVec>, lod: IntTerm, offset: Term<IVec>): FnCall<any> {
    return builtinCall(
        "texelFetchOffset",
        texRetType(sampler),
        sampler,
        uv,
        lod,
        offset
    );
}

// prettier-ignore
export function textureGrad(sampler: Sampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureGrad(sampler: Sampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"vec4">;
// prettier-ignore
export function textureGrad(sampler: SamplerCubeTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"vec4">;
// prettier-ignore
export function textureGrad(sampler: ISampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureGrad(sampler: ISampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"ivec4">;
// prettier-ignore
export function textureGrad(sampler: ISamplerCubeTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"ivec4">;
// prettier-ignore
export function textureGrad(sampler: USampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureGrad(sampler: USampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"uvec4">;
// prettier-ignore
export function textureGrad(sampler: USamplerCubeTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"uvec4">;
// prettier-ignore
export function textureGrad(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"float">;
// prettier-ignore
export function textureGrad(sampler: Term<"samplerCubeShadow">, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"float">;
// prettier-ignore
export function textureGrad(sampler: Term<Sampler>, uvw: Term<Vec>, dx: Term<Vec>, dy: Term<Vec>): FnCall<any> {
    const f = builtinCall(
        "textureGrad",
        texRetType(sampler),
        sampler,
        uvw,
        dx,
        dy
    );
    !isVec(f) && (f.info = "n");
    return f;
}

export const dFdx = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdx", sym.type, sym);

export const dFdy = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdy", sym.type, sym);

export const fwidth = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("fwidth", sym.type, sym);
