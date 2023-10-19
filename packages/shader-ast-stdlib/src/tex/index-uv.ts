import { I, V2 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, int, vec2 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, modi, mul } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";

/**
 * Converts linearized 2D index `i` into a vec2 UV coord, based on given
 * texture `size` (in pixels).
 *
 * @param i -
 * @param size -
 */
export const indexToUV = defn(
	V2,
	"indexToUV",
	[[I, "i", { prec: "highp" }], ["ivec2"]],
	(i, size) => [
		ret(
			vec2(
				div(float(modi(i, $x(size))), float($x(size))),
				div(float(div(i, $x(size))), float($y(size)))
			)
		),
	]
);

/**
 * Inverse operation of {@link indexToUV}. Converts vec2 UV coord into
 * linearized 2D index, based on given texture `width` (in pixels).
 *
 * @param i -
 * @param width -
 */
export const uvToIndex = defn(
	I,
	"uvToIndex",
	[V2, [I, "width", { prec: "highp" }]],
	(uv, width) => [
		ret(
			add(
				int(mul($x(uv), float(width))),
				int(mul($y(uv), float(mul(width, width))))
			)
		),
	]
);
