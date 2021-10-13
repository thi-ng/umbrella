import { addI4, addNI4 } from "@thi.ng/vectors/addi";
import { bitAndI4 } from "@thi.ng/vectors/bit-and";
import { bitNotI4 } from "@thi.ng/vectors/bit-not";
import { bitOrI4 } from "@thi.ng/vectors/bit-or";
import { bitXorI4 } from "@thi.ng/vectors/bit-xor";
import { divI4, divNI4 } from "@thi.ng/vectors/divi";
import { fmod4 } from "@thi.ng/vectors/fmod";
import { fmodN4 } from "@thi.ng/vectors/fmodn";
import { lshiftI4 } from "@thi.ng/vectors/lshift";
import { mulI4, mulNI4 } from "@thi.ng/vectors/muli";
import { rshiftI4 } from "@thi.ng/vectors/rshift";
import { subI4, subNI4 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api.js";
import { VEC4 } from "./vec4.js";

export const IVEC4: JSBuiltinsIntVec = {
    ...VEC4,
    add: (a, b) => addI4([], a, b),
    addvn: (a, b) => addNI4([], a, b),
    addnv: (a, b) => addNI4([], b, a),
    div: (a, b) => divI4([], a, b),
    divvn: (a, b) => divNI4([], a, b),
    divnv: (a, b) => divI4(null, [a, a, a, a], b),
    modi: (a, b) => fmod4([], a, b),
    modivn: (a, b) => fmodN4([], a, b),
    modinv: (a, b) => fmod4(null, [a, a, a, a], b),
    mul: (a, b) => mulI4([], a, b),
    mulvn: (a, b) => mulNI4([], a, b),
    mulnv: (a, b) => mulNI4([], b, a),
    sub: (a, b) => subI4([], a, b),
    subvn: (a, b) => subNI4([], a, b),
    subnv: (a, b) => subI4(null, [a, a, a, a], b),
    bitand: (a, b) => bitAndI4([], a, b),
    lshift: (a, b) => lshiftI4([], a, b),
    bitnot1: (a) => bitNotI4([], a),
    bitor: (a, b) => bitOrI4([], a, b),
    rshift: (a, b) => rshiftI4([], a, b),
    bitxor: (a, b) => bitXorI4([], a, b),
};
