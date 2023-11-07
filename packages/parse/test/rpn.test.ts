import type { Fn2 } from "@thi.ng/api";
import { expect, test } from "bun:test";
import {
	FLOAT,
	WS0,
	alt,
	defContext,
	oneOf,
	xform,
	zeroOrMore,
} from "../src/index.js";

test("RPN calc", () => {
	const stack: number[] = [];
	const ops: Record<string, Fn2<number, number, number>> = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => a / b,
	};
	const value = xform(FLOAT, (scope) => {
		stack.push(scope!.result);
		return null;
	});
	const op = xform(oneOf(Object.keys(ops)), (scope) => {
		const b = stack.pop()!;
		const a = stack.pop()!;
		stack.push(ops[scope!.result](a, b));
		return null;
	});
	const program = zeroOrMore(alt([value, op, WS0]));
	const ctx = defContext("10 5 3 * + -2 * 10 /");
	expect(program(ctx)).toBeTrue();
	expect(ctx.done).toBeTrue();
	expect(stack).toEqual([-5]);
});
