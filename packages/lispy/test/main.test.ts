import { expect, test } from "bun:test";
import { ENV, evalSource } from "../src/index.js";

test("list", () => {
	expect(evalSource(`(list 1 (+ 1 1) "a" (list 10 20))`)).toEqual([
		1,
		2,
		"a",
		[10, 20],
	]);
});

test("obj", () => {
	const $env = { ...ENV };
	expect(
		evalSource(`(def x (obj a 1 (str "b" 2) 2 c (obj d 3)))`, $env)
	).toEqual({
		a: 1,
		b2: 2,
		c: { d: 3 },
	});
	expect(evalSource(`(keys x)`, $env)).toEqual(["a", "b2", "c"]);
	expect(evalSource(`(vals x)`, $env)).toEqual([1, 2, { d: 3 }]);
	expect(evalSource(`(pairs x)`, $env)).toEqual([
		["a", 1],
		["b2", 2],
		["c", { d: 3 }],
	]);
});

test("let", () => {
	expect(evalSource(`(let (a 1 b (+ a 1)) (+ a b))`)).toBe(3);
	expect(() => evalSource(`(let (a 1 b) (+ a b))`)).toThrow();
});

test("if", () => {
	expect(evalSource(`(if (< 1 2) "a" "b")`)).toBe("a");
	expect(evalSource(`(if (> 1 2) "a" "b")`)).toBe("b");
	expect(evalSource(`(if (> 1 2) "a")`)).toBe(undefined);
});

test("def", () => {
	expect(evalSource(`(def a 1) a`)).toBe(1);
	expect(evalSource(`(def a (+ 1 2)) a`)).toBe(3);
	// since we were modifying root env, `a` is persistent
	expect(evalSource(`(def a (inc a)) a`)).toBe(4);
});

test("defn", () => {
	expect(evalSource(`(defn a (x) (+ x 2)) (a 1)`)).toBe(3);
	expect(evalSource(`(defn a (x y) (+ x y)) (a 1 2)`)).toBe(3);
	expect(() => evalSource(`(defn a (x y) (+ x y)) (a 1 2 3)`)).toThrow();
});

test("while", () => {
	expect(evalSource(`(let (a 1) (while (< a 5) (env! (a (inc a)))) a)`)).toBe(
		5
	);
});

test("->", () => {
	expect(evalSource(`(->)`)).toBe(undefined);
	expect(evalSource(`(-> 1)`)).toBe(1);
	expect(evalSource(`(-> 1 (- 2) (* 3))`)).toBe(-3);
	expect(() => evalSource(`(-> 1 print)`)).toThrow();
});

test("->>", () => {
	expect(evalSource(`(->>)`)).toBe(undefined);
	expect(evalSource(`(->> 1)`)).toBe(1);
	expect(evalSource(`(->> 1 (- 2) (* 3))`)).toBe(3);
	expect(() => evalSource(`(->> 1 print)`)).toThrow();
});

test("comp", () => {
	expect(
		evalSource(`(let (f (comp (fn (x) (+ 5 x)) (fn (x) (* 3 x)))) (f 2))`)
	).toBe(11);
});

test("partial", () => {
	expect(evalSource(`(let (f (partial (fn (x y) (+ x y)) 10)) (f 1))`)).toBe(
		11
	);
});

test("fnull?", () => {
	expect(evalSource(`(fnull? NULL random)`)).toBeDefined();
});

test("map", () => {
	expect(evalSource(`(map inc (list 1 2 3))`)).toEqual([2, 3, 4]);
});

test("reduce", () => {
	expect(evalSource(`(reduce + 0 (list 1 2 3))`)).toEqual(6);
});

test("filter", () => {
	expect(evalSource(`(filter zero? (list 1 0 2 0 3))`)).toEqual([0, 0]);
	expect(evalSource(`(filter (complement zero?) (list 1 0 2 0 3))`)).toEqual([
		1, 2, 3,
	]);
});

test("get", () => {
	expect(evalSource(`(get (list 10 20) 0)`)).toEqual(10);
	expect(evalSource(`(get (list 10 20) 1)`)).toEqual(20);
	expect(evalSource(`(get (list 10 20) 2)`)).toEqual(undefined);
	expect(evalSource(`(get (obj a 10) "a")`)).toEqual(10);
});

test("set!", () => {
	expect(evalSource(`(set! (list 10 20) 0 100)`)).toEqual([100, 20]);
	expect(evalSource(`(set! (list 10 20) 1 200)`)).toEqual([10, 200]);
	expect(evalSource(`(set! (list 10 20) 2 300)`)).toEqual([10, 20, 300]);
	expect(evalSource(`(set! (obj a 10) "b" 20)`)).toEqual({ a: 10, b: 20 });
});
