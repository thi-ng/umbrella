import * as assert from "assert";
import { radix } from "@thi.ng/strings";

import {
    comp,
    map,
    padLast,
    partition,
    iterator,
    range,
    run,
} from "@thi.ng/transducers";
import { bits, partitionBits } from "../src";

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
    assert.deepStrictEqual(
        [...iterator(xform(n), src)],
        [...iterator(xformB(n), src)],
        `bits=${n}`
    );

describe("partitionBits", () => {
    it("all sizes", () =>
        run(
            map((n: number) => check(n)),
            range(1, 33)
        ));
});
