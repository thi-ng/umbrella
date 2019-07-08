import {
    add,
    defn,
    float,
    FLOAT1,
    mod,
    mul,
    ret
} from "@thi.ng/shader-ast";

export const permute = defn("float", "permute", ["float"], (v) => [
    ret(mod(mul(v, add(mul(v, float(34)), FLOAT1)), float(289)))
]);

export const permute2 = defn("vec2", "permute2", ["vec2"], (v) => [
    ret(mod(mul(v, add(mul(v, float(34)), FLOAT1)), float(289)))
]);

export const permute3 = defn("vec3", "permute3", ["vec3"], (v) => [
    ret(mod(mul(v, add(mul(v, float(34)), FLOAT1)), float(289)))
]);

export const permute4 = defn("vec4", "permute4", ["vec4"], (v) => [
    ret(mod(mul(v, add(mul(v, float(34)), FLOAT1)), float(289)))
]);
