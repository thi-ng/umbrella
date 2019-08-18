import { FnCall, Term } from "../api/nodes";
import { BVec } from "../api/types";
import { builtinCall } from "../ast/function";

const $bvec = (t: string) => <any>("bvec" + t[t.length - 1]);

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
    builtinCall("not", v.type, v);
