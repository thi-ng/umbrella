import type { Select4 } from "@thi.ng/api";
import type { Swizzle, Term } from "../api/nodes.js";
import type {
    Swizzle2,
    Swizzle2_1,
    Swizzle2_2,
    Swizzle2_3,
    Swizzle3,
    Swizzle3_1,
    Swizzle3_2,
    Swizzle3_3,
    Swizzle4,
    Swizzle4_1,
    Swizzle4_2,
    Swizzle4_3,
} from "../api/swizzles.js";
import type {
    BVec2Term,
    BVec3Term,
    BVec4Term,
    IVec2Term,
    IVec3Term,
    IVec4Term,
    UVec2Term,
    UVec3Term,
    UVec4Term,
    Vec2Term,
    Vec3Term,
    Vec4Term,
} from "../api/terms.js";
import type { BVec, IVec, Type, UVec, Vec } from "../api/types.js";

// prettier-ignore
export function $<T extends Swizzle2>(a: Vec2Term, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "float", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function $<T extends Swizzle3>(a: Vec3Term, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "float", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function $<T extends Swizzle4>(a: Vec4Term, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "float", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function $<T extends Swizzle2>(a: IVec2Term, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "int", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function $<T extends Swizzle3>(a: IVec3Term, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "int", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function $<T extends Swizzle4>(a: IVec4Term, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "int", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function $<T extends Swizzle2>(a: UVec2Term, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "uint", "uvec2", "uvec3", "uvec4">>;
// prettier-ignore
export function $<T extends Swizzle3>(a: UVec3Term, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "uint", "uvec2", "uvec3", "uvec4">>;
// prettier-ignore
export function $<T extends Swizzle4>(a: UVec4Term, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "uint", "uvec2", "uvec3", "uvec4">>;
// prettier-ignore
export function $<T extends Swizzle2>(a: BVec2Term, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "bool", "bvec2", "bvec3", "bvec4">>;
// prettier-ignore
export function $<T extends Swizzle3>(a: BVec3Term, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "bool", "bvec2", "bvec3", "bvec4">>;
// prettier-ignore
export function $<T extends Swizzle4>(a: BVec4Term, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "bool", "bvec2", "bvec3", "bvec4">>;
export function $(val: Term<any>, id: string): Swizzle<any> {
    const type = val.type[0];
    const rtype = (a: Type, b: string) =>
        id.length === 1 ? a : <Type>(b + id.length);
    return {
        tag: "swizzle",
        type:
            type === "i"
                ? rtype("int", "ivec")
                : type === "u"
                ? rtype("uint", "uvec")
                : type === "b"
                ? rtype("bool", "bvec")
                : rtype("float", "vec"),
        val,
        id,
    };
}

export const $x = <T extends Vec | IVec | UVec | BVec>(
    val: Term<T>
): Swizzle<Select4<T, Vec, IVec, UVec, "float", "int", "uint", "bool">> =>
    <any>$(<any>val, "x");

export const $y = <T extends Vec | IVec | UVec | BVec>(
    val: Term<T>
): Swizzle<Select4<T, Vec, IVec, UVec, "float", "int", "uint", "bool">> =>
    <any>$(<any>val, "y");

export const $z = <
    T extends
        | "vec3"
        | "vec4"
        | "ivec3"
        | "ivec4"
        | "uvec3"
        | "uvec4"
        | "bvec3"
        | "bvec4"
>(
    val: Term<T>
): Swizzle<Select4<T, Vec, IVec, UVec, "float", "int", "uint", "bool">> =>
    <any>$(<any>val, "z");

export const $w = <T extends "vec4" | "ivec4" | "uvec4" | "bvec4">(
    val: Term<T>
): Swizzle<Select4<T, Vec, IVec, UVec, "float", "int", "uint", "bool">> =>
    <any>$(<any>val, "w");

export function $xy(val: Term<Vec>): Swizzle<"vec2">;
export function $xy(val: Term<IVec>): Swizzle<"ivec2">;
export function $xy(val: Term<UVec>): Swizzle<"uvec2">;
export function $xy(val: Term<BVec>): Swizzle<"bvec2">;
export function $xy(val: any): Swizzle<any> {
    return $(val, "xy");
}

export function $xyz(val: Term<"vec3" | "vec4">): Swizzle<"vec3">;
export function $xyz(val: Term<"ivec3" | "ivec4">): Swizzle<"ivec3">;
export function $xyz(val: Term<"uvec3" | "uvec4">): Swizzle<"uvec3">;
export function $xyz(val: Term<"bvec3" | "bvec4">): Swizzle<"bvec3">;
export function $xyz(val: any): Swizzle<any> {
    return $(val, "xyz");
}
