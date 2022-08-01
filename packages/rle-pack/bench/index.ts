import type { UIntArray } from "@thi.ng/api";
import { suite } from "@thi.ng/bench";
import { decode, encode } from "../src";

let pattern = [
	1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1,
	1, 1, 1, 1,
];

const initData = (len: number, pattern: number[]) => {
	let src = new Uint8Array(len * 512);
	for (let i = 1; i < len; i++) {
		src.set(pattern, i * 512);
	}
	return src;
};

const initRandom = (len: number, range: number, prob: number) => {
	let src = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		if (Math.random() < prob) {
			src[i] = (Math.random() * range) | 0;
		}
	}
	return src;
};

let src1k = initData(2, pattern);
let src4k = initData(8, pattern);
let src8k = initData(16, pattern);
let rnd8k25 = initRandom(8192, 256, 0.25);
let rnd8k50 = initRandom(8192, 256, 0.5);
let rnd8k75 = initRandom(8192, 256, 0.75);

let packed: Uint8Array;
// @ts-ignore
let dest: UIntArray;

suite(
	[
		{
			title: "encode 1k",
			fn: () => (packed = encode(src1k, src1k.length)),
		},
		{ title: "decode 1k", fn: () => (dest = decode(packed)) },
		{
			title: "encode 4k",
			fn: () => (packed = encode(src4k, src4k.length)),
		},
		{ title: "decode 4k", fn: () => (dest = decode(packed)) },
		{
			title: "encode 8k",
			fn: () => (packed = encode(src8k, src8k.length)),
		},
		{ title: "decode 8k", fn: () => (dest = decode(packed)) },
		{
			title: "encode rnd 8k 25%",
			fn: () => (packed = encode(rnd8k25, rnd8k25.length)),
		},
		{ title: "decode rnd 8k 25%", fn: () => (dest = decode(packed)) },
		{
			title: "encode rnd 8k 50%",
			fn: () => (packed = encode(rnd8k50, rnd8k50.length)),
		},
		{ title: "decode rnd 8k 50%", fn: () => (dest = decode(packed)) },
		{
			title: "encode rnd 8k 75%",
			fn: () => (packed = encode(rnd8k75, rnd8k75.length)),
		},
		{ title: "decode rnd 8k 75%", fn: () => (dest = decode(packed)) },
	],
	{
		size: 100,
	}
);
