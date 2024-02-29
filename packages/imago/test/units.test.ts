import { expect, test } from "bun:test";
import {
	computeMargins,
	computeSize,
	positionOrGravity,
	type Dim,
	type Position,
	type Sides,
	type Size,
	type SizeRef,
} from "../src/index.js";

const W = 1000;
const H = 2000;
const A = W / H;
const W2 = W / 2;
const H2 = H / 2;
const SIZE: Dim = [W, H];

test("computeSize (%)", () => {
	for (let [size, ref, result] of <[Size, SizeRef, Dim][]>[
		[5, "min", [50, 50]],
		[5, "max", [100, 100]],
		[5, "both", [50, 100]],
		[[5, -1], "min", [50, 100]],
		[[-1, 5], "min", [25, 50]],
		[[5, 5], "min", [50, 50]],
		[[5, -1], "max", [100, 200]],
		[[-1, 5], "max", [50, 100]],
		[[5, 5], "max", [100, 100]],
		[[5, -1], "both", [50, 100]],
		[[-1, 10], "both", [100, 200]],
		[[10, 20], "both", [100, 400]],
	]) {
		expect(computeSize(size, SIZE, ref, "%")).toEqual(result);
	}
});

test("computeMargins (%)", () => {
	for (let [size, ref, result] of <[Size | Sides, SizeRef, Sides][]>[
		[5, "min", [50, 50, 50, 50]],
		[5, "w", [50, 50, 50, 50]],
		[5, "max", [100, 100, 100, 100]],
		[5, "h", [100, 100, 100, 100]],
		[5, "both", [50, 50, 100, 100]],
		//
		[[5, 10], "min", [50, 50, 100, 100]],
		[[5, 10], "w", [50, 50, 100, 100]],
		[[5, 10], "max", [100, 100, 200, 200]],
		[[5, 10], "h", [100, 100, 200, 200]],
		[[5, 10], "both", [50, 50, 200, 200]],
		//
		[[5, 10, 20, 50], "min", [50, 100, 200, 500]],
		[[5, 10, 20, 50], "w", [50, 100, 200, 500]],
		[[5, 10, 20, 50], "max", [100, 200, 400, 1000]],
		[[5, 10, 20, 50], "h", [100, 200, 400, 1000]],
		[[5, 10, 20, 50], "both", [50, 100, 400, 1000]],
	]) {
		expect(computeMargins(size, SIZE, ref, "%")).toEqual(result);
	}
});

test("positionOrGravity (%)", () => {
	for (let [pos, size, ref, result] of <
		[Position, Dim, SizeRef, ReturnType<typeof positionOrGravity>][]
	>[
		[{}, [50, 50], "min", {}],
		[
			{ r: 5, b: 5 },
			[50, -1],
			"min",
			{ left: W - 500 - 50, top: H - 500 / A - 50 },
		],
		[
			{ r: 5, b: 5 },
			[50, -1],
			"both",
			{ left: W - W2 - 50, top: H - H2 - 100 },
		],
		[
			{ r: 5, b: 5 },
			[-1, 50],
			"both",
			{ left: W - W2 - 50, top: H - H2 - 100 },
		],
		[{ l: 5, t: 10 }, [50, 50], "min", { left: 50, top: 100 }],
		[{ l: 5, t: 10 }, [50, 50], "max", { left: 100, top: 200 }],
		[
			{ r: 5, b: 10 },
			[50, 50],
			"min",
			{ left: W - W2 - 50, top: H - W2 - 100 },
		],
		[
			{ r: 5, b: 10 },
			[50, 50],
			"max",
			{ left: W - H2 - 100, top: H - H2 - 200 },
		],
		[{ l: 5, t: 10 }, [50, 50], "both", { left: 50, top: 200 }],
		[
			{ r: 5, b: 10 },
			[50, 50],
			"both",
			{ left: W - W2 - 50, top: H - H2 - 200 },
		],
	]) {
		expect(
			positionOrGravity(computeSize(size, SIZE, ref, "%"), SIZE, {
				pos,
				ref,
				unit: "%",
			})
		).toEqual(result!);
	}
});
