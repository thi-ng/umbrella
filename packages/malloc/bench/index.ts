import { suite } from "@thi.ng/bench";
import { map, range } from "@thi.ng/transducers";
import { MemPool } from "../src";

const pool = new MemPool({ buf: new ArrayBuffer(0x2000) });

const vals = [...map((i) => [...range(1 << i)], range(6))];

const malloc_f64x4 = () => {
	let a = pool.mallocAs("f64", 4)!;
	a.set(vals[2]);
	pool.freeAll();
};

const malloc6_f64 = () => {
	const a = pool.mallocAs("f64", 8)!;
	a.set(vals[3]);
	const b = pool.mallocAs("f64", 16)!;
	b.set(vals[4]);
	const c = pool.mallocAs("f64", 1)!;
	c.set(vals[0]);
	const d = pool.mallocAs("f64", 32)!;
	d.set(vals[5]);
	const e = pool.mallocAs("f64", 2)!;
	e.set(vals[1]);
	const f = pool.mallocAs("f64", 4)!;
	f.set(vals[2]);
	pool.freeAll();
};

const malloc_f32x1024 = () => {
	// @ts-ignore
	let a = pool.mallocAs("f32", 1024);
	pool.freeAll();
};

const malloc_f64x4_vanilla = () => new Float64Array(vals[2]);

const malloc6_f64_vanilla = () => {
	// @ts-ignore
	let a = new Float64Array(vals[3]);
	// @ts-ignore
	let b = new Float64Array(vals[4]);
	// @ts-ignore
	let c = new Float64Array(vals[0]);
	// @ts-ignore
	let d = new Float64Array(vals[5]);
	// @ts-ignore
	let e = new Float64Array(vals[1]);
	// @ts-ignore
	let f = new Float64Array(vals[2]);
};

const malloc_f32x1024_vanilla = () => new Float32Array(1024);

suite(
	[
		{ title: "malloc_f64x4", fn: malloc_f64x4 },
		{ title: "malloc_f64x4_vanilla", fn: malloc_f64x4_vanilla },
		{ title: "malloc6_f64", fn: malloc6_f64 },
		{ title: "malloc6_f64_vanilla", fn: malloc6_f64_vanilla },
		{ title: "malloc_f32x1024", fn: malloc_f32x1024 },
		{ title: "malloc_f32x1024_vanilla", fn: malloc_f32x1024_vanilla },
	],
	{
		iter: 1000,
		size: 1000,
		warmup: 1000,
	}
);
