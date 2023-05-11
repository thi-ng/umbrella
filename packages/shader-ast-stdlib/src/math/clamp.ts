import type {
	FloatTerm,
	PrimTerm,
	Term,
	TermType,
	Vec2Term,
	Vec3Term,
	Vec4Term,
} from "@thi.ng/shader-ast";
import { F, V2, V3 } from "@thi.ng/shader-ast/api/types";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { clamp } from "@thi.ng/shader-ast/builtin/math";

const __clamp =
	(min: number, max: number) =>
	<T extends PrimTerm>(x: T): Term<TermType<T>> =>
		x.type === F
			? clamp(<FloatTerm>x, float(min), float(max))
			: x.type === V2
			? clamp(<Vec2Term>x, vec2(min), vec2(max))
			: x.type === V3
			? clamp(<Vec3Term>x, vec3(min), vec3(max))
			: clamp(<Vec4Term>x, vec4(min), vec4(max));
/**
 * Inline function, expands to equivalent of `clamp(x, 0, 1)`.
 *
 * @param x -
 */
export const clamp01 = __clamp(0, 1);

/**
 * Inline function, expands to equivalent of `clamp(x, -1, 1)`.
 *
 * @param x -
 */
export const clamp11 = __clamp(-1, 1);
