import type { Predicate } from "@thi.ng/api";
import { beforeEach, expect, test } from "bun:test";
import { sidechainToggle, Stream, stream } from "../src/index.js";
import { assertUnsub } from "./utils.js";

let src: Stream<any>, side: Stream<any>, buf: any[];

const check = (
	initial: any,
	pred: Predicate<any> | undefined,
	_expected: any,
	done: Function
) => {
	sidechainToggle(src, side, { initial, pred }).subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual(_expected);
			done();
		},
	});
	src.next(1);
	src.next(2);
	side.next(0);
	src.next(3);
	src.next(4);
	side.next(1);
	src.next(5);
	src.done();
};

beforeEach(() => {
	src = stream();
	side = stream();
	buf = [];
});

test("toggles (initially on)", (done) => {
	check(true, undefined, [1, 2, 5], done);
});

test("toggles (initially off)", (done) => {
	check(false, undefined, [3, 4], done);
});

test("toggles w/ predicate", (done) => {
	check(true, (x) => x === 0, [1, 2], done);
});

test("unsubscribe chain (from child)", () => {
	const part = sidechainToggle(src, side);
	const sub = part.subscribe({});
	sub.unsubscribe();
	assertUnsub(src);
	assertUnsub(side);
	assertUnsub(part);
	assertUnsub(sub);
});
