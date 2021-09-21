import type { Prim } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, FLOAT1 } from "@thi.ng/shader-ast/ast/lit";
import { add, mul } from "@thi.ng/shader-ast/ast/ops";
import { mod } from "@thi.ng/shader-ast/builtin/math";

const __permute = <T extends Prim>(type: T, suffix = "") =>
    defn(type, `permute${suffix}`, [type], (v) => [
        ret(mod(mul(<any>v, add(mul(<any>v, float(34)), FLOAT1)), float(289))),
    ]);

export const permute = __permute("float");

export const permute2 = __permute("vec2", "2");

export const permute3 = __permute("vec3", "3");

export const permute4 = __permute("vec4", "4");
