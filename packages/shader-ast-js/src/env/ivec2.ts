import {
    addI2,
    addNI2,
    bitAndI2,
    bitNotI2,
    bitOrI2,
    bitXorI2,
    divI2,
    divNI2,
    lshiftI2,
    mod2,
    modN2,
    mulI2,
    mulNI2,
    rshiftI2,
    subI2,
    subNI2
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC2 } from "./vec2";

export const IVEC2: JSBuiltinsIntVec = {
    ...VEC2,
    add: (a, b) => addI2([], a, b),
    addvn: (a, b) => addNI2([], a, b),
    addnv: (a, b) => addNI2([], b, a),
    div: (a, b) => divI2([], a, b),
    divvn: (a, b) => divNI2([], a, b),
    divnv: (a, b) => divI2(null, [a, a], b),
    modi: (a, b) => mod2([], a, b),
    modivn: (a, b) => modN2([], a, b),
    modinv: (a, b) => mod2(null, [a, a], b),
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
    bitxor: (a, b) => bitXorI2([], a, b)
};
