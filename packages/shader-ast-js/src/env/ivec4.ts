import {
    addI4,
    addNI4,
    bitAndI4,
    bitNotI4,
    bitOrI4,
    bitXorI4,
    divI4,
    divNI4,
    lshiftI4,
    mod4,
    modN4,
    mulI4,
    mulNI4,
    rshiftI4,
    subI4,
    subNI4
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC4 } from "./vec4";

export const IVEC4: JSBuiltinsIntVec = {
    ...VEC4,
    add: (a, b) => addI4([], a, b),
    addvn: (a, b) => addNI4([], a, b),
    addnv: (a, b) => addNI4([], b, a),
    div: (a, b) => divI4([], a, b),
    divvn: (a, b) => divNI4([], a, b),
    divnv: (a, b) => divI4(null, [a, a, a, a], b),
    modi: (a, b) => mod4([], a, b),
    modivn: (a, b) => modN4([], a, b),
    modinv: (a, b) => mod4(null, [a, a, a, a], b),
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
    bitxor: (a, b) => bitXorI4([], a, b)
};
