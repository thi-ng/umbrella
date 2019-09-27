import {
    addI3,
    addNI3,
    bitAndI3,
    bitNotI3,
    bitOrI3,
    bitXorI3,
    divI3,
    divNI3,
    lshiftI3,
    mod3,
    modN3,
    mulI3,
    mulNI3,
    rshiftI3,
    subI3,
    subNI3
} from "@thi.ng/vectors";
import { JSBuiltinsIntVec } from "../api";
import { VEC3 } from "./vec3";

export const IVEC3: JSBuiltinsIntVec = {
    ...VEC3,
    add: (a, b) => addI3([], a, b),
    addvn: (a, b) => addNI3([], a, b),
    addnv: (a, b) => addNI3([], b, a),
    div: (a, b) => divI3([], a, b),
    divvn: (a, b) => divNI3([], a, b),
    divnv: (a, b) => divI3(null, [a, a, a], b),
    modi: (a, b) => mod3([], a, b),
    modivn: (a, b) => modN3([], a, b),
    modinv: (a, b) => mod3(null, [a, a, a], b),
    mul: (a, b) => mulI3([], a, b),
    mulvn: (a, b) => mulNI3([], a, b),
    mulnv: (a, b) => mulNI3([], b, a),
    sub: (a, b) => subI3([], a, b),
    subvn: (a, b) => subNI3([], a, b),
    subnv: (a, b) => subI3(null, [a, a, a], b),
    bitand: (a, b) => bitAndI3([], a, b),
    lshift: (a, b) => lshiftI3([], a, b),
    bitnot1: (a) => bitNotI3([], a),
    bitor: (a, b) => bitOrI3([], a, b),
    rshift: (a, b) => rshiftI3([], a, b),
    bitxor: (a, b) => bitXorI3([], a, b)
};
