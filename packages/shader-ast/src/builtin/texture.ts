import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { FnCall, Sym, Term } from "../api/nodes.js";
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
} from "../api/terms.js";
import type { IVec, Prim, Sampler, Vec } from "../api/types.js";
import { isVec } from "../ast/checks.js";
import { builtinCall } from "../ast/function.js";

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
    args: Term<any>[],
    bias?: FloatTerm
) => {
    const f = bias
        ? builtinCall(name, texRetType(sampler), sampler, ...args, bias)
        : builtinCall(name, texRetType(sampler), sampler, ...args);
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

/**
 * @param sampler - 
 * @param uv - 
 * @param bias - not allowed in vertex shader
 */
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
    return $call("texture", sampler, [uv], bias);
}

/**
 * @param sampler - 
 * @param uvw - 
 * @param bias - not allowed in vertex shader
 */
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
    return $call("textureProj", sampler, [uv], bias);
}

// prettier-ignore
export function textureLod(sampler: Sampler2DTerm, uv: Vec2Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: Sampler3DTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: SamplerCubeTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureLod(sampler: ISampler2DTerm, uv: Vec2Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: ISampler3DTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: ISamplerCubeTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureLod(sampler: USampler2DTerm, uv: Vec2Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: USampler3DTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: USamplerCubeTerm, uvw: Vec3Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureLod(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, lod: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureLod(sampler: Term<Sampler>, uv: Term<Vec>, lod: FloatTerm): FnCall<any> {
    return $call("textureLod", sampler, [uv, lod]);
}

/**
 * @param sampler - 
 * @param uvw - 
 * @param off - 
 * @param bias - not allowed in vertex shader
 */
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
    return $call("textureOffset", sampler, [uv, off], bias);
}

// prettier-ignore
export function texelFetch(sampler: Sampler2DTerm, uv: IVec2Term, lod: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: Sampler3DTerm, uvw: IVec3Term, lod: IntTerm): FnCall<"vec4">;
// prettier-ignore
export function texelFetch(sampler: ISampler2DTerm, uv: IVec2Term, lod: IntTerm): FnCall<"ivec4">;
// prettier-ignore
export function texelFetch(sampler: ISampler3DTerm, uvw: IVec3Term, lod: IntTerm): FnCall<"ivec4">;
// prettier-ignore
export function texelFetch(sampler: USampler2DTerm, uv: IVec2Term, lod: IntTerm): FnCall<"uvec4">;
// prettier-ignore
export function texelFetch(sampler: USampler3DTerm, uvw: IVec3Term, lod: IntTerm): FnCall<"uvec4">;
// prettier-ignore
export function texelFetch(sampler: Term<Sampler>, uv: Term<IVec>, lod: IntTerm): FnCall<any> {
    return $call("texelFetch", sampler, [uv, lod]);
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
    return $call("texelFetchOffset", sampler, [uv, lod, offset]);
}

/**
 * @param sampler - 
 * @param uvw - 
 * @param off - 
 * @param bias - not allowed in vertex shader
 */
// prettier-ignore
export function textureProjOffset(sampler: Sampler2DTerm, uvw: Vec3Term, off: IVec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjOffset(sampler: Sampler2DTerm, uvw: Vec4Term, off: IVec2Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjOffset(sampler: Sampler3DTerm, uvw: Vec4Term, off: IVec3Term, bias?: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjOffset(sampler: ISampler2DTerm, uvw: Vec3Term, off: IVec2Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjOffset(sampler: ISampler2DTerm, uvw: Vec4Term, off: IVec2Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjOffset(sampler: ISampler3DTerm, uvw: Vec4Term, off: IVec3Term, bias?: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjOffset(sampler: USampler2DTerm, uvw: Vec3Term, off: IVec2Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjOffset(sampler: USampler2DTerm, uvw: Vec4Term, off: IVec2Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjOffset(sampler: USampler3DTerm, uvw: Vec4Term, off: IVec3Term, bias?: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjOffset(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, off: IVec2Term, bias?: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureProjOffset(sampler: Term<Sampler>, uv: Term<Vec>, off: Term<IVec>, bias?: FloatTerm): FnCall<any> {
    return $call("textureProjOffset", sampler, [uv, off], bias);
}

// prettier-ignore
export function texelLodOffset(sampler: Sampler2DTerm, uv: Vec2Term, lod: FloatTerm, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function texelLodOffset(sampler: Sampler3DTerm, uvw: Vec3Term, lod: FloatTerm, offset: IVec3Term): FnCall<"vec4">;
// prettier-ignore
export function texelLodOffset(sampler: ISampler2DTerm, uv: Vec2Term, lod: FloatTerm, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function texelLodOffset(sampler: ISampler3DTerm, uvw: Vec3Term, lod: FloatTerm, offset: IVec3Term): FnCall<"ivec4">;
// prettier-ignore
export function texelLodOffset(sampler: USampler2DTerm, uv: Vec2Term, lod: FloatTerm, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function texelLodOffset(sampler: USampler3DTerm, uvw: Vec3Term, lod: FloatTerm, offset: IVec3Term): FnCall<"uvec4">;
// prettier-ignore
export function texelLodOffset(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, lod: FloatTerm, offset: IVec2Term): FnCall<"float">;
// prettier-ignore
export function texelLodOffset(sampler: Term<Sampler>, uv: Term<Vec>, lod: FloatTerm, offset: Term<IVec>): FnCall<any> {
    return $call("texelLodOffset", sampler, [uv, lod, offset]);
}

// prettier-ignore
export function textureProjLod(sampler: Sampler2DTerm, uv: Vec3Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjLod(sampler: Sampler2DTerm, uv: Vec4Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjLod(sampler: Sampler3DTerm, uvw: Vec4Term, lod: FloatTerm): FnCall<"vec4">;
// prettier-ignore
export function textureProjLod(sampler: ISampler2DTerm, uv: Vec3Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjLod(sampler: ISampler2DTerm, uv: Vec4Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjLod(sampler: ISampler3DTerm, uvw: Vec4Term, lod: FloatTerm): FnCall<"ivec4">;
// prettier-ignore
export function textureProjLod(sampler: USampler2DTerm, uv: Vec3Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjLod(sampler: USampler2DTerm, uv: Vec4Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjLod(sampler: USampler3DTerm, uvw: Vec4Term, lod: FloatTerm): FnCall<"uvec4">;
// prettier-ignore
export function textureProjLod(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, lod: FloatTerm): FnCall<"float">;
// prettier-ignore
export function textureProjLod(sampler: Term<Sampler>, uv: Term<Vec>, lod: FloatTerm): FnCall<any> {
    return $call("textureProjLod", sampler, [uv, lod]);
}

// prettier-ignore
export function texelProjLodOffset(sampler: Sampler2DTerm, uv: Vec3Term, lod: FloatTerm, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: Sampler2DTerm, uv: Vec4Term, lod: FloatTerm, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: Sampler3DTerm, uvw: Vec4Term, lod: FloatTerm, offset: IVec3Term): FnCall<"vec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: ISampler2DTerm, uv: Vec3Term, lod: FloatTerm, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: ISampler2DTerm, uv: Vec4Term, lod: FloatTerm, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: ISampler3DTerm, uvw: Vec4Term, lod: FloatTerm, offset: IVec3Term): FnCall<"ivec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: USampler2DTerm, uv: Vec3Term, lod: FloatTerm, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: USampler2DTerm, uv: Vec4Term, lod: FloatTerm, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: USampler3DTerm, uvw: Vec4Term, lod: FloatTerm, offset: IVec3Term): FnCall<"uvec4">;
// prettier-ignore
export function texelProjLodOffset(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, lod: FloatTerm, offset: IVec2Term): FnCall<"float">;
// prettier-ignore
export function texelProjLodOffset(sampler: Term<Sampler>, uv: Term<Vec>, lod: FloatTerm, offset: Term<IVec>): FnCall<any> {
    return $call("texelProjLodOffset", sampler, [uv, lod, offset]);
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
    return $call("textureGrad", sampler, [uvw, dx, dy]);
}

// prettier-ignore
export function textureGradOffset(sampler: Sampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureGradOffset(sampler: Sampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"vec4">;
// prettier-ignore
export function textureGradOffset(sampler: ISampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureGradOffset(sampler: ISampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"ivec4">;
// prettier-ignore
export function textureGradOffset(sampler: USampler2DTerm, uv: Vec2Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureGradOffset(sampler: USampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"uvec4">;
// prettier-ignore
export function textureGradOffset(sampler: Term<"sampler2DShadow">, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term, offset: IVec2Term): FnCall<"float">;
// prettier-ignore
export function textureGradOffset(sampler: Term<Sampler>, uvw: Term<Vec>, dx: Term<Vec>, dy: Term<Vec>, offset: Term<IVec>): FnCall<any> {
    return $call("textureGradOffset", sampler, [uvw, dx, dy, offset]);
}

// prettier-ignore
export function textureProjGrad(sampler: Sampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGrad(sampler: Sampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGrad(sampler: Sampler3DTerm, uvw: Vec3Term, dx: Vec3Term, dy: Vec3Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGrad(sampler: ISampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGrad(sampler: ISampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGrad(sampler: ISampler3DTerm, uvw: Vec4Term, dx: Vec3Term, dy: Vec3Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGrad(sampler: USampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGrad(sampler: USampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGrad(sampler: USampler3DTerm, uvw: Vec4Term, dx: Vec3Term, dy: Vec3Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGrad(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, dx: Vec2Term, dy: Vec2Term): FnCall<"float">;
// prettier-ignore
export function textureProjGrad(sampler: Term<Sampler>, uvw: Term<Vec>, dx: Term<Vec>, dy: Term<Vec>): FnCall<any> {
    return $call("textureProjGrad", sampler, [uvw, dx, dy]);
}

// prettier-ignore
export function textureProjGradOffset(sampler: Sampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: Sampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: Sampler3DTerm, uvw: Vec4Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"vec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: ISampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: ISampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: ISampler3DTerm, uvw: Vec4Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"ivec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: USampler2DTerm, uv: Vec3Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: USampler2DTerm, uv: Vec4Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: USampler3DTerm, uvw: Vec4Term, dx: Vec3Term, dy: Vec3Term, offset: IVec3Term): FnCall<"uvec4">;
// prettier-ignore
export function textureProjGradOffset(sampler: Term<"sampler2DShadow">, uvw: Vec4Term, dx: Vec2Term, dy: Vec2Term, offset: IVec2Term): FnCall<"float">;
// prettier-ignore
export function textureProjGradOffset(sampler: Term<Sampler>, uvw: Term<Vec>, dx: Term<Vec>, dy: Term<Vec>, offset: Term<IVec>): FnCall<any> {
    return $call("textureProjGradOffset", sampler, [uvw, dx, dy, offset]);
}

export const dFdx = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdx", sym.type, sym);

export const dFdy = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("dFdy", sym.type, sym);

export const fwidth = <T extends Prim>(sym: Sym<T>) =>
    builtinCall("fwidth", sym.type, sym);
