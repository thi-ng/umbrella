import type { Fn2 } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	alt,
	defContext,
	FLOAT,
	oneOf,
	WS0,
	xform,
	zeroOrMore,
} from "../src/index.js";

group("parse", {
	"RPN calc": () => {
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
		assert.ok(program(ctx));
		assert.ok(ctx.done);
		assert.deepStrictEqual(stack, [-5]);
	},
});
