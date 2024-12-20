import type { Fn, Fn0, NumericArray } from "@thi.ng/api";
import { fft, spectrumPow } from "@thi.ng/dsp";
import { barChartVStr } from "@thi.ng/text-canvas";
import { map, range, reducer, take, transduce } from "@thi.ng/transducers";
import { add, divN, zeroes, type Vec } from "@thi.ng/vectors";
import {
	blue,
	green,
	pink,
	red,
	violet,
	type ColoredNoiseOpts,
} from "../src/index.js";

const computeSpectrum = (src: Fn0<Iterable<number>>, size = 128, num = 1000) =>
	divN(
		null,
		transduce(
			map(() => spectrumPow(fft([...take(size, src())]), true)),
			reducer<NumericArray, Vec>(
				() => zeroes(size / 2),
				(acc, x) => add(null, acc, x)
			),
			range(num)
		),
		num
	);

const spectrumString = (spec: Vec) => barChartVStr(12, spec, -72, -24);

const printSpectrum = (id: string, fn: Fn0<Iterable<number>>) => {
	console.log(id);
	console.log(spectrumString(computeSpectrum(fn)));
};

const printBatch = (
	id: string,
	fn: Fn<Partial<ColoredNoiseOpts>, Iterable<number>>,
	bins = [2, 4, 8, 16, 32]
) => {
	for (let n of bins) {
		printSpectrum(`${id}${n}`, () => fn({ bins: n }));
	}
};

printBatch("blue", blue);
printBatch("green", green);
printBatch("pink", pink);
printBatch("red", red);
printBatch("violet", violet);

// printSpectrum("white", () => white());
