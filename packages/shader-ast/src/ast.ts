import {
    assert,
    Fn,
    Fn2,
    IObjectOf,
    Select4
} from "@thi.ng/api";
import { isArray, isNumber, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import {
    Arg,
    Arg1,
    Arg2,
    Arg3,
    Arg4,
    Arg5,
    Arg6,
    Arg7,
    Arg8,
    Assign,
    Assignable,
    Branch,
    Comparable,
    ComparisonOperator,
    Decl,
    FnBody0,
    FnBody1,
    FnBody2,
    FnBody3,
    FnBody4,
    FnBody5,
    FnBody6,
    FnBody7,
    FnBody8,
    FnCall,
    Func,
    FuncArg,
    FuncReturn,
    Index,
    Indexable,
    IndexTypeMap,
    IVec,
    Lit,
    Mat,
    MatIndexTypeMap,
    Numeric,
    Op1,
    Op2,
    Operator,
    Prim,
    Scope,
    Swizzle,
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
    Sym,
    SymOpts,
    TaggedFn0,
    TaggedFn1,
    TaggedFn2,
    TaggedFn3,
    TaggedFn4,
    TaggedFn5,
    TaggedFn6,
    TaggedFn7,
    TaggedFn8,
    Term,
    Type,
    Vec
} from "./api";

let symID = 0;

export const gensym = () => `_sym${symID++}`;

export const isVec = (t: Term<any>) => t.type.indexOf("vec") >= 0;

export const isMat = (t: Term<any>) => t.type.indexOf("mat") >= 0;

export const itemType = (type: Type) => <Type>type.replace("[]", "");

export const wrapF32 = (x?: Numeric) => (isNumber(x) ? float(x) : x);

export const numberWithMatchingType = (t: Term<Prim>, x: number) =>
    t.type[0] === "i" ? int(x) : float(x);

export const children = (t: Term<any>) =>
    t.tag == "fn"
        ? (<Func<any>>t).scope.body
        : t.tag == "if"
        ? (<Branch>t).f
            ? (<Branch>t).t.body.concat((<Branch>t).f!.body)
            : (<Branch>t).t.body
        : undefined;

export const walk = <T>(
    visit: Fn2<T, Term<any>, void>,
    children: Fn<Term<any>, Term<any>[] | undefined>,
    acc: T,
    t: Term<any> | Term<any>[]
) => {
    if (isArray(t)) {
        t.forEach((x) => walk(visit, children, acc, x));
    } else {
        visit(acc, t);
        const c = children(t);
        c && walk(visit, children, acc, c);
    }
    return acc;
};

export function sym<T extends Type>(type: T): Sym<T>;
export function sym<T extends Type>(type: T, opts: SymOpts): Sym<T>;
export function sym<T extends Type>(type: T, init: Term<T>): Sym<T>;
export function sym<T extends Type>(type: T, id: string): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, id: string, opts: SymOpts): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, opts: SymOpts, init: Term<T>): Sym<T>;
// prettier-ignore
export function sym<T extends Type>(type: T, id: string, opts: SymOpts, init: Term<T>): Sym<T>;
export function sym<T extends Type>(type: T, ...xs: any[]): Sym<any> {
    let id: string;
    let opts: SymOpts;
    let init: Term<T>;
    switch (xs.length) {
        case 0:
            break;
        case 1:
            if (isString(xs[0])) {
                id = xs[0];
            } else if (xs[0].tag) {
                init = xs[0];
            } else {
                opts = xs[0];
            }
            break;
        case 2:
            if (isString(xs[0])) {
                [id, opts] = xs;
            } else {
                [opts, init] = xs;
            }
            break;
        case 3:
            [id, opts, init] = xs;
            break;
        default:
            illegalArgs();
    }
    return {
        tag: "sym",
        type,
        id: id! || gensym(),
        opts: opts! || {},
        init: init!
    };
}

export const constSym = <T extends Type>(
    type: T,
    id?: string,
    opts?: SymOpts,
    init?: Term<T>
) => sym(type, id || gensym(), { const: true, ...opts }, init!);

const decl = <T extends Type>(id: Sym<T>): Decl<T> => ({
    tag: "decl",
    type: id.type,
    id
});

export const lit = <T extends Type>(
    type: T,
    val: any,
    info?: string
): Lit<T> => ({
    tag: "lit",
    type,
    info,
    val
});

export const T = lit("bool", true);
export const F = lit("bool", false);
export const F32_0 = lit("f32", 0);
export const F32_1 = lit("f32", 1);

export const bool = (x: Numeric) => lit("bool", x);

export const float = (x: Numeric) => lit("f32", x);

export const int = (x: Numeric) => lit("i32", isNumber(x) ? x | 0 : x);

export const uint = (x: Numeric) => lit("u32", isNumber(x) ? x >>> 0 : x);

// prettier-ignore
export function swizzle<T extends Swizzle2>(a: Term<"vec2">, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "f32", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle3>(a: Term<"vec3">, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "f32", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle4>(a: Term<"vec4">, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "f32", "vec2", "vec3", "vec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle2>(a: Term<"ivec2">, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "i32", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle3>(a: Term<"ivec3">, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "i32", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle4>(a: Term<"ivec4">, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "i32", "ivec2", "ivec3", "ivec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle2>(a: Term<"bvec2">, id: T): Swizzle<Select4<T, Swizzle2_1, Swizzle2_2, Swizzle2_3, "bool", "bvec2", "bvec3", "bvec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle3>(a: Term<"bvec3">, id: T): Swizzle<Select4<T, Swizzle3_1, Swizzle3_2, Swizzle3_3, "bool", "bvec2", "bvec3", "bvec4">>;
// prettier-ignore
export function swizzle<T extends Swizzle4>(a: Term<"bvec4">, id: T): Swizzle<Select4<T, Swizzle4_1, Swizzle4_2, Swizzle4_3, "bool", "bvec2", "bvec3", "bvec4">>;
export function swizzle(val: Term<any>, id: string): Swizzle<any> {
    return {
        tag: "swizzle",
        type:
            val.type[0] === "i"
                ? id.length == 1
                    ? "i32"
                    : "ivec" + id.length
                : val.type[0] === "b"
                ? id.length == 1
                    ? "bool"
                    : "bvec" + id.length
                : id.length == 1
                ? "f32"
                : "vec" + id.length,
        val,
        id
    };
}

export const index = <T extends Indexable>(
    val: Sym<T>,
    id: number | Term<"i32"> | Term<"u32">
): Index<IndexTypeMap[T]> => ({
    tag: "idx",
    type: <any>val.type.substr(0, val.type.length - 2),
    id: isNumber(id) ? int(id) : id,
    val
});

// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, id: number): Index<MatIndexTypeMap[T]>;
// prettier-ignore
export function indexMat<T extends keyof MatIndexTypeMap>(m: Sym<T>, a: number, b: number): Index<"f32">;
export function indexMat(m: Sym<any>, a: number, b?: number): Index<any> {
    const idx: any = {
        tag: "idx",
        type: <any>m.type.replace("mat", "vec"),
        id: int(a),
        val: m
    };
    return b !== undefined
        ? { tag: "idx", type: "f32", id: int(b), val: idx }
        : idx;
}

export const assign = <L extends Type, R extends L>(
    l: Assignable<L>,
    r: Term<R>
): Assign<L> => {
    assert(
        l.tag !== "swizzle" || (<Swizzle<any>>l).val.tag === "sym",
        "can't assign to non-symbol swizzle"
    );
    return {
        tag: "assign",
        type: l.type,
        l,
        r
    };
};

const $vec = (xs: any[], init = F32_0) => [
    xs[0] === undefined ? init : wrapF32(xs[0]),
    ...xs.slice(1).map(wrapF32)
];

export function vec2(): Lit<"vec2">;
export function vec2(x: Numeric): Lit<"vec2">;
// prettier-ignore
export function vec2(x: Numeric, y: Numeric): Lit<"vec2">;
// prettier-ignore
export function vec2(...xs: any[]): Lit<"vec2"> {
    return lit("vec2", $vec(xs), ["n","n"][xs.length]);
}

export function vec3(): Lit<"vec3">;
export function vec3(x: Numeric): Lit<"vec3">;
export function vec3(x: Term<"vec2">, y: Numeric): Lit<"vec3">;
// prettier-ignore
export function vec3(x: Numeric, y: Numeric, z: Numeric): Lit<"vec3">;
export function vec3(...xs: any[]): Lit<"vec3"> {
    return lit("vec3", (xs = $vec(xs)), ["n", "n", "vn"][xs.length]);
}

export function vec4(): Lit<"vec4">;
export function vec4(x: Numeric): Lit<"vec4">;
export function vec4(x: Term<"vec3">, y: Numeric): Lit<"vec4">;
export function vec4(x: Term<"vec2">, y: Term<"vec2">): Lit<"vec4">;
// prettier-ignore
export function vec4(x: Term<"vec2">, y: Numeric, z: Numeric): Lit<"vec4">;
// prettier-ignore
export function vec4(x: Numeric, y: Numeric, z: Numeric, w: Numeric): Lit<"vec4">;
export function vec4(...xs: any[]): Lit<"vec4"> {
    return lit(
        "vec4",
        (xs = $vec(xs)),
        xs.length === 2
            ? isVec(xs[1])
                ? "vv"
                : "vn"
            : ["n", "n", , "vnn"][xs.length]
    );
}

export function mat2(): Lit<"mat2">;
export function mat2(x: Numeric): Lit<"mat2">;
export function mat2(x: Term<"vec2">, y: Term<"vec2">): Lit<"mat2">;
// prettier-ignore
export function mat2(a: Numeric, b: Numeric, c: Numeric, d: Numeric): Lit<"mat2">;
export function mat2(...xs: any[]): Lit<"mat2"> {
    return lit("mat2", (xs = $vec(xs, F32_1)), ["n", "n", "vv"][xs.length]);
}

export function mat3(): Lit<"mat3">;
export function mat3(x: Numeric): Lit<"mat3">;
// prettier-ignore
export function mat3(x: Term<"vec3">, y: Term<"vec3">, z: Term<"vec3">): Lit<"mat3">;
// prettier-ignore
export function mat3(a: Numeric, b: Numeric, c: Numeric, d: Numeric, e: Numeric, f: Numeric, g: Numeric, h: Numeric, i: Numeric): Lit<"mat3">;
export function mat3(...xs: any[]): Lit<"mat3"> {
    return lit("mat3", (xs = $vec(xs, F32_1)), ["n", "n", , "vvv"][xs.length]);
}

export function mat4(): Lit<"mat4">;
export function mat4(x: Numeric): Lit<"mat4">;
// prettier-ignore
export function mat4(x: Term<"vec4">, y: Term<"vec4">, z: Term<"vec4">, w: Term<"vec4">): Lit<"mat4">;
// prettier-ignore
export function mat4(a: Numeric, b: Numeric, c: Numeric, d: Numeric, e: Numeric, f: Numeric, g: Numeric, h: Numeric, i: Numeric, j: Numeric, k: Numeric, l: Numeric, m: Numeric, n: Numeric, o: Numeric, p: Numeric): Lit<"mat4">;
export function mat4(...xs: any[]): Lit<"mat4"> {
    return lit(
        "mat4",
        (xs = $vec(xs, F32_1)),
        ["n", "n", , , "vvvv"][xs.length]
    );
}

export const op1 = <T extends Type>(op: Operator, val: Term<T>): Op1<T> => ({
    tag: "op1",
    type: val.type,
    op,
    val
});

const OP_INFO: IObjectOf<string> = {
    mv: "mv",
    vm: "vm",
    vf: "vn",
    mf: "vn",
    fv: "nv",
    fm: "nv"
};

export const op2 = (
    op: Operator,
    l: Term<any>,
    r: Term<any>,
    rtype?: Type
): Op2<any> => {
    const type =
        rtype ||
        (isVec(l) ? l.type : isVec(r) ? r.type : isMat(r) ? r.type : l.type);
    return {
        tag: "op2",
        type,
        info: OP_INFO[l.type[0] + r.type[0]],
        op,
        l,
        r
    };
};

export const inc = <T extends Prim>(t: Term<T>): Op2<T> =>
    <Op2<any>>add(<Term<any>>t, <Term<any>>numberWithMatchingType(t, 1));

export const dec = <T extends Prim>(t: Term<T>): Op2<T> =>
    <Op2<any>>sub(<Term<any>>t, <Term<any>>numberWithMatchingType(t, 1));

// prettier-ignore
export function add<A extends Prim | IVec | Mat, B extends A>(l: Term<A>, b: Term<B>): Op2<A>;
// prettier-ignore
export function add<T extends Vec | Mat>(l: Term<"f32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function add<T extends Vec | Mat>(l: Term<T>, b: Term<"f32">): Op2<T>;
// prettier-ignore
export function add<T extends IVec>(l: Term<"i32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function add<T extends IVec>(l: Term<T>, b: Term<"i32">): Op2<T>;
// prettier-ignore
export function add(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("+", l, r);
}

// prettier-ignore
export function sub<A extends Prim | IVec | Mat, B extends A>(l: Term<A>, b: Term<B>): Op2<A>;
// prettier-ignore
export function sub<T extends Vec | Mat>(l: Term<"f32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function sub<T extends Vec | Mat>(l: Term<T>, b: Term<"f32">): Op2<T>;
// prettier-ignore
export function sub<T extends IVec>(l: Term<"i32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function sub<T extends IVec>(l: Term<T>, b: Term<"i32">): Op2<T>;
export function sub(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("-", l, r);
}

// prettier-ignore
export function mul<A extends Prim | IVec | Mat, B extends A>(l: Term<A>, b: Term<B>): Op2<A>;
// prettier-ignore
export function mul<T extends Vec | Mat>(l: Term<"f32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function mul<T extends Vec | Mat>(l: Term<T>, b: Term<"f32">): Op2<T>;
// prettier-ignore
export function mul<T extends IVec>(l: Term<"i32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function mul<T extends IVec>(l: Term<T>, b: Term<"i32">): Op2<T>;
export function mul(l: Term<"mat2">, b: Term<"vec2">): Op2<"vec2">;
export function mul(l: Term<"mat3">, b: Term<"vec3">): Op2<"vec3">;
export function mul(l: Term<"mat4">, b: Term<"vec4">): Op2<"vec4">;
export function mul(l: Term<"vec2">, b: Term<"mat2">): Op2<"vec2">;
export function mul(l: Term<"vec3">, b: Term<"mat3">): Op2<"vec3">;
export function mul(l: Term<"vec4">, b: Term<"mat4">): Op2<"vec4">;
export function mul(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("*", l, r, isMat(l) && isVec(r) ? r.type : undefined);
}

// prettier-ignore
export function div<A extends Prim | IVec | Mat, B extends A>(l: Term<A>, b: Term<B>): Op2<A>;
// prettier-ignore
export function div<T extends Vec | Mat>(l: Term<"f32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function div<T extends Vec | Mat>(l: Term<T>, b: Term<"f32">): Op2<T>;
// prettier-ignore
export function div<T extends IVec>(l: Term<"i32">, b: Term<T>): Op2<T>;
// prettier-ignore
export function div<T extends IVec>(l: Term<T>, b: Term<"i32">): Op2<T>;
export function div(l: Term<any>, r: Term<any>): Op2<any> {
    return op2("/", l, r);
}

export const neg = <T extends Prim | IVec | Mat>(val: Term<T>) => op1("-", val);

export const not = (val: Term<"bool">) => op1("!", val);
export const or = (a: Term<"bool">, b: Term<"bool">) => op2("||", a, b);
export const and = (a: Term<"bool">, b: Term<"bool">) => op2("&&", a, b);

const cmp = (op: ComparisonOperator) => <A extends Comparable, B extends A>(
    a: Term<A>,
    b: Term<B>
): Term<"bool"> => op2(op, a, b, "bool");

export const eq = cmp("==");
export const neq = cmp("!=");
export const lt = cmp("<");
export const lte = cmp("<=");
export const gt = cmp(">");
export const gte = cmp(">=");

export const scope = (body: Term<any>[], global = false): Scope => ({
    tag: "scope",
    type: "void",
    body: body.map((x) => (x.tag === "sym" ? decl(<Sym<any>>x) : x)),
    global
});

const defArg = <T extends Type>([type, id, opts]: Arg<T>): FuncArg<T> => ({
    tag: "arg",
    type,
    id: id || gensym(),
    opts: { q: "in", ...opts }
});

// prettier-ignore
export function defn<T extends Type>(type: T, name: string, args: [], body: FnBody0): TaggedFn0<T>;
// prettier-ignore
export function defn<T extends Type, A extends Type>(type: T, name: string, args: Arg1<A>, body: FnBody1<A>): TaggedFn1<A,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type>(type: T, name: string, args: Arg2<A,B>, body: FnBody2<A,B>): TaggedFn2<A,B,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type>(type: T, name: string, args: Arg3<A,B,C>, body: FnBody3<A,B,C>): TaggedFn3<A,B,C,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type>(type: T, name: string, args: Arg4<A,B,C,D>, body: FnBody4<A,B,C,D>): TaggedFn4<A,B,C,D,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type>(type: T, name: string, args: Arg5<A,B,C,D,E>, body: FnBody5<A,B,C,D,E>): TaggedFn5<A,B,C,D,E,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type>(type: T, name: string, args: Arg6<A,B,C,D,E,F>, body: FnBody6<A,B,C,D,E,F>): TaggedFn6<A,B,C,D,E,F,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type>(type: T, name: string, args: Arg7<A,B,C,D,E,F,G>, body: FnBody7<A,B,C,D,E,F,G>): TaggedFn7<A,B,C,D,E,F,G,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, H extends Type>(type: T, name: string, args: Arg8<A,B,C,D,E,F,G,H>, body: FnBody8<A,B,C,D,E,F,G,H>): TaggedFn8<A,B,C,D,E,F,G,H,T>;
// prettier-ignore
export function defn(type: Type, id: string, _args: Arg<any>[], _body: (...xs: Sym<any>[]) => Term<any>[]): Func<any> {
    const args = _args.map(defArg);
    const body = _body(...args.map((x) => sym(x.type, x.id, x.opts)));
    const returns = walk(
        (acc: FuncReturn<any>[], t) =>
            t.tag === "ret" && acc.push(t),
        children,
        [],
        body
    );
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
    return Object.assign($, <Func<any>>{
        tag: "fn",
        type,
        id,
        args,
        scope: scope(body)
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
export function funcall<T extends Type>(fn: string, type: T, ...args: Term<any>[]): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, T extends Type>(fn: TaggedFn1<A,T>, a: Term<A>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, T extends Type>(fn: TaggedFn2<A,B,T>, a: Term<A>, b: Term<B>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, T extends Type>(fn: TaggedFn3<A,B,C,T>, a: Term<A>, b: Term<B>, c: Term<C>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, T extends Type>(fn: TaggedFn4<A,B,C,D,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, T extends Type>(fn: TaggedFn5<A,B,C,D,E,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, T extends Type>(fn: TaggedFn6<A,B,C,D,E,F,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, T extends Type>(fn: TaggedFn7<A,B,C,D,E,F,G,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>, g: Term<G>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, H extends Type, T extends Type>(fn: TaggedFn8<A,B,C,D,E,F,G,H,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>, g: Term<G>, h: Term<H>): FnCall<T>;
// prettier-ignore
export function funcall(fn: string | Func<any>, ...args: Term<any>[]): FnCall<any> {
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

export const builtinCall = <T extends Type>(
    id: string,
    type: T,
    ...args: Term<any>[]
): FnCall<T> => ({
    tag: "call_i",
    type,
    id,
    args
});

export const ifThen = (
    test: Term<"bool">,
    truthy: Term<any>[],
    falsey?: Term<any>[]
): Branch => ({
    tag: "if",
    type: "void",
    test,
    t: scope(truthy),
    f: falsey ? scope(falsey) : undefined
});
