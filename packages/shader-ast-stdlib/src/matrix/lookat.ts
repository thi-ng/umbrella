import type { Vec3Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { mat4, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { neg, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { cross, dot, normalize } from "@thi.ng/shader-ast/builtin/math";

/**
 * Creates a mat4 view matrix from given `eyePos`, `target` and `up`
 * vector.
 *
 * @param eye - vec3
 * @param target - vec3
 * @param up - vec3
 */
export const lookat = defn(
	"mat4",
	"lookat",
	["vec3", "vec3", "vec3"],
	(eye, target, up) => {
		let x: Vec3Sym;
		let y: Vec3Sym;
		let z: Vec3Sym;
		return [
			(z = sym(normalize(sub(eye, target)))),
			(x = sym(normalize(cross(up, z)))),
			(y = sym(normalize(cross(z, x)))),
			ret(
				mat4(
					vec4(x, neg(dot(eye, x))),
					vec4(up, neg(dot(eye, y))),
					vec4(z, neg(dot(eye, z))),
					vec4(0, 0, 0, 1)
				)
			),
		];
	}
);
