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
    | "array_init"
    | "assign"
    | "call"
    | "call_i"
    | "ctrl"
    | "decl"
    | "fn"
    | "for"
    | "idx"
    | "if"
    | "lit"
    | "op1"
    | "op2"
    | "ret"
    | "scope"
    | "swizzle"
    | "sym"
    | "ternary"
    | "while";

export type Type =
    | "void"
    | "bool"
    | "bool[]"
    | "float"
    | "float[]"
    | "int"
    | "int[]"
    | "uint"
    | "uint[]"
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
    | "uvec2"
    | "uvec2[]"
    | "uvec3"
    | "uvec3[]"
    | "uvec4"
    | "uvec4[]"
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
    | "sampler2D"
    | "sampler2D[]"
    | "sampler3D"
    | "sampler3D[]"
    | "samplerCube"
    | "samplerCube[]"
    | "sampler2DShadow"
    | "sampler2DShadow[]"
    | "samplerCubeShadow"
    | "samplerCubeShadow[]"
    | "isampler2D"
    | "isampler2D[]"
    | "isampler3D"
    | "isampler3D[]"
    | "isamplerCube"
    | "isamplerCube[]"
    | "usampler2D"
    | "usampler2D[]"
    | "usampler3D"
    | "usampler3D[]"
    | "usamplerCube"
    | "usamplerCube[]";

export interface ArrayTypeMap {
    bool: "bool[]";
    float: "float[]";
    int: "int[]";
    uint: "uint[]";
    vec2: "vec2[]";
    vec3: "vec3[]";
    vec4: "vec4[]";
    ivec2: "ivec2[]";
    ivec3: "ivec3[]";
    ivec4: "ivec4[]";
    uvec2: "uvec2[]";
    uvec3: "uvec3[]";
    uvec4: "uvec4[]";
    bvec2: "bvec2[]";
    bvec3: "bvec3[]";
    bvec4: "bvec4[]";
    mat2: "mat2[]";
    mat3: "mat3[]";
    mat4: "mat4[]";
    sampler2D: "sampler2D[]";
    sampler3D: "sampler3D[]";
    samplerCube: "samplerCube[]";
    sampler2DShadow: "sampler2DShadow[]";
    samplerCubeShadow: "samplerCubeShadow[]";
    isampler2D: "isampler2D[]";
    isampler3D: "isampler3D[]";
    isamplerCube: "isamplerCube[]";
    usampler2D: "usampler2D[]";
    usampler3D: "usampler3D[]";
    usamplerCube: "usamplerCube[]";
}

export interface IndexTypeMap {
    "bool[]": "bool";
    "float[]": "float";
    "int[]": "int";
    "uint[]": "uint";
    "vec2[]": "vec2";
    "vec3[]": "vec3";
    "vec4[]": "vec4";
    "ivec2[]": "ivec2";
    "ivec3[]": "ivec3";
    "ivec4[]": "ivec4";
    "uvec2[]": "uvec2";
    "uvec3[]": "uvec3";
    "uvec4[]": "uvec4";
    "bvec2[]": "bvec2";
    "bvec3[]": "bvec3";
    "bvec4[]": "bvec4";
}

export type BoolTerm = Term<"bool">;
export type FloatTerm = Term<"float">;
export type IntTerm = Term<"int">;
export type UintTerm = Term<"uint">;
export type Vec2Term = Term<"vec2">;
export type Vec3Term = Term<"vec3">;
export type Vec4Term = Term<"vec4">;
export type IVec2Term = Term<"ivec2">;
export type IVec3Term = Term<"ivec3">;
export type IVec4Term = Term<"ivec4">;
export type UVec2Term = Term<"uvec2">;
export type UVec3Term = Term<"uvec3">;
export type UVec4Term = Term<"uvec4">;
export type BVec2Term = Term<"bvec2">;
export type BVec3Term = Term<"bvec3">;
export type BVec4Term = Term<"bvec4">;
export type Mat2Term = Term<"mat2">;
export type Mat3Term = Term<"mat3">;
export type Mat4Term = Term<"mat4">;
export type Sampler2DTerm = Term<"sampler2D">;
export type Sampler3DTerm = Term<"sampler3D">;
export type SamplerCubeTerm = Term<"samplerCube">;
export type ISampler2DTerm = Term<"isampler2D">;
export type ISampler3DTerm = Term<"isampler3D">;
export type ISamplerCubeTerm = Term<"isamplerCube">;
export type USampler2DTerm = Term<"usampler2D">;
export type USampler3DTerm = Term<"usampler3D">;
export type USamplerCubeTerm = Term<"usamplerCube">;

export type BoolSym = Sym<"bool">;
export type FloatSym = Sym<"float">;
export type IntSym = Sym<"int">;
export type UintSym = Sym<"uint">;
export type Vec2Sym = Sym<"vec2">;
export type Vec3Sym = Sym<"vec3">;
export type Vec4Sym = Sym<"vec4">;
export type IVec2Sym = Sym<"ivec2">;
export type IVec3Sym = Sym<"ivec3">;
export type IVec4Sym = Sym<"ivec4">;
export type UVec2Sym = Sym<"uvec2">;
export type UVec3Sym = Sym<"uvec3">;
export type UVec4Sym = Sym<"uvec4">;
export type BVec2Sym = Sym<"bvec2">;
export type BVec3Sym = Sym<"bvec3">;
export type BVec4Sym = Sym<"bvec4">;
export type Mat2Sym = Sym<"mat2">;
export type Mat3Sym = Sym<"mat3">;
export type Mat4Sym = Sym<"mat4">;
export type Sampler2DSym = Sym<"sampler2D">;
export type Sampler3DSym = Sym<"sampler3D">;
export type SamplerCubeSym = Sym<"samplerCube">;
export type ISampler2DSym = Sym<"isampler2D">;
export type ISampler3DSym = Sym<"isampler3D">;
export type ISamplerCubeSym = Sym<"isamplerCube">;
export type USampler2DSym = Sym<"usampler2D">;
export type USampler3DSym = Sym<"usampler3D">;
export type USamplerCubeSym = Sym<"usamplerCube">;

export interface MatIndexTypeMap {
    mat2: "vec2";
    mat3: "vec3";
    mat4: "vec4";
}

export type Indexable = keyof IndexTypeMap;

export type Vec = "vec2" | "vec3" | "vec4";
export type IVec = "ivec2" | "ivec3" | "ivec4";
export type UVec = "uvec2" | "uvec3" | "uvec4";
export type BVec = "bvec2" | "bvec3" | "bvec4";
export type Mat = "mat2" | "mat3" | "mat4";
export type Sampler =
    | "sampler2D"
    | "sampler3D"
    | "samplerCube"
    | "sampler2DShadow"
    | "samplerCubeShadow"
    | "isampler2D"
    | "isampler3D"
    | "isamplerCube"
    | "usampler2D"
    | "usampler3D"
    | "usamplerCube";

export type Prim = "float" | Vec;
export type Int = "int" | "uint";
export type Comparable = "float" | Int;
export type Numeric = number | FloatTerm | IntTerm | UintTerm;
export type NumericF = number | FloatTerm;
export type NumericI = number | IntTerm;
export type NumericU = number | UintTerm;
export type NumericB = boolean | Numeric;

export type Assignable<T extends Type> = Sym<T> | Swizzle<T> | Index<T>;

export type MathOperator = "+" | "-" | "*" | "/" | "%" | "++" | "--";
export type LogicOperator = "!" | "||" | "&&";
export type ComparisonOperator = "<" | "<=" | "==" | "!=" | ">=" | ">";
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

export type Swizzle2 = Swizzle2_1 | Swizzle2_2 | Swizzle2_3 | Swizzle2_4;
export type Swizzle3 = Swizzle3_1 | Swizzle3_2 | Swizzle3_3 | Swizzle3_4;
export type Swizzle4 = Swizzle4_1 | Swizzle4_2 | Swizzle4_3 | Swizzle4_4;

export type Arg<A extends Type> = A | [A, string?, SymOpts?];
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

export type FnBody0 = Fn0<ScopeBody>;
export type FnBody1<A extends Type> = Fn<Sym<A>, ScopeBody>;
export type FnBody2<A extends Type, B extends Type> = Fn2<
    Sym<A>,
    Sym<B>,
    ScopeBody
>;
export type FnBody3<A extends Type, B extends Type, C extends Type> = Fn3<
    Sym<A>,
    Sym<B>,
    Sym<C>,
    ScopeBody
>;
export type FnBody4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type
> = Fn4<Sym<A>, Sym<B>, Sym<C>, Sym<D>, ScopeBody>;
export type FnBody5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type
> = Fn5<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, ScopeBody>;
export type FnBody6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type
> = Fn6<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, ScopeBody>;
export type FnBody7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type
> = Fn7<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>, ScopeBody>;
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
    ScopeBody
>;

export type Func0<T extends Type> = Fn0<FnCall<T>>;
export type Func1<A extends Type, T extends Type> = Fn<Term<A>, FnCall<T>>;
export type Func2<A extends Type, B extends Type, T extends Type> = Fn2<
    Term<A>,
    Term<B>,
    FnCall<T>
>;
export type Func3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> = Fn3<Term<A>, Term<B>, Term<C>, FnCall<T>>;
export type Func4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> = Fn4<Term<A>, Term<B>, Term<C>, Term<D>, FnCall<T>>;
export type Func5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> = Fn5<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, FnCall<T>>;
export type Func6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    T extends Type
> = Fn6<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<F>, FnCall<T>>;
export type Func7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    T extends Type
> = Fn7<
    Term<A>,
    Term<B>,
    Term<C>,
    Term<D>,
    Term<E>,
    Term<F>,
    Term<G>,
    FnCall<T>
>;
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
    FnCall<T>
>;

export type SymQualifier = "in" | "out" | "inout";

export type SymType = "in" | "out" | "uni";

export type Precision = "lowp" | "mediump" | "highp";

export type ScopeBody = (Term<any> | null | undefined)[];

export interface Term<T extends Type> {
    tag: Tag;
    type: T;
}

export interface Scoped {
    scope: Scope;
}

export interface Lit<T extends Type> extends Term<T> {
    val: any;
    info?: string;
}

export interface Sym<T extends Type> extends Term<T> {
    id: string;
    opts: SymOpts;
    init?: Term<T>;
}

export interface SymOpts {
    /**
     * If in global scope, used for:
     *
     * - `in` => attribute (in VS), varying (in FS)
     * - `out` => varying (in VS), output (in FS)
     *
     * For parameters / fn args:
     *
     * - `in` =>  passed into a function
     * - `out` => passed back out of a function, but not initialized
     * - `inout` => passed both into and out of a function
     */
    q?: SymQualifier;
    /**
     * Symbol type, only used for global scope in/out vars, e.g.
     * attribute, varying, uniform.
     */
    type?: SymType;
    /**
     * Const symbol
     */
    const?: boolean;
    /**
     * Precision qualifier
     */
    prec?: Precision;
    /**
     * Arrays only. Length
     */
    num?: number;
    /**
     * Layout location
     */
    loc?: number;
}

export interface ArrayInit<T extends Type> extends Term<T> {
    init: (Sym<T> | Lit<T>)[];
}

export interface Decl<T extends Type> extends Term<T> {
    id: Sym<T>;
}

export interface Swizzle<T extends Type> extends Term<T> {
    id: string;
    val: Term<Vec>;
}

export interface Index<T extends Type> extends Term<T> {
    id: Term<"int"> | Term<"uint">;
    val: Term<Indexable>;
}

export interface Assign<T extends Type> extends Term<T> {
    l: Assignable<T>;
    r: Term<T>;
}

export interface Op1<T extends Type> extends Term<T> {
    op: Operator;
    val: Term<any>;
    post?: boolean;
}

export interface Op2<T extends Type> extends Term<T> {
    info?: string;
    op: Operator;
    l: Term<any>;
    r: Term<any>;
}

export interface Scope extends Term<"void"> {
    body: Term<any>[];
    global: boolean;
}

export interface Branch extends Term<"void"> {
    test: BoolTerm;
    t: Scope;
    f?: Scope;
}

export interface Ternary<T extends Type> extends Term<T> {
    test: BoolTerm;
    t: Term<T>;
    f: Term<T>;
}

export interface ControlFlow extends Term<"void"> {
    tag: "ctrl";
    id: string;
}

export interface FuncReturn<T extends Type> extends Term<T> {
    val?: Term<any>;
}

export interface FuncArg<T extends Type> extends Term<T> {
    id: string;
    opts: SymOpts;
}

export interface Func<T extends Type> extends Term<T>, Scoped {
    id: string;
    args: Sym<any>[];
    deps: Func<any>[];
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
    info?: string;
    fn?: Func<T>;
}

export interface ForLoop extends Term<"void">, Scoped {
    init?: Decl<any>;
    test: BoolTerm;
    iter?: Term<any>;
}

export interface WhileLoop extends Term<"void">, Scoped {
    test: BoolTerm;
}

export interface TargetImpl<T> extends Record<Tag, Fn<any, T>> {
    arg: Fn<FuncArg<any>, T>;
    array_init: Fn<ArrayInit<any>, T>;
    assign: Fn<Assign<any>, T>;
    call: Fn<FnCall<any>, T>;
    call_i: Fn<FnCall<any>, T>;
    decl: Fn<Decl<any>, T>;
    fn: Fn<Func<any>, T>;
    for: Fn<ForLoop, T>;
    idx: Fn<Index<any>, T>;
    if: Fn<Branch, T>;
    lit: Fn<Lit<any>, T>;
    op1: Fn<Op1<any>, T>;
    op2: Fn<Op2<any>, T>;
    ret: Fn<FuncReturn<any>, T>;
    scope: Fn<Scope, T>;
    swizzle: Fn<Swizzle<any>, T>;
    sym: Fn<Sym<any>, T>;
    ternary: Fn<Ternary<any>, T>;
    while: Fn<WhileLoop, T>;
}
