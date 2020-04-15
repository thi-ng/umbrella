import { Fn2 } from "@thi.ng/api";
import * as assert from "assert";
import { alt, defContext, INT, oneOf, WS, xform, zeroOrMore } from "../src";

describe("parse", () => {
    it("RPN calc", () => {
        const stack: number[] = [];
        const ops: Record<string, Fn2<number, number, number>> = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
        };
        const value = xform(INT, (scope) => {
            stack.push(scope!.result);
            return null;
        });
        const op = xform(oneOf(Object.keys(ops)), (scope) => {
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(ops[scope!.result](a, b));
            return null;
        });
        const program = zeroOrMore(alt([value, op, zeroOrMore(WS)]));
        const ctx = defContext("10 5 3 * + -2 * 10 /");
        assert(program(ctx));
        assert(ctx.done);
        assert.deepEqual(stack, [-5]);
    });
});
