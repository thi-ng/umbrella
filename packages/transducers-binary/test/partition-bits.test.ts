import { radix } from "@thi.ng/strings";
import {
	comp,
	iterator,
	map,
	padLast,
	partition,
	range,
	run,
} from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import { bits, partitionBits } from "../src/index.js";

const src = [0xff, 0xa5, 0xfe, 0xf7];

const xform = (n: number) => comp(partitionBits(n), map(radix(2, n)));

const xformB = (n: number) =>
	comp(
		bits(8),
		padLast(n, 0),
		partition(n, true),
		map((x) => x.join(""))
	);

const check = (n: number) =>
	expect([...iterator(xform(n), src)]).toEqual([...iterator(xformB(n), src)]);

test("all sizes", () =>
	run(
		map((n: number) => check(n)),
		range(1, 33)
	));
