import * as pf from "@thi.ng/pointfree";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { run, runU } from "@thi.ng/pointfree-lang";

group("pointfree-lang", {
	nil: () => {
		assert.strictEqual(runU(`nil`), null);
		assert.deepStrictEqual(run(`nil nil`)[0], [null, null]);
		assert.deepStrictEqual(run(`'nil dup`)[0], [[null], [null]]);
	},

	"number (hex)": () => {
		assert.deepStrictEqual(
			run(`0x1 0xa 0xff 0xdecafbad`)[0],
			[1, 10, 255, 0xdecafbad]
		);
	},

	"number (decimal)": () => {
		assert.deepStrictEqual(run(`0 -1 +2`)[0], [0, -1, 2]);
		assert.deepStrictEqual(run(`-123. +12.3`)[0], [-123, 12.3]);
		assert.deepStrictEqual(run(`-123e4`)[0], [-1230000]);
		assert.deepStrictEqual(run(`+1.23e-2`)[0], [0.0123]);
		assert.deepStrictEqual(run(`+1.23e-2 0.0123 =`)[0], [true]);
	},

	litquote: () => {
		assert.deepStrictEqual(runU(`'nil`), [null]);
		assert.deepStrictEqual(runU(`'+`), [pf.add]);
		assert.deepStrictEqual(run(`1 '1`)[0], [1, [1]]);
		assert.deepStrictEqual(run(`1 2 '+`)[0], [1, 2, [pf.add]]);
		assert.deepStrictEqual(run(`1 2 '+ exec`)[0], [3]);
	},

	"var deref (quote)": () => {
		assert.deepStrictEqual(
			runU(`[@a [@a {@a: @a} {@a: [@a]}]]`, { a: 1 }),
			[1, [1, { 1: 1 }, { 1: [1] }]]
		);
	},

	"var deref (litquote)": () => {
		assert.deepStrictEqual(runU(`'@a`, { a: 1 }), [1]);
		assert.deepStrictEqual(runU(`'[@a]`, { a: 1 }), [[1]]);
		assert.deepStrictEqual(runU(`''@a`, { a: 1 }), [[1]]);
	},

	"var deref (word)": () => {
		assert.deepStrictEqual(
			runU(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo`, { a: 1 }),
			[1, [1, { 1: 1 }, { 1: [1] }]]
		);
		assert.deepStrictEqual(
			run(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo 2 a! foo`, {
				a: 1,
			})[0],
			[
				[1, [1, { 1: 1 }, { 1: [1] }]],
				[2, [2, { 2: 2 }, { 2: [2] }]],
			]
		);
	},

	"line comment": () => {
		assert.deepStrictEqual(
			runU(`// comment\n: foo // ignore me\n42 ; foo`),
			42
		);
	},

	"word metadata": () => {
		const ctx = run(`
: foo ( a b -- x ) 42 ( a -- ) 23 +;
: bar ( -- ?) 23 ;
: baz 11 ;
foo`);
		assert.deepStrictEqual(ctx[0], [65]);
		const words = ctx[2].__words;
		assert.deepStrictEqual(words.foo.__meta, {
			name: "foo",
			loc: [1, 1],
			stack: "a b -- x",
			arities: [2, 1],
		});
		assert.deepStrictEqual(words.bar.__meta, {
			name: "bar",
			loc: [3, 1],
			stack: " -- ?",
			arities: [0, -1],
		});
		assert.deepStrictEqual(words.baz.__meta, {
			name: "baz",
			loc: [4, 1],
		});
	},

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
