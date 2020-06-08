import { defn, dot, ret } from "@thi.ng/shader-ast";

export const magSq2 = defn("float", "magSq2", ["vec2"], (v) => [
    ret(dot(v, v)),
]);

export const magSq3 = defn("float", "magSq3", ["vec3"], (v) => [
    ret(dot(v, v)),
]);

export const magSq4 = defn("float", "magSq4", ["vec4"], (v) => [
    ret(dot(v, v)),
]);
