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

benchmark(() => run(insert), { title: "insert8", ...opts });
benchmark(() => run(insertUnsafe), { title: "insertUnsafe8", ...opts });
benchmark(() => run(insertCopyWithin), { title: "insertCopyWithin8", ...opts });

benchmark(() => run(insert, 16), { title: "insert16", ...opts });
benchmark(() => run(insertUnsafe, 16), { title: "insertUnsafe16", ...opts });
benchmark(() => run(insertCopyWithin, 16), {
    title: "insertCopyWithin16",
    ...opts,
});

benchmark(() => run(insert, 32), { title: "insert32", ...opts });
benchmark(() => run(insertUnsafe, 32), { title: "insertUnsafe32", ...opts });
benchmark(() => run(insertCopyWithin, 32), {
    title: "insertCopyWithin32",
    ...opts,
});

benchmark(() => run(insert, 64), { title: "insert64", ...opts });
benchmark(() => run(insertUnsafe, 64), { title: "insertUnsafe64", ...opts });
benchmark(() => run(insertCopyWithin, 64), {
    title: "insertCopyWithin64",
    ...opts,
});
