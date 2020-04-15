import { Fn2 } from "@thi.ng/api";
import * as assert from "assert";
import {
    alt,
    defContext,
    FLOAT,
    INT,
    oneOf,
    WS,
    xform,
    zeroOrMore,
} from "../src";

describe("parse", () => {
    it("float", () => {
        [
            "1",
            "-1",
            "+1",
            "1.",
            "1.01",
            ".1",
            "-.1",
            "1.2e3",
            "-1.2e-3",
            ".1e+3",
        ].forEach((x) => {
            const ctx = defContext(x);
            assert(FLOAT(ctx), x);
            assert.equal(ctx.scope.children![0].result, parseFloat(x), x);
        });
    });

    it("RPN", () => {
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
        const op = xform(oneOf("+-*/"), (scope) => {
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(ops[scope!.result](a, b));
            return null;
        });
        const program = zeroOrMore(alt([value, op, WS]));
        program(defContext("10 5 3 * + -2 * 10 /"));
        assert.deepEqual(stack, [-5]);
    });
});
