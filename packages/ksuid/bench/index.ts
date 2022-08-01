import { benchmark } from "@thi.ng/bench";
import { assert } from "@thi.ng/errors";
import { defKSUID32, KSUID32 } from "../src";

const opts = { iter: 100, warmup: 10 };

const bench = (id: KSUID32, n = 10000) => {
	const acc = new Set<string>();
	for (let i = 0; i < n; i++) acc.add(id.next());
	assert(acc.size === n, `collision`);
};

// prettier-ignore
benchmark(() => bench(defKSUID32({ bytes:16 })), { title: "b62, 128bit, n=10000", ...opts });
// prettier-ignore
benchmark(() => bench(defKSUID32({ bytes: 8 })), { title: "b62, 64bit, n=10000", ...opts });
// prettier-ignore
benchmark(() => bench(defKSUID32({ bytes: 4 })), { title: "b62, 32bit, n=10000", ...opts });
