import { cross3 } from "@thi.ng/vectors/cross";
import { abs3 } from "@thi.ng/vectors/abs";
import { acos3 } from "@thi.ng/vectors/acos";
import { add3 } from "@thi.ng/vectors/add";
import { addN3 } from "@thi.ng/vectors/addn";
import { ZERO3 } from "@thi.ng/vectors/api";
import { asin3 } from "@thi.ng/vectors/asin";
import { atan3, atan_23 } from "@thi.ng/vectors/atan";
import { ceil3 } from "@thi.ng/vectors/ceil";
import { clamp3 } from "@thi.ng/vectors/clamp";
import { cos3 } from "@thi.ng/vectors/cos";
import { degrees3 } from "@thi.ng/vectors/degrees";
import { dist } from "@thi.ng/vectors/dist";
import { div3 } from "@thi.ng/vectors/div";
import { divN3 } from "@thi.ng/vectors/divn";
import { dot3 } from "@thi.ng/vectors/dot";
import { eq3 } from "@thi.ng/vectors/eq";
import { exp3 } from "@thi.ng/vectors/exp";
import { exp_23 } from "@thi.ng/vectors/exp_2";
import { faceForward } from "@thi.ng/vectors/face-forward";
import { floor3 } from "@thi.ng/vectors/floor";
import { fract3 } from "@thi.ng/vectors/fract";
import { gt3 } from "@thi.ng/vectors/gt";
import { gte3 } from "@thi.ng/vectors/gte";
import { invSqrt3 } from "@thi.ng/vectors/invsqrt";
import { log3 } from "@thi.ng/vectors/log";
import { log_23 } from "@thi.ng/vectors/log_2";
import { lt3 } from "@thi.ng/vectors/lt";
import { lte3 } from "@thi.ng/vectors/lte";
import { mag } from "@thi.ng/vectors/mag";
import { max3 } from "@thi.ng/vectors/max";
import { min3 } from "@thi.ng/vectors/min";
import { mix3 } from "@thi.ng/vectors/mix";
import { mixN3 } from "@thi.ng/vectors/mixn";
import { mod3 } from "@thi.ng/vectors/mod";
import { modN3 } from "@thi.ng/vectors/modn";
import { mul3 } from "@thi.ng/vectors/mul";
import { mulN3 } from "@thi.ng/vectors/muln";
import { neg } from "@thi.ng/vectors/neg";
import { neq3 } from "@thi.ng/vectors/neq";
import { normalize } from "@thi.ng/vectors/normalize";
import { pow3 } from "@thi.ng/vectors/pow";
import { radians3 } from "@thi.ng/vectors/radians";
import { reflect } from "@thi.ng/vectors/reflect";
import { refract } from "@thi.ng/vectors/refract";
import { sign3 } from "@thi.ng/vectors/sign";
import { sin3 } from "@thi.ng/vectors/sin";
import { smoothStep3 } from "@thi.ng/vectors/smoothstep";
import { sqrt3 } from "@thi.ng/vectors/sqrt";
import { step3 } from "@thi.ng/vectors/step";
import { sub3 } from "@thi.ng/vectors/sub";
import { subN3 } from "@thi.ng/vectors/subn";
import { tan3 } from "@thi.ng/vectors/tan";
import type { JSBuiltinsVec3 } from "../api";

export const VEC3: JSBuiltinsVec3 = {
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
    divnv: (a, b) => div3(null, [a, a, a], b),
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
    mod: (a, b) => mod3([], a, b),
    modn: (a, b) => modN3([], a, b),
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
    tan: (a) => tan3([], a),

    equal: (a, b) => eq3([], a, b),
    notEqual: (a, b) => neq3([], a, b),
    greaterThan: (a, b) => gt3([], a, b),
    lessThan: (a, b) => lt3([], a, b),
    greaterThanEqual: (a, b) => gte3([], a, b),
    lessThanEqual: (a, b) => lte3([], a, b),
};
