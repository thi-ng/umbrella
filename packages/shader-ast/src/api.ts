import {
    Fn,
    Fn0,
    Fn2,
    Fn3,
    Fn4,
    Fn5,
    Fn6,
    Fn7,
    Fn8
} from "@thi.ng/api";

export type Tag =
    | "arg"
    | "assign"
    | "call"
    | "call_i"
    | "decl"
    | "fn"
    | "idx"
    | "if"
    | "lit"
    | "op1"
    | "op2"
    | "ret"
    | "scope"
    | "swizzle"
    | "sym";

export type Type =
    | "void"
    | "bool"
    | "bool[]"
    | "f32"
    | "f32[]"
    | "i32"
    | "i32[]"
    | "u32"
    | "u32[]"
    | "vec2"
    | "vec2[]"
    | "vec3"
    | "vec3[]"
    | "vec4"
    | "vec4[]"
    | "ivec2"
    | "ivec2[]"
    | "ivec3"
    | "ivec3[]"
    | "ivec4"
    | "ivec4[]"
    | "bvec2"
    | "bvec2[]"
    | "bvec3"
    | "bvec3[]"
    | "bvec4"
    | "bvec4[]"
    | "mat2"
    | "mat2[]"
    | "mat3"
    | "mat3[]"
    | "mat4"
    | "mat4[]"
    | "sampler1D"
    | "sampler1D[]"
    | "sampler2D"
    | "sampler2D[]"
    | "sampler3D"
    | "sampler3D[]";

export type Indexable =
    | "bool[]"
    | "f32[]"
    | "i32[]"
    | "u32[]"
    | "vec2[]"
    | "vec3[]"
    | "vec4[]";

export interface IndexTypeMap {
    "bool[]": "bool";
    "f32[]": "f32";
    "i32[]": "i32";
    "u32[]": "u32";
    "vec2[]": "vec2";
    "vec3[]": "vec3";
    "vec4[]": "vec4";
    "ivec2[]": "ivec2";
    "ivec3[]": "ivec3";
    "ivec4[]": "ivec4";
    "bvec2[]": "bvec2";
    "bvec3[]": "bvec3";
    "bvec4[]": "bvec4";
}

export type Vec = "vec2" | "vec3" | "vec4";
export type IVec = "ivec2" | "ivec3" | "ivec4";
export type BVec = "bvec2" | "bvec3" | "bvec4";
export type Mat = "mat2" | "mat3" | "mat4";
export type Prim = "f32" | "i32" | "u32" | Vec;
export type Comparable = "f32" | "i32";
export type Numeric = number | Term<"f32"> | Term<"i32"> | Term<"u32">;

export type Assignable<T extends Type> = Sym<T> | Swizzle<T> | Index<T>;

export type MathOperator = "+" | "-" | "*" | "/";
export type LogicOperator = "!" | "||" | "&&";
export type ComparisonOperator = "<" | "<=" | "==" | "!=" | ">=" | ">";
export type BitOperator = "<<" | ">>" | "|" | "&" | "^" | "~";
export type Operator =
    | MathOperator
    | LogicOperator
    | ComparisonOperator
    | BitOperator;

export type Select<
    T extends Type,
    Q extends Type,
    A extends Type,
    B extends Type
> = T extends Q ? A : B;

// swizzle gen:
// console.log([...permutations("xyz","xyz")].map((x) =>`"${x.join("")}"`).join(" | "))

export type Swizzle2_1 = "x" | "y";
export type Swizzle2_2 = "xx" | "xy" | "yx" | "yy";
// prettier-ignore
export type Swizzle2_3 = "xxx" | "xxy" | "xyx" | "xyy" | "yxx" | "yxy" | "yyx" | "yyy";
// prettier-ignore
export type Swizzle2_4 = "xxxx" | "xxxy" | "xxyx" | "xxyy" | "xyxx" | "xyxy" | "xyyx" | "xyyy" | "yxxx" | "yxxy" | "yxyx" | "yxyy" | "yyxx" | "yyxy" | "yyyx" | "yyyy";

export type Swizzle3_1 = "x" | "y" | "z";
// prettier-ignore
export type Swizzle3_2 = "xx" | "xy" | "xz" | "yx" | "yy" | "yz" | "zx" | "zy" | "zz";
// prettier-ignore
export type Swizzle3_3 = "xxx" | "xxy" | "xxz" | "xyx" | "xyy" | "xyz" | "xzx" | "xzy" | "xzz" | "yxx" | "yxy" | "yxz" | "yyx" | "yyy" | "yyz" | "yzx" | "yzy" | "yzz" | "zxx" | "zxy" | "zxz" | "zyx" | "zyy" | "zyz" | "zzx" | "zzy" | "zzz";
// prettier-ignore
export type Swizzle3_4 = "xxxx" | "xxxy" | "xxxz" | "xxyx" | "xxyy" | "xxyz" | "xxzx" | "xxzy" | "xxzz" | "xyxx" | "xyxy" | "xyxz" | "xyyx" | "xyyy" | "xyyz" | "xyzx" | "xyzy" | "xyzz" | "xzxx" | "xzxy" | "xzxz" | "xzyx" | "xzyy" | "xzyz" | "xzzx" | "xzzy" | "xzzz" | "yxxx" | "yxxy" | "yxxz" | "yxyx" | "yxyy" | "yxyz" | "yxzx" | "yxzy" | "yxzz" | "yyxx" | "yyxy" | "yyxz" | "yyyx" | "yyyy" | "yyyz" | "yyzx" | "yyzy" | "yyzz" | "yzxx" | "yzxy" | "yzxz" | "yzyx" | "yzyy" | "yzyz" | "yzzx" | "yzzy" | "yzzz" | "zxxx" | "zxxy" | "zxxz" | "zxyx" | "zxyy" | "zxyz" | "zxzx" | "zxzy" | "zxzz" | "zyxx" | "zyxy" | "zyxz" | "zyyx" | "zyyy" | "zyyz" | "zyzx" | "zyzy" | "zyzz" | "zzxx" | "zzxy" | "zzxz" | "zzyx" | "zzyy" | "zzyz" | "zzzx" | "zzzy" | "zzzz";

export type Swizzle4_1 = "x" | "y" | "z" | "w";
// prettier-ignore
export type Swizzle4_2 = "xx" | "xy" | "xz" | "xw" | "yx" | "yy" | "yz" | "yw" | "zx" | "zy" | "zz" | "zw" | "wx" | "wy" | "wz" | "ww";
// prettier-ignore
export type Swizzle4_3 = "xxx" | "xxy" | "xxz" | "xxw" | "xyx" | "xyy" | "xyz" | "xyw" | "xzx" | "xzy" | "xzz" | "xzw" | "xwx" | "xwy" | "xwz" | "xww" | "yxx" | "yxy" | "yxz" | "yxw" | "yyx" | "yyy" | "yyz" | "yyw" | "yzx" | "yzy" | "yzz" | "yzw" | "ywx" | "ywy" | "ywz" | "yww" | "zxx" | "zxy" | "zxz" | "zxw" | "zyx" | "zyy" | "zyz" | "zyw" | "zzx" | "zzy" | "zzz" | "zzw" | "zwx" | "zwy" | "zwz" | "zww" | "wxx" | "wxy" | "wxz" | "wxw" | "wyx" | "wyy" | "wyz" | "wyw" | "wzx" | "wzy" | "wzz" | "wzw" | "wwx" | "wwy" | "wwz" | "www";
// prettier-ignore
export type Swizzle4_4 = "xxxx" | "xxxy" | "xxxz" | "xxxw" | "xxyx" | "xxyy" | "xxyz" | "xxyw" | "xxzx" | "xxzy" | "xxzz" | "xxzw" | "xxwx" | "xxwy" | "xxwz" | "xxww" | "xyxx" | "xyxy" | "xyxz" | "xyxw" | "xyyx" | "xyyy" | "xyyz" | "xyyw" | "xyzx" | "xyzy" | "xyzz" | "xyzw" | "xywx" | "xywy" | "xywz" | "xyww" | "xzxx" | "xzxy" | "xzxz" | "xzxw" | "xzyx" | "xzyy" | "xzyz" | "xzyw" | "xzzx" | "xzzy" | "xzzz" | "xzzw" | "xzwx" | "xzwy" | "xzwz" | "xzww" | "xwxx" | "xwxy" | "xwxz" | "xwxw" | "xwyx" | "xwyy" | "xwyz" | "xwyw" | "xwzx" | "xwzy" | "xwzz" | "xwzw" | "xwwx" | "xwwy" | "xwwz" | "xwww" | "yxxx" | "yxxy" | "yxxz" | "yxxw" | "yxyx" | "yxyy" | "yxyz" | "yxyw" | "yxzx" | "yxzy" | "yxzz" | "yxzw" | "yxwx" | "yxwy" | "yxwz" | "yxww" | "yyxx" | "yyxy" | "yyxz" | "yyxw" | "yyyx" | "yyyy" | "yyyz" | "yyyw" | "yyzx" | "yyzy" | "yyzz" | "yyzw" | "yywx" | "yywy" | "yywz" | "yyww" | "yzxx" | "yzxy" | "yzxz" | "yzxw" | "yzyx" | "yzyy" | "yzyz" | "yzyw" | "yzzx" | "yzzy" | "yzzz" | "yzzw" | "yzwx" | "yzwy" | "yzwz" | "yzww" | "ywxx" | "ywxy" | "ywxz" | "ywxw" | "ywyx" | "ywyy" | "ywyz" | "ywyw" | "ywzx" | "ywzy" | "ywzz" | "ywzw" | "ywwx" | "ywwy" | "ywwz" | "ywww" | "zxxx" | "zxxy" | "zxxz" | "zxxw" | "zxyx" | "zxyy" | "zxyz" | "zxyw" | "zxzx" | "zxzy" | "zxzz" | "zxzw" | "zxwx" | "zxwy" | "zxwz" | "zxww" | "zyxx" | "zyxy" | "zyxz" | "zyxw" | "zyyx" | "zyyy" | "zyyz" | "zyyw" | "zyzx" | "zyzy" | "zyzz" | "zyzw" | "zywx" | "zywy" | "zywz" | "zyww" | "zzxx" | "zzxy" | "zzxz" | "zzxw" | "zzyx" | "zzyy" | "zzyz" | "zzyw" | "zzzx" | "zzzy" | "zzzz" | "zzzw" | "zzwx" | "zzwy" | "zzwz" | "zzww" | "zwxx" | "zwxy" | "zwxz" | "zwxw" | "zwyx" | "zwyy" | "zwyz" | "zwyw" | "zwzx" | "zwzy" | "zwzz" | "zwzw" | "zwwx" | "zwwy" | "zwwz" | "zwww" | "wxxx" | "wxxy" | "wxxz" | "wxxw" | "wxyx" | "wxyy" | "wxyz" | "wxyw" | "wxzx" | "wxzy" | "wxzz" | "wxzw" | "wxwx" | "wxwy" | "wxwz" | "wxww" | "wyxx" | "wyxy" | "wyxz" | "wyxw" | "wyyx" | "wyyy" | "wyyz" | "wyyw" | "wyzx" | "wyzy" | "wyzz" | "wyzw" | "wywx" | "wywy" | "wywz" | "wyww" | "wzxx" | "wzxy" | "wzxz" | "wzxw" | "wzyx" | "wzyy" | "wzyz" | "wzyw" | "wzzx" | "wzzy" | "wzzz" | "wzzw" | "wzwx" | "wzwy" | "wzwz" | "wzww" | "wwxx" | "wwxy" | "wwxz" | "wwxw" | "wwyx" | "wwyy" | "wwyz" | "wwyw" | "wwzx" | "wwzy" | "wwzz" | "wwzw" | "wwwx" | "wwwy" | "wwwz" | "wwww";

export type Arg<A extends Type> = [A, string, ArgQualifier?];
export type Arg1<A extends Type> = [Arg<A>];
export type Arg2<A extends Type, B extends Type> = [Arg<A>, Arg<B>];
export type Arg3<A extends Type, B extends Type, C extends Type> = [
    Arg<A>,
    Arg<B>,
    Arg<C>
];
export type Arg4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>];
export type Arg5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>];
export type Arg6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>];
export type Arg7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>, Arg<G>];
export type Arg8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>, Arg<G>, Arg<H>];

export type FnBody0 = Fn0<Term<any>[]>;
export type FnBody1<A extends Type> = Fn<Sym<A>, Term<any>[]>;
export type FnBody2<A extends Type, B extends Type> = Fn2<
    Sym<A>,
    Sym<B>,
    Term<any>[]
>;
export type FnBody3<A extends Type, B extends Type, C extends Type> = Fn3<
    Sym<A>,
    Sym<B>,
    Sym<C>,
    Term<any>[]
>;
export type FnBody4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type
> = Fn4<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Term<any>[]>;
export type FnBody5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type
> = Fn5<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Term<any>[]>;
export type FnBody6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type
> = Fn6<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Term<any>[]>;
export type FnBody7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type
> = Fn7<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>, Term<any>[]>;
export type FnBody8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type
> = Fn8<
    Sym<A>,
    Sym<B>,
    Sym<C>,
    Sym<D>,
    Sym<E>,
    Sym<F>,
    Sym<G>,
    Sym<H>,
    Term<any>[]
>;

export type Func0<T extends Type> = Fn0<Term<T>>;
export type Func1<A extends Type, T extends Type> = Fn<Term<A>, Term<T>>;
export type Func2<A extends Type, B extends Type, T extends Type> = Fn2<
    Term<A>,
    Term<B>,
    Term<T>
>;
export type Func3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> = Fn3<Term<A>, Term<B>, Term<C>, Term<T>>;
export type Func4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> = Fn4<Term<A>, Term<B>, Term<C>, Term<D>, Term<T>>;
export type Func5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> = Fn5<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<T>>;
export type Func6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    T extends Type
> = Fn6<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<F>, Term<T>>;
export type Func7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    T extends Type
> = Fn7<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<F>, Term<G>, Term<T>>;
export type Func8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type,
    T extends Type
> = Fn8<
    Term<A>,
    Term<B>,
    Term<C>,
    Term<D>,
    Term<E>,
    Term<F>,
    Term<G>,
    Term<H>,
    Term<T>
>;

export type ArgQualifier = "in" | "out" | "inout";

export type Precision = "lowp" | "mediump" | "highp";

export interface Term<T extends Type> {
    tag: Tag;
    type: T;
}

export interface Lit<T extends Type> extends Term<T> {
    val: any;
}

export interface Sym<T extends Type> extends Term<T> {
    id: string;
    q: ArgQualifier;
    len?: number;
}

export interface Decl<T extends Type> extends Term<T> {
    id: Sym<T>;
}

export interface Swizzle<T extends Type> extends Term<T> {
    id: string;
    val: Term<Vec>;
}

export interface Index<T extends Type> extends Term<T> {
    id: Term<"i32"> | Term<"u32">;
    val: Term<Indexable>;
}

export interface Assign<T extends Type> extends Term<T> {
    l: Assignable<T>;
    r: Term<T>;
}

export interface Op1<T extends Type> extends Term<T> {
    op: Operator;
    val: Term<any>;
}

export interface Op2<T extends Type> extends Term<T> {
    op: Operator;
    l: Term<any>;
    r: Term<any>;
}

export interface Scope extends Term<"void"> {
    body: Term<any>[];
    global: boolean;
}

export interface Branch extends Term<"void"> {
    test: Term<"bool">;
    t: Scope;
    f?: Scope;
}

export interface FuncReturn<T extends Type> extends Term<T> {
    val?: Term<any>;
}

export interface FuncArg<T extends Type> extends Term<T> {
    id: string;
    q?: ArgQualifier;
}

export interface Func<T extends Type> extends Term<T> {
    id: string;
    args: Sym<any>[];
    scope: Scope;
}

export interface TaggedFn0<T extends Type> extends Func0<T>, Func<T> {
    args: [];
}

export interface TaggedFn1<A extends Type, T extends Type>
    extends Func1<A, T>,
        Func<T> {
    args: [Sym<A>];
}

export interface TaggedFn2<A extends Type, B extends Type, T extends Type>
    extends Func2<A, B, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>];
}

export interface TaggedFn3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> extends Func3<A, B, C, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>];
}

export interface TaggedFn4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> extends Func4<A, B, C, D, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>];
}

export interface TaggedFn5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> extends Func5<A, B, C, D, E, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>];
}

export interface TaggedFn6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    T extends Type
> extends Func6<A, B, C, D, E, F, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>];
}

export interface TaggedFn7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    T extends Type
> extends Func7<A, B, C, D, E, F, G, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>];
}

export interface TaggedFn8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type,
    T extends Type
> extends Func8<A, B, C, D, E, F, G, H, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>, Sym<H>];
}

export interface FnCall<T extends Type> extends Term<T> {
    id: string;
    args: Term<any>[];
}

export interface TargetImpl extends Record<Tag, Fn<any, string>> {
    arg: Fn<FuncArg<any>, string>;
    assign: Fn<Assign<any>, string>;
    call: Fn<FnCall<any>, string>;
    call_i: Fn<FnCall<any>, string>;
    fn: Fn<Func<any>, string>;
    idx: Fn<Index<any>, string>;
    if: Fn<Branch, string>;
    lit: Fn<Lit<any>, string>;
    op1: Fn<Op1<any>, string>;
    op2: Fn<Op2<any>, string>;
    ret: Fn<FuncReturn<any>, string>;
    scope: Fn<Scope, string>;
    swizzle: Fn<Swizzle<any>, string>;
    sym: Fn<Sym<any>, string>;
}
