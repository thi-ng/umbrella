import { assert } from "@thi.ng/api";
import { benchmark } from "@thi.ng/bench";
import { SYSTEM } from "@thi.ng/random";
import { insert, insertUnsafe } from "../src";

const opts = { iter: 1000, warmup: 100 };

const insertCopyWithin = (buf: any[], x: any, i: number, k = Infinity) => {
    buf.length < k && buf.length++;
    buf.copyWithin(i + 1, i);
    buf[i] = x;
    return buf;
};

const splice = (buf: any[], x: any, i: number, k = Infinity) => {
    buf.splice(i, 0, x);
    buf.length > k && buf.pop();
    return buf;
};

const run = (
    fn: typeof insert,
    k: 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 = 8,
    n = 1e4
) => {
    const buf: any[] = [];
    const m = k - 1;
    for (; --n >= 0; ) fn(buf, 1, SYSTEM.int() & m, k);
    assert(buf.length === k, `len=${buf.length}`);
};

// prettier-ignore
for (let k of <const>[4, 8, 16, 32, 64]) {
    benchmark(() => run(splice, k), { title: `splice${k}`, ...opts });
    benchmark(() => run(insert, k), { title: `insert${k}`, ...opts });
    benchmark(() => run(insertUnsafe, k), { title: `insertUnsafe${k}`, ...opts });
    benchmark(() => run(insertCopyWithin, k), { title: `insertCopyWithin${k}`, ...opts });
}
