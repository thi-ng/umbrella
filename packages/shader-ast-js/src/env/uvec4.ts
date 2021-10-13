import { addNU4, addU4 } from "@thi.ng/vectors/addi";
import { bitAndU4 } from "@thi.ng/vectors/bit-and";
import { bitNotU4 } from "@thi.ng/vectors/bit-not";
import { bitOrU4 } from "@thi.ng/vectors/bit-or";
import { bitXorU4 } from "@thi.ng/vectors/bit-xor";
import { divNU4, divU4 } from "@thi.ng/vectors/divi";
import { fmod4 } from "@thi.ng/vectors/fmod";
import { fmodN4 } from "@thi.ng/vectors/fmodn";
import { lshiftU4 } from "@thi.ng/vectors/lshift";
import { mulNU4, mulU4 } from "@thi.ng/vectors/muli";
import { rshiftU4 } from "@thi.ng/vectors/rshift";
import { subNU4, subU4 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api.js";
import { VEC4 } from "./vec4.js";

export const UVEC4: JSBuiltinsIntVec = {
    ...VEC4,
    add: (a, b) => addU4([], a, b),
    addvn: (a, b) => addNU4([], a, b),
    addnv: (a, b) => addNU4([], b, a),
    div: (a, b) => divU4([], a, b),
    divvn: (a, b) => divNU4([], a, b),
    divnv: (a, b) => divU4(null, [a, a, a, a], b),
    modi: (a, b) => fmod4([], a, b),
    modivn: (a, b) => fmodN4([], a, b),
    modinv: (a, b) => fmod4(null, [a, a, a, a], b),
    mul: (a, b) => mulU4([], a, b),
    mulvn: (a, b) => mulNU4([], a, b),
    mulnv: (a, b) => mulNU4([], b, a),
    sub: (a, b) => subU4([], a, b),
    subvn: (a, b) => subNU4([], a, b),
    subnv: (a, b) => subU4(null, [a, a, a, a], b),
    bitand: (a, b) => bitAndU4([], a, b),
    lshift: (a, b) => lshiftU4([], a, b),
    bitnot1: (a) => bitNotU4([], a),
    bitor: (a, b) => bitOrU4([], a, b),
    rshift: (a, b) => rshiftU4([], a, b),
    bitxor: (a, b) => bitXorU4([], a, b),
};
