import * as assert from "assert";
import * as pf from "@thi.ng/pointfree";
import { run, runU } from "../src/index";

describe("pointfree-lang", () => {
    it("nil", () => {
        assert.strictEqual(runU(`nil`), null);
        assert.deepEqual(run(`nil nil`)[0], [null, null]);
        assert.deepEqual(run(`'nil dup`)[0], [[null], [null]]);
    });

    it("number (hex)", () => {
        assert.deepEqual(run(`0x1 0xa 0xff 0xdecafbad`)[0], [1, 10, 255, 0xdecafbad]);
    });

    it("number (decimal)", () => {
        assert.deepEqual(run(`0 -1 +2`)[0], [0, -1, 2]);
        assert.deepEqual(run(`-123. +12.3`)[0], [-123, 12.3]);
        assert.deepEqual(run(`-123e4`)[0], [-1230000]);
        assert.deepEqual(run(`+1.23e-2`)[0], [0.0123]);
        assert.deepEqual(run(`+1.23e-2 0.0123 =`)[0], [true]);
    });

    it("litquote", () => {
        assert.deepEqual(runU(`'nil`), [null]);
        assert.deepEqual(runU(`'+`), [pf.add]);
        assert.deepEqual(run(`1 '1`)[0], [1, [1]]);
        assert.deepEqual(run(`1 2 '+`)[0], [1, 2, [pf.add]]);
        assert.deepEqual(run(`1 2 '+ exec`)[0], [3]);
    });

    it("var deref (quote)", () => {
        assert.deepEqual(runU(`[@a [@a {@a: @a} {@a: [@a]}]]`, { a: 1 }), [1, [1, { 1: 1 }, { 1: [1] }]]);
    });

    it("var deref (litquote)", () => {
        assert.deepEqual(runU(`'@a`, { a: 1 }), [1]);
        assert.deepEqual(runU(`'[@a]`, { a: 1 }), [[1]]);
        assert.deepEqual(runU(`''@a`, { a: 1 }), [[1]]);
    });

    it("var deref (word)", () => {
        assert.deepEqual(runU(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo`, { a: 1 }), [1, [1, { 1: 1 }, { 1: [1] }]]);
        assert.deepEqual(
            run(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo 2 a! foo`, { a: 1 })[0],
            [[1, [1, { 1: 1 }, { 1: [1] }]], [2, [2, { 2: 2 }, { 2: [2] }]]]);
    });

    // setDebug(true);

    // console.log(run(`"result: " 1 2 + + .`));
    // console.log(run(`[[1 2] [10 20] v*] exec`));
    // console.log(run(`10 20 'inc bia`));
    // console.log(run(`10 a! 2 @a +`));
    // console.log(run(`: madd -rot * + ; 3 5 10 madd .`));
    // console.log(run(`: madd 100 a! @a -rot * + ; 3 5 10 a! madd .`));
    // console.log(run(`3 ["i=" swap + . ] dotimes`));
    // console.log(run(`: sq dup mul; [1 2 3 4] 'sq mapll '+ 0 foldl`));
    // console.log(run(`'[10 [1 2 3 4] v+]`)[0]);

    // const res = runU(`[{@a: {"b": @b cc: [{@a: @a}]}}] "bb" "b" store exec`, { a: "aa" });
    // const res = runU(`[{@a: {"b": @b cc: [{@a: @a}]}}] "bb" "b" store exec @a at "cc" at exec`, { a: "aa" });
    // console.log("res", res);
    // console.log(pf.runU([res.aa.cc, pf.exec], [[], [], { a: "aa" }]));
});
