import type { Fn, Fn2, Fn3, Fn4, Fn5, Fn6 } from "@thi.ng/api";
import type { Mat } from "@thi.ng/matrices";
import type { Term } from "@thi.ng/shader-ast";
import type { Vec } from "@thi.ng/vectors";

export interface JSTarget extends Fn<Term<any>, string> {
    /**
     * Compiles given AST to JavaScript, using optional `env` as backend
     * for various operators / builtins. If `env` is not given the
     * bundled {@link JS_DEFAULT_ENV} is used (based on
     * {@link @thi.ng/vectors# | @thi.ng/vectors} and {@link @thi.ng/matrices# | @thi.ng/matrices} packages).
     *
     * Any functions defined in the given AST will be exported using
     * their defined name via the returned object.
     *
     * ```
     * const js = targetJS();
     * const module = js.compile(
     *   defn("float", "foo", [["float"]], (x)=> [ret(mul(x, float(10)))])
     * );
     *
     * module.foo(42)
     * // 420
     *
     * module.foo.toString()
     * // function foo(_sym0) {
     * // return (_sym0 * 10);
     * // }
     * ```
     *
     * @param tree -
     * @param env -
     */
    compile(tree: Term<any>, env?: JSEnv): any;
}

export interface JSBuiltinsCommon<T> {
    abs: Fn<T, T>;
    clamp: Fn3<T, T, T, T>;
    max: Fn2<T, T, T>;
    min: Fn2<T, T, T>;
    sign: Fn<T, T>;
}

export interface JSBuiltinsMath<T> {
    sub1: Fn<T, T>;
    add: Fn2<T, T, T>;
    sub: Fn2<T, T, T>;
    mul: Fn2<T, T, T>;
    div: Fn2<T, T, T>;
    inc: Fn<T, T>;
    dec: Fn<T, T>;
}

export interface JSBuiltinsBinary<T> {
    bitand: Fn2<T, T, T>;
    lshift: Fn2<T, T, T>;
    bitnot1: Fn2<T, T, T>;
    bitor: Fn2<T, T, T>;
    rshift: Fn2<T, T, T>;
    bitxor: Fn2<T, T, T>;
}

export interface JSBuiltinsFloat<T> extends JSBuiltinsCommon<T> {
    acos: Fn<T, T>;
    asin: Fn<T, T>;
    atan: Fn<T, T>;
    atannn: Fn2<T, T, T>;
    ceil: Fn<T, T>;
    cos: Fn<T, T>;
    degrees: Fn<T, T>;
    dFdx: Fn<T, T>;
    dFdy: Fn<T, T>;
    exp: Fn<T, T>;
    exp2: Fn<T, T>;
    floor: Fn<T, T>;
    fract: Fn<T, T>;
    fwidth: Fn<T, T>;
    inversesqrt: Fn<T, T>;
    log: Fn<T, T>;
    log2: Fn<T, T>;
    mix: Fn3<T, T, T, T>;
    mixn: Fn3<T, T, number, T>;
    mod: Fn2<T, T, T>;
    modn: Fn2<T, number, T>;
    pow: Fn2<T, T, T>;
    radians: Fn<T, T>;
    sin: Fn<T, T>;
    smoothstep: Fn3<T, T, T, T>;
    sqrt: Fn<T, T>;
    step: Fn2<T, T, T>;
    tan: Fn<T, T>;
}

export interface JSBuiltinsInt<T>
    extends JSBuiltinsCommon<T>,
        JSBuiltinsMath<T>,
        JSBuiltinsBinary<T> {
    modi: Fn2<T, T, T>;
}

export interface JSBuiltinsVecScalar<T> {
    addvn: Fn2<T, number, T>;
    subvn: Fn2<T, number, T>;
    mulvn: Fn2<T, number, T>;
    divvn: Fn2<T, number, T>;
    addnv: Fn2<number, T, T>;
    subnv: Fn2<number, T, T>;
    mulnv: Fn2<number, T, T>;
    divnv: Fn2<number, T, T>;
}

export interface JSBuiltinsVec
    extends JSBuiltinsFloat<Vec>,
        JSBuiltinsMath<Vec>,
        JSBuiltinsVecScalar<Vec> {
    distance: Fn2<Vec, Vec, number>;
    dot: Fn2<Vec, Vec, number>;
    faceForward: Fn3<Vec, Vec, Vec, Vec>;
    length: Fn<Vec, number>;
    normalize: Fn<Vec, Vec>;
    reflect: Fn2<Vec, Vec, Vec>;
    refract: Fn3<Vec, Vec, number, Vec>;
}

export interface JSBuiltinsVec3 extends JSBuiltinsVec {
    cross: Fn2<Vec, Vec, Vec>;
}

export interface JSBuiltinsIntVec
    extends JSBuiltinsInt<Vec>,
        JSBuiltinsVecScalar<Vec>,
        JSBuiltinsBinary<Vec> {
    modivn: Fn2<Vec, number, Vec>;
    modinv: Fn2<number, Vec, Vec>;
}

export interface JSBuiltinsMat
    extends JSBuiltinsMath<Mat>,
        JSBuiltinsVecScalar<Mat> {
    mulm: Fn2<Mat, Mat, Mat>;
    mulvm: Fn2<Vec, Mat, Vec>;
    mulmv: Fn2<Mat, Vec, Vec>;
}

export interface JSBuiltinsSampler {
    texelFetch: Fn3<number, Vec, number, Vec>;
    texelFetchOffset: Fn4<number, Vec, number, Vec, Vec>;
    texture: Fn3<number, Vec, number, Vec>;
    texturen: Fn3<number, Vec, number, number>;
    textureGrad: Fn4<number, Vec, Vec, Vec, Vec>;
    textureGradn: Fn4<number, Vec, Vec, Vec, number>;
    textureLod: Fn3<number, Vec, number, Vec>;
    textureLodn: Fn3<number, Vec, number, number>;
    textureOffset: Fn4<number, Vec, Vec, number, Vec>;
    textureOffsetn: Fn4<number, Vec, Vec, number, number>;
    textureProj: Fn3<number, Vec, number, Vec>;
    textureProjn: Fn3<number, Vec, number, number>;
    textureSize: Fn2<number, number, Vec>;
}

export interface JSEnv {
    vec2n: Fn<number, Vec>;
    vec3n: Fn<number, Vec>;
    vec3vn: Fn2<Vec, number, Vec>;
    vec4n: Fn<number, Vec>;
    vec4vn: Fn2<Vec, number, Vec>;
    vec4vnn: Fn3<Vec, number, number, Vec>;
    vec4vv: Fn2<Vec, Vec, Vec>;
    mat2n: Fn<number, Mat>;
    mat2vv: Fn2<Vec, Vec, Mat>;
    mat3n: Fn<number, Mat>;
    mat3vvv: Fn3<Vec, Vec, Vec, Mat>;
    mat4n: Fn<number, Mat>;
    mat4vvvv: Fn4<Vec, Vec, Vec, Vec, Mat>;
    // swizzle1: Fn2<Vec, number, number>;
    swizzle2: Fn3<Vec, number, number, Vec>;
    swizzle3: Fn4<Vec, number, number, number, Vec>;
    swizzle4: Fn5<Vec, number, number, number, number, Vec>;
    // set_swizzle1: Fn3<Vec, number, number, Vec>;
    set_swizzle2: Fn4<Vec, Vec, number, number, Vec>;
    set_swizzle3: Fn5<Vec, Vec, number, number, number, Vec>;
    set_swizzle4: Fn6<Vec, Vec, number, number, number, number, Vec>;
    float: JSBuiltinsFloat<number>;
    int: JSBuiltinsInt<number>;
    uint: JSBuiltinsInt<number>;
    vec2: JSBuiltinsVec;
    vec3: JSBuiltinsVec3;
    vec4: JSBuiltinsVec;
    ivec2: JSBuiltinsIntVec;
    ivec3: JSBuiltinsIntVec;
    ivec4: JSBuiltinsIntVec;
    uvec2: JSBuiltinsIntVec;
    uvec3: JSBuiltinsIntVec;
    uvec4: JSBuiltinsIntVec;
    mat2: JSBuiltinsMat;
    mat3: JSBuiltinsMat;
    mat4: JSBuiltinsMat;
    sampler1D: JSBuiltinsSampler;
    sampler2D: JSBuiltinsSampler;
    sampler3D: JSBuiltinsSampler;
    samplerCube: JSBuiltinsSampler;
    sampler2DShadow: JSBuiltinsSampler;
    samplerCubeShadow: JSBuiltinsSampler;
}
