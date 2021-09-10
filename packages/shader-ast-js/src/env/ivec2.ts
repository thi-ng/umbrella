import { addI2, addNI2 } from "@thi.ng/vectors/addi";
import { bitAndI2 } from "@thi.ng/vectors/bit-and";
import { bitNotI2 } from "@thi.ng/vectors/bit-not";
import { bitOrI2 } from "@thi.ng/vectors/bit-or";
import { bitXorI2 } from "@thi.ng/vectors/bit-xor";
import { divI2, divNI2 } from "@thi.ng/vectors/divi";
import { fmod2 } from "@thi.ng/vectors/fmod";
import { fmodN2 } from "@thi.ng/vectors/fmodn";
import { lshiftI2 } from "@thi.ng/vectors/lshift";
import { mulI2, mulNI2 } from "@thi.ng/vectors/muli";
import { rshiftI2 } from "@thi.ng/vectors/rshift";
import { subI2, subNI2 } from "@thi.ng/vectors/subi";
import type { JSBuiltinsIntVec } from "../api";
import { VEC2 } from "./vec2";

export const IVEC2: JSBuiltinsIntVec = {
    ...VEC2,
    add: (a, b) => addI2([], a, b),
    addvn: (a, b) => addNI2([], a, b),
    addnv: (a, b) => addNI2([], b, a),
    div: (a, b) => divI2([], a, b),
    divvn: (a, b) => divNI2([], a, b),
    divnv: (a, b) => divI2(null, [a, a], b),
    modi: (a, b) => fmod2([], a, b),
    modivn: (a, b) => fmodN2([], a, b),
    modinv: (a, b) => fmod2(null, [a, a], b),
    mul: (a, b) => mulI2([], a, b),
    mulvn: (a, b) => mulNI2([], a, b),
    mulnv: (a, b) => mulNI2([], b, a),
    sub: (a, b) => subI2([], a, b),
    subvn: (a, b) => subNI2([], a, b),
    subnv: (a, b) => subI2(null, [a, a], b),
    bitand: (a, b) => bitAndI2([], a, b),
    lshift: (a, b) => lshiftI2([], a, b),
    bitnot1: (a) => bitNotI2([], a),
    bitor: (a, b) => bitOrI2([], a, b),
    rshift: (a, b) => rshiftI2([], a, b),
    bitxor: (a, b) => bitXorI2([], a, b),
};
