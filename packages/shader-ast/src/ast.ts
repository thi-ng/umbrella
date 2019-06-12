import {
    Fn,
    Fn0,
    Fn2,
    Fn3,
    Fn4,
    Fn5
} from "@thi.ng/api";
import { isNumber, isString } from "@thi.ng/checks";
import {
    Arg,
    Arg1,
    Arg2,
    Arg3,
    Arg4,
    Arg5,
    ArgQualifier,
    Func,
    Func0,
    Func1,
    Func2,
    Func3,
    Func4,
    Func5,
    FunCall,
    FuncArg,
    FuncReturn,
    Lit,
    Op1,
    Op2,
    Operator,
    Prim,
    Swizzle,
    Swizzle2_1,
    Swizzle2_2,
    Swizzle2_3,
    Swizzle2_4,
    Swizzle3_1,
    Swizzle3_2,
    Swizzle3_3,
    Swizzle3_4,
    Swizzle4_1,
    Swizzle4_2,
    Swizzle4_3,
    Swizzle4_4,
    Sym,
    Term,
    Type
} from "./api";

export const isVec = (t: Term<any>) => t.type.indexOf("vec") == 0;

export const sym = <T extends Type>(
    type: T,
    id: string,
    q: ArgQualifier = "inout"
): Sym<T> => ({
    tag: "sym",
    type,
    id,
    q
});

export const lit = <T extends Type>(type: T, val: any): Lit<T> => ({
    tag: "lit",
    type,
    val
});

export const float = (x: number | Term<"f32">) => lit("f32", x);

export const int = (x: number | Term<"i32">) =>
    lit("i32", isNumber(x) ? x | 0 : x);

export const uint = (x: number | Term<"u32">) =>
    lit("u32", isNumber(x) ? x >>> 0 : x);

export function swizzle(val: Term<"vec2">, id: Swizzle2_1): Swizzle<"f32">;
export function swizzle(val: Term<"vec2">, id: Swizzle2_2): Swizzle<"vec2">;
export function swizzle(val: Term<"vec2">, id: Swizzle2_3): Swizzle<"vec3">;
export function swizzle(val: Term<"vec2">, id: Swizzle2_4): Swizzle<"vec4">;
export function swizzle(val: Term<"vec3">, id: Swizzle3_1): Swizzle<"f32">;
export function swizzle(val: Term<"vec3">, id: Swizzle3_2): Swizzle<"vec2">;
export function swizzle(val: Term<"vec3">, id: Swizzle3_3): Swizzle<"vec3">;
export function swizzle(val: Term<"vec3">, id: Swizzle3_4): Swizzle<"vec4">;
export function swizzle(val: Term<"vec4">, id: Swizzle4_1): Swizzle<"f32">;
export function swizzle(val: Term<"vec4">, id: Swizzle4_2): Swizzle<"vec2">;
export function swizzle(val: Term<"vec4">, id: Swizzle4_3): Swizzle<"vec3">;
export function swizzle(val: Term<"vec4">, id: Swizzle4_4): Swizzle<"vec4">;
export function swizzle(val: Term<any>, id: string): Swizzle<any> {
    return {
        tag: "swizzle",
        type: id.length == 1 ? "f32" : "vec" + id.length,
        val,
        id
    };
}

export function vec2(x: number | Term<"f32">): Lit<"vec2">;
// prettier-ignore
export function vec2(x: number | Term<"f32">, y: number | Term<"f32">): Lit<"vec2">;
// prettier-ignore
export function vec2(x: number | Term<"f32">, y?: number | Term<"f32">): Lit<"vec2"> {
    return lit("vec2", [
        isNumber(x) ? float(x) : x,
        isNumber(y) ? float(y) : y
    ]);
}

export function vec3(x: number | Term<"f32">): Lit<"vec3">;
export function vec3(x: Term<"vec2">, y: number | Term<"f32">): Lit<"vec3">;
// prettier-ignore
export function vec3(x: number | Term<"f32">, y: number | Term<"f32">, z: number | Term<"f32">): Lit<"vec3">;
export function vec3(x: any, y?: any, z?: any): Lit<"vec3"> {
    return lit("vec3", [
        isNumber(x) ? float(x) : x,
        isNumber(y) ? float(y) : y,
        isNumber(z) ? float(z) : z
    ]);
}

export function vec4(x: number | Term<"f32">): Lit<"vec4">;
export function vec4(x: Term<"vec3">, y: number | Term<"f32">): Lit<"vec4">;
export function vec4(x: Term<"vec2">, y: Term<"vec2">): Lit<"vec4">;
// prettier-ignore
export function vec4(x: Term<"vec2">, y: number | Term<"f32">, z: number | Term<"f32">): Lit<"vec4">;
// prettier-ignore
export function vec4(x: number | Term<"f32">, y: number | Term<"f32">, z: number | Term<"f32">): Lit<"vec4">;
export function vec4(x: any, y?: any, z?: any, w?: any): Lit<"vec4"> {
    return lit("vec4", [
        isNumber(x) ? float(x) : x,
        isNumber(y) ? float(y) : y,
        isNumber(z) ? float(z) : z,
        isNumber(w) ? float(w) : w
    ]);
}

export const op1 = <T extends Type>(op: Operator, val: Term<T>): Op1<T> => ({
    tag: "op1",
    type: val.type,
    op,
    val
});

// prettier-ignore
export function op2(op: Operator, l: Term<"bool">, r: Term<"bool">): Op2<"bool">;
export function op2(op: Operator, l: Term<"i32">, r: Term<"i32">): Op2<"i32">;
export function op2(op: Operator, l: Term<"u32">, r: Term<"u32">): Op2<"u32">;
export function op2(op: Operator, l: Term<"f32">, r: Term<"f32">): Op2<"f32">;
export function op2(op: Operator, l: Term<"vec2">, r: Term<"f32">): Op2<"vec2">;
export function op2(op: Operator, l: Term<"f32">, r: Term<"vec2">): Op2<"vec2">;
export function op2(op: Operator, l: Term<any>, r: Term<any>): Op2<any> {
    return {
        tag: "op2",
        type: isVec(l) ? l.type : isVec(r) ? r.type : "f32",
        op,
        l,
        r
    };
}

export const inc = <T extends Prim>(t: Term<T>): Op2<T> =>
    <Op2<any>>add(<Term<any>>t, float(1));

export const dec = <T extends Prim>(t: Term<T>): Op2<T> =>
    <Op2<any>>sub(<Term<any>>t, float(1));

export function add(l: Term<"f32">, r: Term<"f32">): Op2<"f32">;
export function add(l: Term<"i32">, r: Term<"i32">): Op2<"i32">;
export function add(l: Term<"u32">, r: Term<"u32">): Op2<"u32">;
export function add(l: Term<"f32">, r: Term<"vec2">): Op2<"vec2">;
export function add(l: Term<"vec2">, r: Term<"f32">): Op2<"vec2">;
export function add(l: Term<"vec2">, r: Term<"vec2">): Op2<"vec2">;
export function add(l: Term<"vec3">, r: Term<"f32">): Op2<"vec3">;
export function add(l: Term<"f32">, r: Term<"vec3">): Op2<"vec3">;
export function add(l: Term<"vec3">, r: Term<"vec3">): Op2<"vec3">;
export function add(l: Term<"vec4">, r: Term<"f32">): Op2<"vec4">;
export function add(l: Term<"f32">, r: Term<"vec4">): Op2<"vec4">;
export function add(l: Term<"vec4">, r: Term<"vec4">): Op2<"vec4">;
export function add(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("+", l, r);
}

export function sub(l: Term<"f32">, r: Term<"f32">): Op2<"f32">;
export function sub(l: Term<"i32">, r: Term<"i32">): Op2<"i32">;
export function sub(l: Term<"u32">, r: Term<"u32">): Op2<"u32">;
export function sub(l: Term<"f32">, r: Term<"vec2">): Op2<"vec2">;
export function sub(l: Term<"vec2">, r: Term<"f32">): Op2<"vec2">;
export function sub(l: Term<"vec2">, r: Term<"vec2">): Op2<"vec2">;
export function sub(l: Term<"vec3">, r: Term<"f32">): Op2<"vec3">;
export function sub(l: Term<"f32">, r: Term<"vec3">): Op2<"vec3">;
export function sub(l: Term<"vec3">, r: Term<"vec3">): Op2<"vec3">;
export function sub(l: Term<"vec4">, r: Term<"f32">): Op2<"vec4">;
export function sub(l: Term<"f32">, r: Term<"vec4">): Op2<"vec4">;
export function sub(l: Term<"vec4">, r: Term<"vec4">): Op2<"vec4">;
export function sub(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("-", l, r);
}

export function mul(l: Term<"f32">, r: Term<"f32">): Op2<"f32">;
export function mul(l: Term<"i32">, r: Term<"i32">): Op2<"i32">;
export function mul(l: Term<"u32">, r: Term<"u32">): Op2<"u32">;
export function mul(l: Term<"f32">, r: Term<"vec2">): Op2<"vec2">;
export function mul(l: Term<"vec2">, r: Term<"f32">): Op2<"vec2">;
export function mul(l: Term<"vec2">, r: Term<"vec2">): Op2<"vec2">;
export function mul(l: Term<"vec3">, r: Term<"f32">): Op2<"vec3">;
export function mul(l: Term<"f32">, r: Term<"vec3">): Op2<"vec3">;
export function mul(l: Term<"vec3">, r: Term<"vec3">): Op2<"vec3">;
export function mul(l: Term<"vec4">, r: Term<"f32">): Op2<"vec4">;
export function mul(l: Term<"f32">, r: Term<"vec4">): Op2<"vec4">;
export function mul(l: Term<"vec4">, r: Term<"vec4">): Op2<"vec4">;
export function mul(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("*", l, r);
}

export function div(l: Term<"f32">, r: Term<"f32">): Op2<"f32">;
export function div(l: Term<"i32">, r: Term<"i32">): Op2<"i32">;
export function div(l: Term<"u32">, r: Term<"u32">): Op2<"u32">;
export function div(l: Term<"f32">, r: Term<"vec2">): Op2<"vec2">;
export function div(l: Term<"vec2">, r: Term<"f32">): Op2<"vec2">;
export function div(l: Term<"vec2">, r: Term<"vec2">): Op2<"vec2">;
export function div(l: Term<"vec3">, r: Term<"f32">): Op2<"vec3">;
export function div(l: Term<"f32">, r: Term<"vec3">): Op2<"vec3">;
export function div(l: Term<"vec3">, r: Term<"vec3">): Op2<"vec3">;
export function div(l: Term<"vec4">, r: Term<"f32">): Op2<"vec4">;
export function div(l: Term<"f32">, r: Term<"vec4">): Op2<"vec4">;
export function div(l: Term<"vec4">, r: Term<"vec4">): Op2<"vec4">;
export function div(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("/", l, r);
}

export const neg = <T extends Prim>(val: Term<T>) => op1("-", val);

export const not = (val: Term<"bool">) => op1("!", val);

export const or = (a: Term<"bool">, b: Term<"bool">) => op2("||", a, b);

export const and = (a: Term<"bool">, b: Term<"bool">) => op2("&&", a, b);

const defArg = <T extends Type>([type, id, q]: Arg<T>): FuncArg<T> => ({
    tag: "arg",
    type,
    id,
    q: q || "in"
});

// prettier-ignore
export function defn<T extends Type>(type: T, name: string, args: [], body: Fn0<Term<any>[]>): Func0<T>;
// prettier-ignore
export function defn<T extends Type, A extends Type>(type: T, name: string, args: Arg1<A>, body: Fn<Sym<A>, Term<any>[]>): Func1<A,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type>(type: T, name: string, args: Arg2<A,B>, body: Fn2<Sym<A>, Sym<B>, Term<any>[]>): Func2<A,B,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type>(type: T, name: string, args: Arg3<A,B,C>, body: Fn3<Sym<A>, Sym<B>, Sym<C>, Term<any>[]>): Func3<A,B,C,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type>(type: T, name: string, args: Arg4<A,B,C,D>, body: Fn4<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Term<any>[]>): Func4<A,B,C,D,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type>(type: T, name: string, args: Arg5<A,B,C,D,E>, body: Fn5<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Term<any>[]>): Func5<A,B,C,D,E,T>;
// prettier-ignore
export function defn(type: Type, id: string, _args: Arg<any>[], _body: (...xs: Sym<any>[]) => Term<any>[]): Func<any> {
    const args = _args.map(defArg);
    const body = _body(...args.map((x) => sym(x.type, x.id, x.q)));
    // TODO properly filter AST return terms and check for type compatibility
    // currently only top level terms are checked
    const returns = body.filter((t) => t.tag === "ret");
    const mismatched = returns.find((t) => t.type !== type);
    if (mismatched) {
        throw new Error(
            `wrong return type for function '${id}', expected ${type}, got ${
                mismatched.type
            }`
        );
    } else if (type !== "void" && !returns.length) {
        throw new Error(`function '${id}' must return a value of type ${type}`);
    }
    const $: any = (...xs: any[]) => funcall(id, type, ...xs);
    return Object.assign($, {
        tag: "fn",
        type,
        id,
        args,
        body
    });
}

export function ret(): FuncReturn<"void">;
export function ret<T extends Type>(val: Term<T>): FuncReturn<T>;
export function ret(val?: Term<any>): FuncReturn<any> {
    return {
        tag: "ret",
        type: val ? val.type : "void",
        val
    };
}

// prettier-ignore
export function funcall<T extends Type>(fn: string, type: T, ...args: Term<any>[]): FunCall<T>;
// prettier-ignore
export function funcall<A extends Type, T extends Type>(fn: Func1<A,T>, a: Term<A>): FunCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, T extends Type>(fn: Func2<A,B,T>, a: Term<A>, b: Term<B>): FunCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, T extends Type>(fn: Func3<A,B,C,T>, a: Term<A>, b: Term<B>, c: Term<C>): FunCall<T>;
// prettier-ignore
export function funcall(fn: string | Func<any>, ...args: Term<any>[]): FunCall<any> {
    return isString(fn)
        ? {
              tag: "call",
              type: args[0],
              id: fn,
              args: args.slice(1)
          }
        : {
              tag: "call",
              type: fn.type,
              id: fn.id,
              args
          };
}
