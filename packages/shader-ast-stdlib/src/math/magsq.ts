import type { TaggedFn1 } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { dot } from "@thi.ng/shader-ast/builtin/math";

const $ = (n: 2 | 3 | 4) =>
	defn("float", `magSq${n}`, [<any>`vec${n}`], (v) => [ret(dot(v, v))]);

export const magSq2: TaggedFn1<"vec2", "float"> = $(2);
export const magSq3: TaggedFn1<"vec3", "float"> = $(3);
export const magSq4: TaggedFn1<"vec4", "float"> = $(4);
