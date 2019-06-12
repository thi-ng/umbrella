import {
    Fn,
    Fn0,
    Fn2,
    Fn3,
    Fn4,
    Fn5
} from "@thi.ng/api";

export type Tag =
    | "sym"
    | "lit"
    | "op1"
    | "op2"
    | "access"
    | "call"
    | "fn"
    | "arg"
    | "ret";

export type Type =
    | "void"
    | "bool"
    | "f32"
    | "i32"
    | "u32"
    | "vec2"
    | "vec3"
    | "vec4";

export type Vec = "vec2" | "vec3" | "vec4";

export type Prim = "f32" | Vec;

export type MathOperator = "+" | "-" | "*" | "/";
export type LogicOperator = "!" | "||" | "&&";
export type ComparisonOperator = "<" | "<=" | "==" | ">=" | ">";
export type BitOperator = "<<" | ">>" | "|" | "&" | "^" | "~";
export type Operator =
    | MathOperator
    | LogicOperator
    | ComparisonOperator
    | BitOperator;

// swizzle gen:
// console.log([...permutations("xyz","xyz")].map((x) =>`"${x.join("")}"`).join(" | "))

export type Swizzle2_1 = "x" | "y";
export type Swizzle2_2 = "xx" | "xy" | "yx" | "yy";
export type Swizzle2_3 =
    | "xxx"
    | "xxy"
    | "xyx"
    | "xyy"
    | "yxx"
    | "yxy"
    | "yyx"
    | "yyy";
// prettier-ignore
export type Swizzle2_4 = "xxxx" | "xxxy" | "xxyx" | "xxyy" | "xyxx" | "xyxy" | "xyyx" | "xyyy" | "yxxx" | "yxxy" | "yxyx" | "yxyy" | "yyxx" | "yyxy" | "yyyx" | "yyyy";

export type Swizzle3_1 = "x" | "y" | "z";
export type Swizzle3_2 =
    | "xx"
    | "xy"
    | "xz"
    | "yx"
    | "yy"
    | "yz"
    | "zx"
    | "zy"
    | "zz";
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
// prettier-ignore
export type Arg3<A extends Type, B extends Type, C extends Type> = [Arg<A>, Arg<B>, Arg<C>];
// prettier-ignore
export type Arg4<A extends Type, B extends Type, C extends Type, D extends Type> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>];
// prettier-ignore
export type Arg5<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>];

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
}

export interface Access<T extends Type> extends Term<T> {
    val: Term<any>;
    id: string;
}

export interface FuncReturn<T extends Type> extends Term<T> {
    val?: Term<any>;
}

export interface FuncArg<T extends Type> extends Term<T> {
    id: string;
    q?: ArgQualifier;
}

export type Callable0<T extends Type> = Fn0<Term<T>>;
export type Callable1<A extends Type, T extends Type> = Fn<Term<A>, Term<T>>;
// prettier-ignore
export type Callable2<A extends Type, B extends Type, T extends Type> = Fn2<Term<A>, Term<B>, Term<T>>;
// prettier-ignore
export type Callable3<A extends Type, B extends Type, C extends Type, T extends Type> = Fn3<Term<A>, Term<B>, Term<C>, Term<T>>;
// prettier-ignore
export type Callable4<A extends Type, B extends Type, C extends Type, D extends Type, T extends Type> = Fn4<Term<A>, Term<B>, Term<C>, Term<D>, Term<T>>;
// prettier-ignore
export type Callable5<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, T extends Type> = Fn5<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<T>>;

export interface Func<T extends Type> extends Term<T> {
    id: string;
    args: Sym<any>[];
    body: Term<any>[];
    builtin: string;
}

export interface Func0<T extends Type> extends Callable0<T>, Func<T> {
    args: [];
}

export interface Func1<A extends Type, T extends Type>
    extends Callable1<A, T>,
        Func<T> {
    args: [Sym<A>];
}

export interface Func2<A extends Type, B extends Type, T extends Type>
    extends Callable2<A, B, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>];
}

export interface Func3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> extends Callable3<A, B, C, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>];
}

export interface Func4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> extends Callable4<A, B, C, D, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>];
}

export interface Func5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> extends Callable5<A, B, C, D, E, T>, Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>];
}

export interface FunCall<T extends Type> extends Term<T> {
    id: string;
    args: Term<any>[];
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
