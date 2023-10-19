import { FORMAT_MD, suite } from "@thi.ng/bench";
import { KSUID32, defKSUID32 } from "@thi.ng/ksuid";

const bench = (id: KSUID32, n = 10000) => {
	let res = new Array(n);
	return () => {
		for (let i = 0; i < n; i++) res[i] = id.next();
		return res;
	};
};

// console.profile();

suite(
	[
		{
			title: "b62, 128bit, n=10000",
			fn: bench(defKSUID32({ bytes: 16 })),
		},
		{
			title: "b62, 64bit, n=10000",
			fn: bench(defKSUID32({ bytes: 8 })),
		},
	],
	{ iter: 100, warmup: 100, size: 1, format: FORMAT_MD }
);

// console.profileEnd();
// console.log("done");
