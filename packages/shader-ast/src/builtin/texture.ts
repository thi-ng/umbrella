import { illegalArgs } from "@thi.ng/errors";
import type { FnCall, Sym, Term } from "../api/nodes";
import type {
    FloatTerm,
    IntTerm,
    ISampler2DTerm,
    ISampler3DTerm,
    ISamplerCubeTerm,
    IVec2Term,
    IVec3Term,
    Sampler2DTerm,
    Sampler3DTerm,
    SamplerCubeTerm,
    USampler2DTerm,
    USampler3DTerm,
    USamplerCubeTerm,
    Vec2Term,
    Vec3Term,
    Vec4Term,
} from "../api/terms";
import type { IVec, Prim, Sampler, Vec } from "../api/types";
import { isVec } from "../ast/checks";
import { builtinCall } from "../ast/function";
import { FLOAT0, INT0 } from "../ast/lit";

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

const $call = (
    name: string,
    sampler: Term<Sampler>,
    uv: Term<Vec>,
    bias?: FloatTerm
) => {
    const f = builtinCall(
        name,
        texRetType(sampler),
        sampler,
        uv,
        bias || FLOAT0
    );
    !isVec(f) && (f.info = "n");
    return f;
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
    return $call("texture", sampler, uv, bias);
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
    return $call("textureProj", sampler, uv, bias);
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
    return $call("textureLod", sampler, uv, bias);
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
