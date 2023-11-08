import * as pf from "@thi.ng/pointfree";
import { run, runU } from "@thi.ng/pointfree-lang";
import { expect, test } from "bun:test";

test("nil", () => {
	expect(runU(`nil`)).toBeNull();
	expect(run(`nil nil`)[0]).toEqual([null, null]);
	expect(run(`'nil dup`)[0]).toEqual([[null], [null]]);
});

test("number (hex)", () => {
	expect(run(`0x1 0xa 0xff 0xdecafbad`)[0]).toEqual([1, 10, 255, 0xdecafbad]);
});

test("number (decimal)", () => {
	expect(run(`0 -1 +2`)[0]).toEqual([0, -1, 2]);
	expect(run(`-123. +12.3`)[0]).toEqual([-123, 12.3]);
	expect(run(`-123e4`)[0]).toEqual([-1230000]);
	expect(run(`+1.23e-2`)[0]).toEqual([0.0123]);
	expect(run(`+1.23e-2 0.0123 =`)[0]).toEqual([true]);
});

test("litquote", () => {
	expect(runU(`'nil`)).toEqual([null]);
	expect(runU(`'+`)).toEqual([pf.add]);
	expect(run(`1 '1`)[0]).toEqual([1, [1]]);
	expect(run(`1 2 '+`)[0]).toEqual([1, 2, [pf.add]]);
	expect(run(`1 2 '+ exec`)[0]).toEqual([3]);
});

test("var deref (quote)", () => {
	expect(runU(`[@a [@a {@a: @a} {@a: [@a]}]]`, { a: 1 })).toEqual([
		1,
		[1, { 1: 1 }, { 1: [1] }],
	]);
});

test("var deref (litquote)", () => {
	expect(runU(`'@a`, { a: 1 })).toEqual([1]);
	expect(runU(`'[@a]`, { a: 1 })).toEqual([[1]]);
	expect(runU(`''@a`, { a: 1 })).toEqual([[1]]);
});

test("var deref (word)", () => {
	expect(runU(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo`, { a: 1 })).toEqual([
		1,
		[1, { 1: 1 }, { 1: [1] }],
	]);
	expect(
		run(`: foo [@a [@a {@a: @a} {@a: [@a]}]]; foo 2 a! foo`, {
			a: 1,
		})[0]
	).toEqual([
		[1, [1, { 1: 1 }, { 1: [1] }]],
		[2, [2, { 2: 2 }, { 2: [2] }]],
	]);
});

test("line comment", () => {
	expect(runU(`// comment\n: foo // ignore me\n42 ; foo`)).toEqual(42);
});

test("word metadata", () => {
	const ctx = run(`
: foo ( a b -- x ) 42 ( a -- ) 23 +;
: bar ( -- ?) 23 ;
: baz 11 ;
foo`);
	expect(ctx[0]).toEqual([65]);
	const words = ctx[2].__words;
	expect(words.foo.__meta).toEqual({
		name: "foo",
		loc: [1, 1],
		stack: "a b -- x",
		arities: [2, 1],
	});
	expect(words.bar.__meta).toEqual({
		name: "bar",
		loc: [3, 1],
		stack: " -- ?",
		arities: [0, -1],
	});
	expect(words.baz.__meta).toEqual({
		name: "baz",
		loc: [4, 1],
	});
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
