import type { NumericArray } from "@thi.ng/api";
import { eqDelta } from "@thi.ng/math";
import * as assert from "assert";
import {
    add,
    ComplexArray,
    copyComplex,
    cos,
    fft,
    freqBin,
    ifft,
    normalizeFFT,
    osc,
    powerMeanSquared,
    powerSumSquared,
    powerTimeIntegral,
    spectrumMag,
    spectrumPhase,
    spectrumPow,
    thresholdFFT,
    window,
    windowRect,
} from "../src";

const pulse8 = [-1, -1, -1, -1, 1, 1, 1, 1];

const deltaEq = (a: NumericArray, b: NumericArray, eps = 1e-3) => {
    if (a.length != b.length) return false;
    eps **= 2;
    for (let i = a.length; --i >= 0; ) {
        const diff = (a[i] - b[i]) ** 2;
        if (diff > eps) {
            console.log("deltaEq: ", i, diff);
            return false;
        }
    }
    return true;
};

const deltaEqComplex = (a: ComplexArray, b: ComplexArray, eps?: number) =>
    deltaEq(a[0], b[0], eps) && deltaEq(a[1], b[1], eps);

describe("fft", () => {
    it("roundtrip", () => {
        const src = osc(cos, 64 / 512, 1).take(512);
        const rev = ifft(fft([...src]));
        assert(deltaEq(rev[0], src));
    });

    it("parseval", () => {
        const FC = 64;
        const FS = 512;
        const A = 0.5;
        const N = 2 * FS;
        const src = osc(cos, add(FC / FS, 1 / 12), A).take(N);
        const win = window(windowRect, N);
        const fwd = fft([...src], win);
        // parseval's theorem: sum(src[i]^2) = sum(|fft[i]|^2) / N
        const sumT = src.reduce((acc, x) => acc + x * x, 0);
        const sumF =
            (<number[]>fwd[0]).reduce(
                (acc, x, i) => acc + x ** 2 + fwd[1][i] ** 2,
                0
            ) / N;
        console.log(
            sumT,
            sumF,
            powerMeanSquared(fwd),
            powerTimeIntegral(src, FS),
            powerTimeIntegral(fwd, FS)
        );
        assert(eqDelta(powerSumSquared(src), sumT), "sumT1");
        assert(eqDelta(powerSumSquared(fwd), sumF), "sumF1");
        assert(eqDelta(powerMeanSquared(src), sumT / N), "sumT2");
        assert(eqDelta(powerMeanSquared(fwd), sumF / N), "sumF2");

        const normF = normalizeFFT(copyComplex(fwd), win);
        const sumF2 = powerSumSquared(normF);

        const thresh = thresholdFFT(copyComplex(fwd), 1 / 10000);
        const phase = spectrumPhase(thresh);

        const I = freqBin(FC, FS, N);
        console.log(
            "fwd",
            spectrumMag(fwd)[I],
            spectrumPow(fwd, false, N / 2, win)[I],
            spectrumPow(fwd, true, N / 2, win)[I],
            phase[I]
        );
        console.log(
            "norm",
            spectrumMag(normF)[I],
            spectrumPow(normF)[I],
            spectrumPow(normF, true)[I]
        );
        console.log(sumF2);
    });

    it("issue", () => {
        const FC = 64;
        const FS = 512;
        const A = 0.5;
        const N = 2 * FS;
        const I = freqBin(FC, FS, N);

        // cosine osc w/ 30 degree phase shift (= 2π/12)
        const src = osc(cos, add(FC / FS, 1 / 12), A).take(N);

        // compute window LUT
        const win = window(windowRect, N);

        const fwd = fft(src.slice(), win);

        console.log(
            "powSumSq: src =",
            powerSumSquared(src),
            "fft =",
            powerSumSquared(fwd)
        );
        console.log(
            "powMeanSq: src =",
            powerMeanSquared(src),
            "fft =",
            powerMeanSquared(fwd)
        );

        const spMag = spectrumMag(fwd);
        const spPow = spectrumPow(fwd, false, N / 2, win);
        const spDb = spectrumPow(fwd, true, N / 2, win);

        const spPhase = spectrumPhase(thresholdFFT(copyComplex(fwd)));

        console.log("mag[I] =", spMag[I]);
        console.log("pow[I] =", spPow[I]);
        console.log("dB[I] =", spDb[I]);
        console.log("phase[I] =", (spPhase[I] * 180) / Math.PI, "deg");

        const norm = normalizeFFT(copyComplex(fwd), win);
        const spMagNorm = spectrumMag(norm);
        // since `norm` already includes the window weight adjustments
        // we use a scale factor of 1.0 here
        const spPowNorm = spectrumPow(norm, false, N / 2, 1);
        console.log("norm mag[I] =", spMagNorm[I], "pow[I] =", spPowNorm[I]);
    });
});
