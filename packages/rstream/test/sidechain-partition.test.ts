import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { sidechainPartition, Stream, stream } from "../src/index.js";
import { assertUnsub } from "./utils.js";

let src: Stream<any>, side: Stream<any>, buf: any[];

group(
	"SidechainPartition",
	{
		"partitions (manual)": ({ done }) => {
			sidechainPartition(src, side).subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					assert.deepStrictEqual(buf, [
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
		},

		"partitions w/ predicate": ({ done }) => {
			sidechainPartition(src, side, {
				pred: (x: any) => x === 1,
			}).subscribe({
				next(x) {
					buf.push(x);
				},
				done() {
					assert.deepStrictEqual(buf, [
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
		},

		"unsubscribe chain (from child)": () => {
			const part = sidechainPartition(src, side);
			const sub = part.subscribe({});
			sub.unsubscribe();
			assertUnsub(src);
			assertUnsub(side);
			assertUnsub(part);
			assertUnsub(sub);
		},
	},
	{
		beforeEach: () => {
			src = stream();
			side = stream();
			buf = [];
		},
	}
);
