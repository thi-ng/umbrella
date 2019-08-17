import { Fn } from "@thi.ng/api";
import { isBoolean, isNumber } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import {
    clamp,
    deg,
    fmod,
    fract,
    mix,
    rad,
    smoothStep,
    step
} from "@thi.ng/math";
import {
    add22,
    add33,
    add44,
    addN22,
    addN33,
    addN44,
    div22,
    div33,
    div44,
    divN22,
    divN33,
    divN44,
    mat22n,
    mat22v,
    mat33n,
    mat33v,
    mat44n,
    mat44v,
    mul22,
    mul33,
    mul44,
    mulM22,
    mulM33,
    mulM44,
    mulN22,
    mulN33,
    mulN44,
    mulV22,
    mulV33,
    mulV44,
    mulVM22,
    mulVM33,
    mulVM44,
    sub22,
    sub33,
    sub44,
    subN22,
    subN33,
    subN44
} from "@thi.ng/matrices";
import {
    defTarget,
    Func,
    isBool,
    isInt,
    isMat,
    isUint,
    isVec,
    Lit,
    Operator,
    Scope,
    Swizzle,
    Sym,
    Term
} from "@thi.ng/shader-ast";
import {
    abs2,
    abs3,
    abs4,
    acos2,
    acos3,
    acos4,
    add2,
    add3,
    add4,
    addI2,
    addI3,
    addI4,
    addN2,
    addN3,
    addN4,
    addNI2,
    addNI3,
    addNI4,
    addNU2,
    addNU3,
    addNU4,
    addU2,
    addU3,
    addU4,
    asin2,
    asin3,
    asin4,
    atan_22,
    atan_23,
    atan_24,
    atan2,
    atan3,
    atan4,
    bitAndI2,
    bitAndI3,
    bitAndI4,
    bitAndU2,
    bitAndU3,
    bitAndU4,
    bitNotI2,
    bitNotI3,
    bitNotI4,
    bitNotU2,
    bitNotU3,
    bitNotU4,
    bitOrI2,
    bitOrI3,
    bitOrI4,
    bitOrU2,
    bitOrU3,
    bitOrU4,
    bitXorI2,
    bitXorI3,
    bitXorI4,
    bitXorU2,
    bitXorU3,
    bitXorU4,
    ceil2,
    ceil3,
    ceil4,
    clamp2,
    clamp3,
    clamp4,
    cos2,
    cos3,
    cos4,
    cross3,
    degrees2,
    degrees3,
    degrees4,
    dist,
    div2,
    div3,
    div4,
    divI2,
    divI3,
    divI4,
    divN2,
    divN3,
    divN4,
    divNI2,
    divNI3,
    divNI4,
    divNU2,
    divNU3,
    divNU4,
    divU2,
    divU3,
    divU4,
    dot2,
    dot3,
    dot4,
    exp_22,
    exp_23,
    exp_24,
    exp2,
    exp3,
    exp4,
    faceForward,
    floor2,
    floor3,
    floor4,
    fmod2,
    fmod3,
    fmod4,
    fmodN2,
    fmodN3,
    fmodN4,
    fract2,
    fract3,
    fract4,
    invSqrt2,
    invSqrt3,
    invSqrt4,
    log_22,
    log_23,
    log_24,
    log2,
    log3,
    log4,
    lshiftI2,
    lshiftI3,
    lshiftI4,
    lshiftU2,
    lshiftU3,
    lshiftU4,
    mag,
    max2,
    max3,
    max4,
    min2,
    min3,
    min4,
    mix2,
    mix3,
    mix4,
    mixN2,
    mixN3,
    mixN4,
    mod2,
    mod3,
    mod4,
    modN2,
    modN3,
    modN4,
    mul2,
    mul3,
    mul4,
    mulI2,
    mulI3,
    mulI4,
    mulN2,
    mulN3,
    mulN4,
    mulNI2,
    mulNI3,
    mulNI4,
    mulNU2,
    mulNU3,
    mulNU4,
    mulU2,
    mulU3,
    mulU4,
    neg,
    normalize,
    pow2,
    pow3,
    pow4,
    radians2,
    radians3,
    radians4,
    reflect,
    refract,
    rshiftI2,
    rshiftI3,
    rshiftI4,
    rshiftU2,
    rshiftU3,
    rshiftU4,
    setSwizzle2,
    setSwizzle3,
    setSwizzle4,
    setVN3,
    setVN4,
    setVV4,
    sign2,
    sign3,
    sign4,
    sin2,
    sin3,
    sin4,
    smoothStep2,
    smoothStep3,
    smoothStep4,
    sqrt2,
    sqrt3,
    sqrt4,
    step2,
    step3,
    step4,
    sub2,
    sub3,
    sub4,
    subI2,
    subI3,
    subI4,
    subN2,
    subN3,
    subN4,
    subNI2,
    subNI3,
    subNI4,
    subNU2,
    subNU3,
    subNU4,
    subU2,
    subU3,
    subU4,
    swizzle2,
    swizzle3,
    swizzle4,
    tan2,
    tan3,
    tan4,
    vecOf,
    ZERO2,
    ZERO3,
    ZERO4
} from "@thi.ng/vectors";
import { JSBuiltinsSampler, JSEnv, JSTarget } from "./api";

// TODO texture lookups
// all texture fns currently return [0,0,0,0] or 0
const SAMPLER_TODO: JSBuiltinsSampler = {
    texelFetch: () => ZERO4,
    texelFetchOffset: () => ZERO4,
    texture: () => ZERO4,
    texturen: () => 0,
    textureGrad: () => ZERO4,
    textureGradn: () => 0,
    textureLod: () => ZERO4,
    textureLodn: () => 0,
    textureOffset: () => ZERO4,
    textureOffsetn: () => 0,
    textureProj: () => ZERO4,
    textureProjn: () => 0,
    textureSize: () => ZERO3
};

const env: Partial<JSEnv> = {
    vec2n: (n) => [n, n],
    vec3n: (n) => [n, n, n],
    vec4n: (n) => [n, n, n, n],
    vec3vn: (a, n) => setVN3([], a, n),
    vec4vn: (a, n) => setVN4([], a, n),
    vec4vnn: (a, z, w) => setVV4([], a, [z, w]),
    vec4vv: (a, b) => setVV4([], a, b),
    mat2n: (n) => mat22n([], n),
    mat2vv: (a, b) => mat22v([], a, b),
    mat3n: (n) => mat33n([], n),
    mat3vvv: (a, b, c) => mat33v([], a, b, c),
    mat4n: (n) => mat44n([], n),
    mat4vvvv: (a, b, c, d) => mat44v([], a, b, c, d),
    swizzle2: (a, b, c) => swizzle2([], a, b, c),
    swizzle3: (a, b, c, d) => swizzle3([], a, b, c, d),
    swizzle4: (a, b, c, d, e) => swizzle4([], a, b, c, d, e),
    set_swizzle2: setSwizzle2,
    set_swizzle3: setSwizzle3,
    set_swizzle4: setSwizzle4,
    float: {
        abs: Math.abs,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        atannn: Math.atan2,
        ceil: Math.ceil,
        clamp,
        cos: Math.cos,
        degrees: deg,
        dFdx: () => 0,
        dFdy: () => 0,
        exp: Math.exp,
        exp2: (x) => Math.pow(2, x),
        floor: Math.floor,
        fract,
        fwidth: () => 0,
        inversesqrt: (x) => 1 / Math.sqrt(x),
        log: Math.log,
        log2: Math.log2,
        max: Math.max,
        min: Math.min,
        mix,
        mixn: mix,
        mod: fmod,
        modn: fmod,
        pow: Math.pow,
        radians: rad,
        sign: Math.sign,
        sin: Math.sin,
        smoothstep: smoothStep,
        sqrt: Math.sqrt,
        step,
        tan: Math.tan
    },
    int: {
        abs: Math.abs,
        add: (a, b) => (a + b) | 0,
        bitand: (a, b) => a & b,
        bitnot1: (a) => ~a,
        bitor: (a, b) => a | b,
        bitxor: (a, b) => a ^ b,
        clamp,
        dec: (a) => (a - 1) | 0,
        div: (a, b) => (a / b) | 0,
        inc: (a) => (a + 1) | 0,
        lshift: (a, b) => a << b,
        max: Math.max,
        min: Math.min,
        modi: (a, b) => a % b,
        mul: (a, b) => (a * b) | 0,
        rshift: (a, b) => a >> b,
        sign: Math.sign,
        sub: (a, b) => (a - b) | 0,
        sub1: (a) => -a | 0
    },
    uint: {
        abs: Math.abs,
        add: (a, b) => (a + b) >>> 0,
        bitand: (a, b) => (a & b) >>> 0,
        bitnot1: (a) => ~a >>> 0,
        bitor: (a, b) => (a | b) >>> 0,
        bitxor: (a, b) => (a ^ b) >>> 0,
        clamp,
        dec: (a) => (a - 1) >>> 0,
        div: (a, b) => (a / b) >>> 0,
        inc: (a) => (a + 1) >>> 0,
        lshift: (a, b) => (a << b) >>> 0,
        max: Math.max,
        min: Math.min,
        modi: (a, b) => a % b,
        mul: (a, b) => (a * b) >>> 0,
        rshift: (a, b) => a >>> b,
        sign: Math.sign,
        sub: (a, b) => (a - b) >>> 0,
        sub1: (a) => -a >>> 0
    },
    vec2: {
        abs: (a) => abs2([], a),
        acos: (a) => acos2([], a),
        add: (a, b) => add2([], a, b),
        addnv: (a, b) => addN2([], b, a),
        addvn: (a, b) => addN2([], a, b),
        asin: (a) => asin2([], a),
        atan: (a) => atan2([], a),
        atannn: (a, b) => atan_22([], a, b),
        ceil: (a) => ceil2([], a),
        clamp: (x, a, b) => clamp2([], x, a, b),
        cos: (a) => cos2([], a),
        dec: (a) => subN2([], a, 1),
        degrees: (a) => degrees2([], a),
        dFdx: () => ZERO2,
        dFdy: () => ZERO2,
        distance: dist,
        div: (a, b) => div2([], a, b),
        divnv: (a, b) => mulN2([], b, 1 / a),
        divvn: (a, b) => divN2([], a, b),
        dot: (a, b) => dot2(a, b),
        exp: (a) => exp2([], a),
        exp2: (a) => exp_22([], a),
        faceForward: (a, b, c) => faceForward([], a, b, c),
        floor: (a) => floor2([], a),
        fract: (a) => fract2([], a),
        fwidth: () => ZERO2,
        inc: (a) => addN2([], a, 1),
        inversesqrt: (a) => invSqrt2([], a),
        length: mag,
        log: (a) => log2([], a),
        log2: (a) => log_22([], a),
        max: (a, b) => max2([], a, b),
        min: (a, b) => min2([], a, b),
        mix: (a, b, t) => mix2([], a, b, t),
        mixn: (a, b, t) => mixN2([], a, b, t),
        mod: (a, b) => fmod2([], a, b),
        modn: (a, b) => fmodN2([], a, b),
        mul: (a, b) => mul2([], a, b),
        mulnv: (a, b) => mulN2([], b, a),
        mulvn: (a, b) => mulN2([], a, b),
        normalize: (a) => normalize([], a),
        pow: (a, b) => pow2([], a, b),
        radians: (a) => radians2([], a),
        reflect: (a, b) => reflect([], a, b),
        refract: (a, b, c) => refract([], a, b, c),
        sign: (a) => sign2([], a),
        sin: (a) => sin2([], a),
        smoothstep: (a, b, t) => smoothStep2([], a, b, t),
        sqrt: (a) => sqrt2([], a),
        step: (a, b) => step2([], a, b),
        sub: (a, b) => sub2([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub2(null, [a, a], b),
        subvn: (a, b) => subN2([], a, b),
        tan: (a) => tan2([], a)
    },
    vec3: {
        abs: (a) => abs3([], a),
        acos: (a) => acos3([], a),
        add: (a, b) => add3([], a, b),
        addnv: (a, b) => addN3([], b, a),
        addvn: (a, b) => addN3([], a, b),
        asin: (a) => asin3([], a),
        atan: (a) => atan3([], a),
        atannn: (a, b) => atan_23([], a, b),
        ceil: (a) => ceil3([], a),
        clamp: (x, a, b) => clamp3([], x, a, b),
        cos: (a) => cos3([], a),
        cross: (a, b) => cross3([], a, b),
        dec: (a) => subN3([], a, 1),
        degrees: (a) => degrees3([], a),
        dFdx: () => ZERO3,
        dFdy: () => ZERO3,
        distance: dist,
        div: (a, b) => div3([], a, b),
        divnv: (a, b) => mulN3([], b, 1 / a),
        divvn: (a, b) => divN3([], a, b),
        dot: (a, b) => dot3(a, b),
        exp: (a) => exp3([], a),
        exp2: (a) => exp_23([], a),
        faceForward: (a, b, c) => faceForward([], a, b, c),
        floor: (a) => floor3([], a),
        fract: (a) => fract3([], a),
        fwidth: () => ZERO3,
        inc: (a) => addN3([], a, 1),
        inversesqrt: (a) => invSqrt3([], a),
        length: mag,
        log: (a) => log3([], a),
        log2: (a) => log_23([], a),
        max: (a, b) => max3([], a, b),
        min: (a, b) => min3([], a, b),
        mix: (a, b, t) => mix3([], a, b, t),
        mixn: (a, b, t) => mixN3([], a, b, t),
        mod: (a, b) => fmod3([], a, b),
        modn: (a, b) => fmodN3([], a, b),
        mul: (a, b) => mul3([], a, b),
        mulnv: (a, b) => mulN3([], b, a),
        mulvn: (a, b) => mulN3([], a, b),
        normalize: (a) => normalize([], a),
        pow: (a, b) => pow3([], a, b),
        radians: (a) => radians3([], a),
        reflect: (a, b) => reflect([], a, b),
        refract: (a, b, c) => refract([], a, b, c),
        sign: (a) => sign3([], a),
        sin: (a) => sin3([], a),
        smoothstep: (a, b, t) => smoothStep3([], a, b, t),
        sqrt: (a) => sqrt3([], a),
        step: (a, b) => step3([], a, b),
        sub: (a, b) => sub3([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub3(null, [a, a, a], b),
        subvn: (a, b) => subN3([], a, b),
        tan: (a) => tan3([], a)
    },
    vec4: {
        abs: (a) => abs4([], a),
        acos: (a) => acos4([], a),
        add: (a, b) => add4([], a, b),
        addnv: (a, b) => addN4([], b, a),
        addvn: (a, b) => addN4([], a, b),
        asin: (a) => asin4([], a),
        atan: (a) => atan4([], a),
        atannn: (a, b) => atan_24([], a, b),
        ceil: (a) => ceil4([], a),
        clamp: (x, a, b) => clamp4([], x, a, b),
        cos: (a) => cos4([], a),
        dec: (a) => subN4([], a, 1),
        degrees: (a) => degrees4([], a),
        dFdx: () => ZERO4,
        dFdy: () => ZERO4,
        distance: dist,
        div: (a, b) => div4([], a, b),
        divnv: (a, b) => mulN4([], b, 1 / a),
        divvn: (a, b) => divN4([], a, b),
        dot: (a, b) => dot4(a, b),
        exp: (a) => exp4([], a),
        exp2: (a) => exp_24([], a),
        faceForward: (a, b, c) => faceForward([], a, b, c),
        floor: (a) => floor4([], a),
        fract: (a) => fract4([], a),
        fwidth: () => ZERO4,
        inc: (a) => addN4([], a, 1),
        inversesqrt: (a) => invSqrt4([], a),
        length: mag,
        log: (a) => log4([], a),
        log2: (a) => log_24([], a),
        max: (a, b) => max4([], a, b),
        min: (a, b) => min4([], a, b),
        mix: (a, b, t) => mix4([], a, b, t),
        mixn: (a, b, t) => mixN4([], a, b, t),
        mod: (a, b) => fmod4([], a, b),
        modn: (a, b) => fmodN4([], a, b),
        mul: (a, b) => mul4([], a, b),
        mulnv: (a, b) => mulN4([], b, a),
        mulvn: (a, b) => mulN4([], a, b),
        normalize: (a) => normalize([], a),
        pow: (a, b) => pow4([], a, b),
        radians: (a) => radians4([], a),
        reflect: (a, b) => reflect([], a, b),
        refract: (a, b, c) => refract([], a, b, c),
        sign: (a) => sign4([], a),
        sin: (a) => sin4([], a),
        smoothstep: (a, b, t) => smoothStep4([], a, b, t),
        sqrt: (a) => sqrt4([], a),
        step: (a, b) => step4([], a, b),
        sub: (a, b) => sub4([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub4(null, [a, a, a, a], b),
        subvn: (a, b) => subN4([], a, b),
        tan: (a) => tan4([], a)
    },
    mat2: {
        add: (a, b) => add22([], a, b),
        addnv: (a, b) => addN22([], b, a),
        addvn: (a, b) => addN22([], a, b),
        dec: (a) => subN22([], a, 1),
        div: (a, b) => div22([], a, b),
        divnv: (a, b) => mulN22([], b, 1 / a),
        divvn: (a, b) => divN22([], a, b),
        inc: (a) => addN22([], a, 1),
        mul: (a, b) => mul22([], a, b),
        mulm: (a, b) => mulM22([], a, b),
        mulmv: (a, b) => mulV22([], a, b),
        mulnv: (a, b) => mulN22([], b, a),
        mulvm: (a, b) => mulVM22([], a, b),
        mulvn: (a, b) => mulN22([], a, b),
        sub: (a, b) => sub22([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub22(null, [a, a, a, a], b),
        subvn: (a, b) => subN22([], a, b)
    },
    mat3: {
        add: (a, b) => add33([], a, b),
        addnv: (a, b) => addN33([], b, a),
        addvn: (a, b) => addN33([], a, b),
        dec: (a) => subN33([], a, 1),
        div: (a, b) => div33([], a, b),
        divnv: (a, b) => mulN33([], b, 1 / a),
        divvn: (a, b) => divN33([], a, b),
        inc: (a) => addN33([], a, 1),
        mul: (a, b) => mul33([], a, b),
        mulm: (a, b) => mulM33([], a, b),
        mulmv: (a, b) => mulV33([], a, b),
        mulnv: (a, b) => mulN33([], b, a),
        mulvm: (a, b) => mulVM33([], a, b),
        mulvn: (a, b) => mulN33([], a, b),
        sub: (a, b) => sub33([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub33(null, vecOf(9, a), b),
        subvn: (a, b) => subN33([], a, b)
    },
    mat4: {
        add: (a, b) => add44([], a, b),
        addnv: (a, b) => addN44([], b, a),
        addvn: (a, b) => addN44([], a, b),
        dec: (a) => subN44([], a, 1),
        div: (a, b) => div44([], a, b),
        divnv: (a, b) => mulN44([], b, 1 / a),
        divvn: (a, b) => divN44([], a, b),
        inc: (a) => addN44([], a, 1),
        mul: (a, b) => mul44([], a, b),
        mulm: (a, b) => mulM44([], a, b),
        mulmv: (a, b) => mulV44([], a, b),
        mulnv: (a, b) => mulN44([], b, a),
        mulvm: (a, b) => mulVM44([], a, b),
        mulvn: (a, b) => mulN44([], a, b),
        sub: (a, b) => sub44([], a, b),
        sub1: (a) => neg([], a),
        subnv: (a, b) => sub44(null, vecOf(16, a), b),
        subvn: (a, b) => subN44([], a, b)
    },
    sampler1D: SAMPLER_TODO,
    sampler2D: SAMPLER_TODO,
    sampler3D: SAMPLER_TODO,
    samplerCube: SAMPLER_TODO,
    sampler2DShadow: SAMPLER_TODO,
    samplerCubeShadow: SAMPLER_TODO
};

env.ivec2 = {
    ...env.vec2!,
    add: (a, b) => addI2([], a, b),
    addvn: (a, b) => addNI2([], a, b),
    addnv: (a, b) => addNI2([], b, a),
    div: (a, b) => divI2([], a, b),
    divvn: (a, b) => divNI2([], a, b),
    divnv: (a, b) => mulNI2([], b, 1 / a),
    modi: (a, b) => mod2([], a, b),
    modivn: (a, b) => modN2([], a, b),
    modinv: (a, b) => mod2([], [a, a], b),
    mul: (a, b) => mulI2([], a, b),
    mulvn: (a, b) => mulNI2([], a, b),
    mulnv: (a, b) => mulNI2([], b, a),
    sub: (a, b) => subI2([], a, b),
    subvn: (a, b) => subNI2([], a, b),
    subnv: (a, b) => subI2([], [a, a], b),
    bitand: (a, b) => bitAndI2([], a, b),
    lshift: (a, b) => lshiftI2([], a, b),
    bitnot1: (a) => bitNotI2([], a),
    bitor: (a, b) => bitOrI2([], a, b),
    rshift: (a, b) => rshiftI2([], a, b),
    bitxor: (a, b) => bitXorI2([], a, b)
};

env.ivec3 = {
    ...env.vec3!,
    add: (a, b) => addI3([], a, b),
    addvn: (a, b) => addNI3([], a, b),
    addnv: (a, b) => addNI3([], b, a),
    div: (a, b) => divI3([], a, b),
    divvn: (a, b) => divNI3([], a, b),
    divnv: (a, b) => mulNI3([], b, 1 / a),
    modi: (a, b) => mod3([], a, b),
    modivn: (a, b) => modN3([], a, b),
    modinv: (a, b) => mod3([], [a, a, a], b),
    mul: (a, b) => mulI3([], a, b),
    mulvn: (a, b) => mulNI3([], a, b),
    mulnv: (a, b) => mulNI3([], b, a),
    sub: (a, b) => subI3([], a, b),
    subvn: (a, b) => subNI3([], a, b),
    subnv: (a, b) => subI3([], [a, a, a], b),
    bitand: (a, b) => bitAndI3([], a, b),
    lshift: (a, b) => lshiftI3([], a, b),
    bitnot1: (a) => bitNotI3([], a),
    bitor: (a, b) => bitOrI3([], a, b),
    rshift: (a, b) => rshiftI3([], a, b),
    bitxor: (a, b) => bitXorI3([], a, b)
};

env.ivec4 = {
    ...env.vec4!,
    add: (a, b) => addI4([], a, b),
    addvn: (a, b) => addNI4([], a, b),
    addnv: (a, b) => addNI4([], b, a),
    div: (a, b) => divI4([], a, b),
    divvn: (a, b) => divNI4([], a, b),
    divnv: (a, b) => mulNI4([], b, 1 / a),
    modi: (a, b) => mod4([], a, b),
    modivn: (a, b) => modN4([], a, b),
    modinv: (a, b) => mod4([], [a, a, a, a], b),
    mul: (a, b) => mulI4([], a, b),
    mulvn: (a, b) => mulNI4([], a, b),
    mulnv: (a, b) => mulNI4([], b, a),
    sub: (a, b) => subI4([], a, b),
    subvn: (a, b) => subNI4([], a, b),
    subnv: (a, b) => subI4([], [a, a, a, a], b),
    bitand: (a, b) => bitAndI4([], a, b),
    lshift: (a, b) => lshiftI4([], a, b),
    bitnot1: (a) => bitNotI4([], a),
    bitor: (a, b) => bitOrI4([], a, b),
    rshift: (a, b) => rshiftI4([], a, b),
    bitxor: (a, b) => bitXorI4([], a, b)
};

env.uvec2 = {
    ...env.vec2!,
    add: (a, b) => addU2([], a, b),
    addvn: (a, b) => addNU2([], a, b),
    addnv: (a, b) => addNU2([], b, a),
    div: (a, b) => divU2([], a, b),
    divvn: (a, b) => divNU2([], a, b),
    divnv: (a, b) => mulNU2([], b, 1 / a),
    modi: (a, b) => mod2([], a, b),
    modivn: (a, b) => modN2([], a, b),
    modinv: (a, b) => mod2([], [a, a], b),
    mul: (a, b) => mulU2([], a, b),
    mulvn: (a, b) => mulNU2([], a, b),
    mulnv: (a, b) => mulNU2([], b, a),
    sub: (a, b) => subU2([], a, b),
    subvn: (a, b) => subNU2([], a, b),
    subnv: (a, b) => subU2([], [a, a], b),
    bitand: (a, b) => bitAndU2([], a, b),
    lshift: (a, b) => lshiftU2([], a, b),
    bitnot1: (a) => bitNotU2([], a),
    bitor: (a, b) => bitOrU2([], a, b),
    rshift: (a, b) => rshiftU2([], a, b),
    bitxor: (a, b) => bitXorU2([], a, b)
};

env.uvec3 = {
    ...env.vec3!,
    add: (a, b) => addU3([], a, b),
    addvn: (a, b) => addNU3([], a, b),
    addnv: (a, b) => addNU3([], b, a),
    div: (a, b) => divU3([], a, b),
    divvn: (a, b) => divNU3([], a, b),
    divnv: (a, b) => mulNU3([], b, 1 / a),
    modi: (a, b) => mod3([], a, b),
    modivn: (a, b) => modN3([], a, b),
    modinv: (a, b) => mod3([], [a, a, a], b),
    mul: (a, b) => mulU3([], a, b),
    mulvn: (a, b) => mulNU3([], a, b),
    mulnv: (a, b) => mulNU3([], b, a),
    sub: (a, b) => subU3([], a, b),
    subvn: (a, b) => subNU3([], a, b),
    subnv: (a, b) => subU3([], [a, a, a], b),
    bitand: (a, b) => bitAndU3([], a, b),
    lshift: (a, b) => lshiftU3([], a, b),
    bitnot1: (a) => bitNotU3([], a),
    bitor: (a, b) => bitOrU3([], a, b),
    rshift: (a, b) => rshiftU3([], a, b),
    bitxor: (a, b) => bitXorU3([], a, b)
};

env.uvec4 = {
    ...env.vec4!,
    add: (a, b) => addU4([], a, b),
    addvn: (a, b) => addNU4([], a, b),
    addnv: (a, b) => addNU4([], b, a),
    div: (a, b) => divU4([], a, b),
    divvn: (a, b) => divNU4([], a, b),
    divnv: (a, b) => mulNU4([], b, 1 / a),
    modi: (a, b) => mod4([], a, b),
    modivn: (a, b) => modN4([], a, b),
    modinv: (a, b) => mod4([], [a, a, a, a], b),
    mul: (a, b) => mulU4([], a, b),
    mulvn: (a, b) => mulNU4([], a, b),
    mulnv: (a, b) => mulNU4([], b, a),
    sub: (a, b) => subU4([], a, b),
    subvn: (a, b) => subNU4([], a, b),
    subnv: (a, b) => subU4([], [a, a, a, a], b),
    bitand: (a, b) => bitAndU4([], a, b),
    lshift: (a, b) => lshiftU4([], a, b),
    bitnot1: (a) => bitNotU4([], a),
    bitor: (a, b) => bitOrU4([], a, b),
    rshift: (a, b) => rshiftU4([], a, b),
    bitxor: (a, b) => bitXorU4([], a, b)
};

export const JS_DEFAULT_ENV = <JSEnv>env;

export const targetJS = () => {
    const CMP_OPS: Partial<Record<Operator, string>> = {
        "!": "not",
        "<": "lt",
        "<=": "lte",
        "==": "eq",
        "!=": "neq",
        ">=": "gte",
        ">": "gt"
    };
    const OP_IDS: Record<Operator, string> = {
        ...(<any>CMP_OPS),
        "+": "add",
        "-": "sub",
        "*": "mul",
        "/": "div",
        "%": "modi",
        "++": "inc",
        "--": "dec",
        "||": "or",
        "&&": "and",
        "|": "bitor",
        "&": "bitand",
        "^": "bitxor",
        "~": "bitnot",
        "<<": "lshift",
        ">>": "rshift"
    };

    const PRELUDE =
        [
            "float",
            "int",
            "uint",
            "vec2",
            "vec3",
            "vec4",
            "ivec2",
            "ivec3",
            "ivec4",
            "uvec2",
            "uvec3",
            "uvec4",
            "mat2",
            "mat3",
            "mat4",
            "sampler2D",
            "sampler3D",
            "samplerCube",
            "sampler2DShadow",
            "samplerCubeShadow"
        ]
            .map((x) => `const ${x} = env.${x};`)
            .join("\n") + "\n";

    const COMPS: any = { x: 0, y: 1, z: 2, w: 3 };

    const RE_SEMI = /[};]$/;

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $docParam = (p: Sym<any>) => ` * @param ${p.id} ${p.type}`;

    const $fn = (name: string, args: Term<any>[]) => `${name}(${$list(args)})`;

    const $vec = ({ val, info, type }: Lit<any>) =>
        !info ? `[${$list(val)}]` : `env.${type}${info}(${$list(val)})`;

    const $swizzle = (id: string) => [...id].map((x) => COMPS[x]).join(", ");

    const emit: Fn<Term<any>, string> = defTarget({
        arg: (t) => t.id,

        array_init: (t) => `[${$list(t.init)}]`,

        assign: (t) => {
            if (t.l.tag === "swizzle") {
                const s = <Swizzle<any>>t.l;
                return s.id.length > 1
                    ? `env.set_swizzle${s.id.length}(${emit(s.val)}, ${emit(
                          t.r
                      )}, ${$swizzle(s.id)})`
                    : `(${emit(s.val)}[${$swizzle(s.id)}] = ${emit(t.r)})`;
            }
            return emit(t.l) + " = " + emit(t.r);
        },

        ctrl: (t) => t.id,

        call: (t) => $fn(t.id, t.args),

        call_i: (t) => $fn(`${t.args[0].type}.${t.id}${t.info || ""}`, t.args),

        decl: ({ type, id }) => {
            const res: string[] = [];
            res.push(id.opts.const ? "const" : "let");
            res.push(`/*${type}*/`);
            res.push(id.id);
            id.init
                ? res.push("=", emit(id.init))
                : id.opts.num !== undefined
                ? res.push("=", `new Array(${id.opts.num})`)
                : undefined;
            return res.join(" ");
        },

        fn: (t) =>
            "/**\n" +
            t.args.map($docParam).join("\n") +
            "\n */\n" +
            `function ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,

        for: (t) =>
            `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${
                t.iter ? emit(t.iter) : ""
            }) ${emit(t.scope)}`,

        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,

        if: (t) => {
            const res = `if (${emit(t.test)}) ` + emit(t.t);
            return t.f ? res + " else " + emit(t.f) : res;
        },

        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return isBoolean(v) ? String(v) : `!!(${emit(v)})`;
                case "float":
                    return isNumber(v)
                        ? String(v)
                        : isBool(v)
                        ? `(${emit(v)} & 1)`
                        : emit(v);
                case "int":
                    return isNumber(v) ? String(v) : `(${emit(v)} | 0)`;
                case "uint":
                    return isNumber(v) ? String(v) : `(${emit(v)} >>> 0)`;
                case "vec2":
                case "vec3":
                case "vec4":
                case "ivec2":
                case "ivec3":
                case "ivec4":
                case "uvec2":
                case "uvec3":
                case "uvec4":
                case "bvec2":
                case "bvec3":
                case "bvec4":
                case "mat2":
                case "mat3":
                case "mat4":
                    return $vec(t);
                default:
                    return unsupported(`unknown type: ${t.type}`);
            }
        },

        op1: (t) => {
            const complex = isVec(t) || isMat(t) || isInt(t);
            if (complex && t.post) {
                const s = <Sym<any>>t.val;
                return `${s.id} = ${t.type}.${OP_IDS[t.op]}(${emit(s)})`;
            } else {
                return complex
                    ? `${t.type}.${OP_IDS[t.op]}1(${emit(t.val)})`
                    : t.post
                    ? `(${emit(t.val)}${t.op})`
                    : `${t.op}${emit(t.val)}`;
            }
        },

        op2: (t) => {
            const { l, r } = t;
            const vec =
                isVec(l) || isMat(l)
                    ? l.type
                    : isVec(r) || isMat(r)
                    ? r.type
                    : undefined;
            const int = !vec
                ? isInt(l) || isUint(l) || isBool(l)
                    ? l.type
                    : isInt(r) || isUint(r) || isBool(r)
                    ? r.type
                    : undefined
                : undefined;
            const el = emit(l);
            const er = emit(r);
            return vec || (int && !CMP_OPS[t.op])
                ? `${vec || int}.${OP_IDS[t.op]}${t.info || ""}(${el}, ${er})`
                : `(${el} ${t.op} ${er})`;
        },

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += t.body.length && !RE_SEMI.test(res) ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) =>
            t.id.length > 1
                ? `env.swizzle${t.id.length}(${emit(t.val)}, ${$swizzle(t.id)})`
                : `${emit(t.val)}[${$swizzle(t.id)}]`,

        sym: (t) => t.id,

        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,

        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`
    });

    Object.assign(emit, <JSTarget>{
        compile: (tree, env = JS_DEFAULT_ENV) => {
            const exports =
                tree.tag === "scope"
                    ? (<Scope>tree).body
                          .filter((x) => x.tag === "fn")
                          .map(
                              (f) =>
                                  (<Func<any>>f).id + ": " + (<Func<any>>f).id
                          )
                          .join(",\n")
                    : tree.tag === "fn"
                    ? `${(<Func<any>>tree).id}: ${(<Func<any>>tree).id}`
                    : "";
            return new Function(
                "env",
                PRELUDE + emit(tree) + "\nreturn {\n" + exports + "\n};"
            )(env);
        }
    });

    return <JSTarget>emit;
};
