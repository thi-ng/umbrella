import * as assert from "assert";
import { radix } from "@thi.ng/strings/radix";

import { comp } from "../src/func/comp";
import { range } from "../src/iter/range";
import { iterator } from "../src/iterator";
import { run } from "../src/run";
import { bits } from "../src/xform/bits";
import { map } from "../src/xform/map";
import { padLast } from "../src/xform/pad-last";
import { partition } from "../src/xform/partition";
import { partitionBits } from "../src/xform/partition-bits";

const src = [0xff, 0xa5, 0xfe, 0xf7];

const xform = (n: number) =>
    comp(partitionBits(n), map(radix(2, n)));

const xformB = (n: number) =>
    comp(bits(8), padLast(n, 0), partition(n, true), map((x) => x.join("")));

const check = (n: number) =>
    assert.deepEqual(
        [...iterator(xform(n), src)],
        [...iterator(xformB(n), src)],
        `bits=${n}`
    );

describe("partitionBits", () => {

    it("all sizes", () => run(map((n: number) => check(n)), range(1, 33)));

});