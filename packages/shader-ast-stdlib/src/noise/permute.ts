import type { Prim } from "@thi.ng/shader-ast";
import { F, V2, V3, V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT1, float } from "@thi.ng/shader-ast/ast/lit";
import { add, mul } from "@thi.ng/shader-ast/ast/ops";
import { mod } from "@thi.ng/shader-ast/builtin/math";

const __permute = <T extends Prim>(type: T, suffix = "") =>
	defn(type, `permute${suffix}`, [type], (v) => [
		ret(mod(mul(<any>v, add(mul(<any>v, float(34)), FLOAT1)), float(289))),
	]);

export const permute = __permute(F);

export const permute2 = __permute(V2, "2");

export const permute3 = __permute(V3, "3");

export const permute4 = __permute(V4, "4");
