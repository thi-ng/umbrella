import { beforeEach, expect, test } from "bun:test";
import { sidechainPartition, Stream, stream } from "../src/index.js";
import { assertUnsub } from "./utils.js";

let src: Stream<any>, side: Stream<any>, buf: any[];

beforeEach(() => {
	src = stream();
	side = stream();
	buf = [];
});

test("partitions (manual)", (done) => {
	sidechainPartition(src, side).subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual([
				[1, 2],
				[3, 4, 5],
			]);
			done();
		},
	});
	src.next(1);
	src.next(2);
	side.next(1);

	src.next(3);
	src.next(4);
	src.next(5);
	side.next(false);

	side.done();
});

test("partitions w/ predicate", (done) => {
	sidechainPartition(src, side, {
		pred: (x: any) => x === 1,
	}).subscribe({
		next(x) {
			buf.push(x);
		},
		done() {
			expect(buf).toEqual([
				[1, 2, 3],
				[4, 5],
			]);
			done();
		},
	});
	src.next(1);
	src.next(2);
	side.next(0);
	src.next(3);
	side.next(1);
	src.next(4);
	src.next(5);
	side.done();
});

test("unsubscribe chain (from child)", () => {
	const part = sidechainPartition(src, side);
	const sub = part.subscribe({});
	sub.unsubscribe();
	assertUnsub(src);
	assertUnsub(side);
	assertUnsub(part);
	assertUnsub(sub);
});
