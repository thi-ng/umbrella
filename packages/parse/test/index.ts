import { Fn2 } from "@thi.ng/api";
import * as assert from "assert";
import {
    alt,
    defContext,
    DIGIT,
    FLOAT,
    INT,
    oneOf,
    oneOrMore,
    Parser,
    seq,
    WS,
    xform,
    zeroOrMore,
} from "../src";

const check = (
    parser: Parser<string>,
    src: string,
    res: boolean,
    pos: number
) => {
    const ctx = defContext(src);
    assert.equal(parser(ctx), res, `src: '${src}'`);
    assert.equal(ctx.state.p, pos, `src: '${src}' pos: ${ctx.state.p}`);
};

describe("parse", () => {
    it("initial ctx", () => {
        assert.deepEqual(defContext("").state, {
            p: 0,
            l: 1,
            c: 1,
            done: true,
        });
        assert.deepEqual(defContext(" ").state, {
            p: 0,
            l: 1,
            c: 1,
            done: false,
        });
    });

    it("zeroOrMore", () => {
        const ws = zeroOrMore(WS);
        const p1 = seq([DIGIT, ws, DIGIT]);
        const p2 = zeroOrMore(p1);

        check(ws, "", true, 0);
        check(ws, " ", true, 1);
        check(ws, "  ", true, 2);

        check(p1, "", false, 0);
        check(p1, "11", true, 2);
        check(p1, "1 1", true, 3);
        check(p1, "1 ", false, 0);
        check(p1, "1  ", false, 0);
        check(p1, "1  x", false, 0);

        check(p2, "", true, 0);
        check(p2, "11", true, 2);
        check(p2, "1 1", true, 3);
        check(p2, "1 x", true, 0);
        check(p2, "1 122", true, 5);
    });

    it("oneOrMore", () => {
        const ws = oneOrMore(WS);
        const p1 = seq([DIGIT, ws, DIGIT]);
        const p2 = oneOrMore(p1);
        const p3 = oneOrMore(seq([DIGIT, zeroOrMore(WS), DIGIT]));

        check(ws, "", false, 0);
        check(ws, " ", true, 1);
        check(ws, "  ", true, 2);

        check(p1, "", false, 0);
        check(p1, "11", false, 0);
        check(p1, "1 1", true, 3);
        check(p1, "1 ", false, 0);
        check(p1, "1  ", false, 0);
        check(p1, "1  x", false, 0);

        check(p2, "", false, 0);
        check(p2, "11", false, 0);
        check(p2, "1 1", true, 3);
        check(p2, "1 x", false, 0);
        check(p2, "1 12 2", true, 6);

        check(p3, "", false, 0);
        check(p3, "1", false, 0);
        check(p3, "1x", false, 0);
        check(p3, "1 x", false, 0);
        check(p3, "11", true, 2);
        check(p3, "1111", true, 4);
        check(p3, "111 1", true, 5);
        check(p3, "11x", true, 2);
    });

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
        const op = xform(oneOf(Object.keys(ops)), (scope) => {
            const b = stack.pop()!;
            const a = stack.pop()!;
            stack.push(ops[scope!.result](a, b));
            return null;
        });
        const program = zeroOrMore(alt([value, op, zeroOrMore(WS)]));
        program(defContext("10 5 3 * + -2 * 10 /"));
        assert.deepEqual(stack, [-5]);
    });
});
