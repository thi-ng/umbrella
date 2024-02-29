import type { TaggedFn1 } from "@thi.ng/shader-ast";
import { F } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { dot } from "@thi.ng/shader-ast/builtin/math";

const $ = <N extends 2 | 3 | 4>(n: N) =>
	defn(F, `magSq${n}`, [`vec${n}`], (v) => [ret(dot(v, v))]);

export const magSq2: TaggedFn1<"vec2", "float"> = $(2);
export const magSq3: TaggedFn1<"vec3", "float"> = $(3);
export const magSq4: TaggedFn1<"vec4", "float"> = $(4);
