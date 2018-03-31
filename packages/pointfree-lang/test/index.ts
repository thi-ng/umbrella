import * as assert from "assert";
import * as pf from "@thi.ng/pointfree";
import { run, runU } from "../src/index";

describe("pointfree-lang", () => {
    it("nil", () => {
        assert.strictEqual(runU(`nil`), null);
        assert.deepEqual(run(`nil nil`)[0], [null, null]);
        assert.deepEqual(run(`'nil dup`)[0], [[null], [null]]);
    });

    it("litquote", () => {
        assert.deepEqual(runU(`'nil`), [null]);
        assert.deepEqual(runU(`'+`), [pf.add]);
        assert.deepEqual(run(`1 '1`)[0], [1, [1]]);
        assert.deepEqual(run(`1 2 '+`)[0], [1, 2, [pf.add]]);
        assert.deepEqual(run(`1 2 '+ exec`)[0], [3]);
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
