import type { FnBody1 } from "@thi.ng/shader-ast";
import { F } from "@thi.ng/shader-ast/api/types";
import { ifThen, ternary } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import {
	FLOAT0,
	FLOAT05,
	FLOAT1,
	FLOAT2,
	HALF_PI,
	PI,
	TAU,
	float,
} from "@thi.ng/shader-ast/ast/lit";
import {
	add,
	div,
	eq,
	gte,
	lt,
	lte,
	madd,
	mul,
	neg,
	reciprocal,
	sub,
} from "@thi.ng/shader-ast/ast/ops";
import { cos, exp2, pow, sin, sqrt } from "@thi.ng/shader-ast/builtin/math";

/**
 * Higher order helper function to wrap a given easing function body as proper
 * shader-ast function.
 *
 * @param body
 */
export const defEasing = (body: FnBody1<"float">) => defn(F, null, [F], body);

export const easeInSine = defEasing((x) => [
	ret(sub(FLOAT1, cos(mul(x, HALF_PI)))),
]);

export const easeOutSine = defEasing((x) => [ret(sin(mul(x, HALF_PI)))]);

export const easeInOutSine = defEasing((x) => [
	ret(div(neg(sub(cos(mul(PI, x)), FLOAT1)), FLOAT2)),
]);

export const easeInQuad = defEasing((x) => [ret(pow(x, FLOAT2))]);

export const easeOutQuad = defEasing((x) => [
	ret(sub(FLOAT1, pow(sub(FLOAT1, x), FLOAT2))),
]);

export const easeInOutQuad = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			mul(FLOAT2, pow(x, FLOAT2)),
			sub(FLOAT1, div(pow(madd(neg(FLOAT2), x, FLOAT2), FLOAT2), FLOAT2))
		)
	),
]);

export const easeInCubic = defEasing((x) => [ret(pow(x, float(3)))]);

export const easeOutCubic = defEasing((x) => [
	ret(sub(FLOAT1, pow(sub(FLOAT1, x), float(3)))),
]);

export const easeInOutCubic = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			mul(float(4), pow(x, float(3))),
			sub(
				FLOAT1,
				div(pow(madd(neg(FLOAT2), x, FLOAT2), float(3)), FLOAT2)
			)
		)
	),
]);

export const easeInQuart = defEasing((x) => [ret(pow(x, float(4)))]);

export const easeOutQuart = defEasing((x) => [
	ret(sub(FLOAT1, pow(sub(FLOAT1, x), float(4)))),
]);

export const easeInOutQuart = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			mul(float(8), pow(x, float(4))),
			sub(
				FLOAT1,
				div(pow(madd(neg(FLOAT2), x, FLOAT2), float(4)), FLOAT2)
			)
		)
	),
]);

export const easeInQuint = defEasing((x) => [ret(pow(x, float(5)))]);

export const easeOutQuint = defEasing((x) => [
	ret(sub(FLOAT1, pow(sub(FLOAT1, x), float(5)))),
]);

export const easeInOutQuint = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			mul(float(16), pow(x, float(5))),
			sub(
				FLOAT1,
				div(pow(madd(neg(FLOAT2), x, FLOAT2), float(5)), FLOAT2)
			)
		)
	),
]);

export const easeInExpo = defEasing((x) => [
	ret(
		ternary(eq(x, FLOAT0), FLOAT0, exp2(sub(mul(float(10), x), float(10))))
	),
]);

export const easeOutExpo = defEasing((x) => [
	ret(
		ternary(
			eq(x, FLOAT1),
			FLOAT1,
			sub(FLOAT1, exp2(mul(neg(float(10)), x)))
		)
	),
]);

export const easeInOutExpo = defEasing((x) => [
	ret(
		ternary(
			eq(x, FLOAT0),
			FLOAT0,
			ternary(
				eq(x, FLOAT1),
				FLOAT1,
				ternary(
					lt(x, FLOAT05),
					div(exp2(sub(mul(float(20), x), float(10))), FLOAT2),
					div(
						sub(FLOAT2, exp2(madd(neg(float(20)), x, float(10)))),
						FLOAT2
					)
				)
			)
		)
	),
]);

export const easeInCirc = defEasing((x) => [
	ret(sub(FLOAT1, sqrt(sub(FLOAT1, pow(x, FLOAT2))))),
]);

export const easeOutCirc = defEasing((x) => [
	ret(sqrt(sub(FLOAT1, pow(sub(x, FLOAT1), FLOAT2)))),
]);

export const easeInOutCirc = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			div(
				sub(FLOAT1, sqrt(sub(FLOAT1, pow(mul(FLOAT2, x), FLOAT2)))),
				FLOAT2
			),
			div(
				add(
					sqrt(
						sub(FLOAT1, pow(madd(neg(FLOAT2), x, FLOAT2), FLOAT2))
					),
					FLOAT1
				),
				FLOAT2
			)
		)
	),
]);

export const easeInBack = defEasing((x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;

	return [ret(sub(mul(c3, pow(x, float(3))), mul(c1, pow(x, FLOAT2))))];
});

export const easeOutBack = defEasing((x) => {
	const c1 = 1.70158;
	const c3 = c1 + 1;

	return [
		ret(
			add(
				madd(float(c3), pow(sub(x, FLOAT1), float(3)), FLOAT1),
				mul(c1, pow(sub(x, FLOAT1), FLOAT2))
			)
		),
	];
});

export const easeInOutBack = defEasing((x) => {
	const c1 = 1.70158;
	const c2 = c1 * 1.525;

	return [
		ret(
			ternary(
				lt(x, FLOAT05),
				div(
					mul(
						pow(mul(FLOAT2, x), FLOAT2),
						sub(mul(mul(add(c2, FLOAT1), FLOAT2), x), c2)
					),
					FLOAT2
				),
				div(
					add(
						mul(
							pow(sub(mul(FLOAT2, x), FLOAT2), FLOAT2),
							add(
								mul(
									add(c2, FLOAT1),
									sub(mul(x, FLOAT2), FLOAT2)
								),
								c2
							)
						),
						FLOAT2
					),
					FLOAT2
				)
			)
		),
	];
});

export const easeInElastic = defEasing((x) => [
	ret(
		ternary(
			eq(x, FLOAT0),
			FLOAT0,
			ternary(
				eq(x, FLOAT1),
				FLOAT1,
				mul(
					neg(exp2(sub(mul(10, x), 10))),
					sin(mul(sub(mul(x, 10), 10.75), div(TAU, 3)))
				)
			)
		)
	),
]);

export const easeOutElastic = defEasing((x) => [
	ret(
		ternary(
			lte(x, FLOAT0),
			FLOAT0,
			ternary(
				gte(x, FLOAT1),
				FLOAT1,
				madd(
					exp2(mul(-10, x)),
					sin(mul(sub(mul(x, 10), 0.75), div(TAU, 3))),
					FLOAT1
				)
			)
		)
	),
]);

export const easeInOutElastic = defEasing((x) => {
	const c5 = div(TAU, 4.5);

	return [
		ret(
			ternary(
				eq(x, FLOAT0),
				FLOAT0,
				ternary(
					eq(x, FLOAT1),
					FLOAT1,
					ternary(
						lt(x, FLOAT05),
						div(
							neg(
								mul(
									exp2(sub(mul(20, x), 10)),
									sin(mul(sub(mul(20, x), 11.125), c5))
								)
							),
							FLOAT2
						),
						add(
							div(
								mul(
									exp2(madd(neg(float(20)), x, float(10))),
									sin(mul(sub(mul(20, x), 11.125), c5))
								),
								FLOAT2
							),
							FLOAT1
						)
					)
				)
			)
		),
	];
});

export const easeOutBounce = defEasing((x) => {
	const n1 = 7.5625;
	const d1 = float(2.75);

	return [
		ifThen(lt(x, reciprocal(d1)), [ret(mul(n1, pow(x, FLOAT2)))]),
		ifThen(lt(x, div(FLOAT2, d1)), [
			ret(
				add(
					mul(mul(n1, sub(x, div(1.5, d1))), sub(x, div(1.5, d1))),
					0.75
				)
			),
		]),
		ifThen(lt(x, div(2.5, d1)), [
			ret(
				add(
					mul(mul(n1, sub(x, div(2.25, d1))), sub(x, div(2.25, d1))),
					0.9375
				)
			),
		]),
		ret(
			add(
				mul(mul(n1, sub(x, div(2.625, d1))), sub(x, div(2.625, d1))),
				0.984375
			)
		),
	];
});

export const easeInBounce = defEasing((x) => [
	ret(sub(FLOAT1, easeOutBounce(sub(FLOAT1, x)))),
]);

export const easeInOutBounce = defEasing((x) => [
	ret(
		ternary(
			lt(x, FLOAT05),
			div(
				sub(FLOAT1, easeOutBounce(sub(FLOAT1, mul(FLOAT2, x)))),
				FLOAT2
			),
			div(add(FLOAT1, easeOutBounce(sub(mul(FLOAT2, x), FLOAT1))), FLOAT2)
		)
	),
]);
