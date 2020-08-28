import { Fn, Fn0, NumericArray } from "@thi.ng/api";
import { fft, spectrumPow } from "@thi.ng/dsp";
import { barChartHStr } from "@thi.ng/text-canvas";
import { map, range, reducer, take, transduce } from "@thi.ng/transducers";
import { add, divN, Vec, zeroes } from "@thi.ng/vectors";
import { blue, green, pink, red, violet } from "../src";

const computeSpectrum = (src: Fn0<Iterable<number>>, size = 128, num = 1000) =>
    divN(
        null,
        transduce(
            map(() => spectrumPow(fft([...take(size, src())]), true)),
            reducer<Vec, NumericArray>(
                () => zeroes(size / 2),
                (acc, x) => add(null, acc, x)
            ),
            range(num)
        ),
        num
    );

const spectrumString = (spec: Vec) => barChartHStr(12, spec, -72, -24);

const printSpectrum = (id: string, fn: Fn0<Iterable<number>>) => {
    console.log(id);
    console.log(spectrumString(computeSpectrum(fn)));
};

const printBatch = (
    id: string,
    fn: Fn<number, Iterable<number>>,
    steps = [2, 4, 8, 16, 32]
) => {
    for (let n of steps) {
        printSpectrum(`${id}${n}`, () => fn(n));
    }
};

printBatch("blue", blue);
printBatch("green", green);
printBatch("pink", pink);
printBatch("red", red);
printBatch("violet", violet);

// printSpectrum("white", () => white());
