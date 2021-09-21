import type { NumericArray } from "@thi.ng/api";
import { eqDelta, TAU } from "@thi.ng/math";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    add,
    copyComplex,
    cos,
    fft,
    freqBin,
    ifft,
    magDb,
    normalizeFFT,
    osc,
    powerMeanSquared,
    powerSumSquared,
    spectrumMag,
    spectrumPhase,
    spectrumPow,
    window,
    windowRect,
} from "../src";

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

// const deltaEqComplex = (a: ComplexArray, b: ComplexArray, eps?: number) =>
//     deltaEq(a[0], b[0], eps) && deltaEq(a[1], b[1], eps);

group("fft", {
    roundtrip: () => {
        const src = osc(cos, 64 / 512, 1).take(512);
        const rev = ifft(fft([...src]));
        assert.ok(deltaEq(rev[0], src));
    },

    parseval: () => {
        const FC = 64;
        const FS = 512;
        const A = 0.5;
        const N = 2 * FS;
        const I = freqBin(FC, FS, N);

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

        assert.ok(eqDelta(powerSumSquared(src), sumT), "sumT1");
        assert.ok(eqDelta(powerSumSquared(fwd), sumF), "sumF1");
        assert.ok(eqDelta(powerMeanSquared(src), sumT / N), "sumT2");
        assert.ok(eqDelta(powerMeanSquared(fwd), sumF / N), "sumF2");

        assert.ok(eqDelta(spectrumMag(fwd)[I], 2 * sumF));
        assert.ok(eqDelta(spectrumPow(fwd)[I], sumF));
        assert.ok(eqDelta(spectrumPow(fwd, true)[I], magDb(A)));
        assert.ok(eqDelta(spectrumPhase(fwd)[I], (1 / 12) * TAU));

        const norm = normalizeFFT(copyComplex(fwd), win);

        assert.ok(eqDelta(spectrumMag(norm)[I], A));
        assert.ok(eqDelta(spectrumPow(norm, false, 1)[I], A / 2));
        assert.ok(eqDelta(spectrumPow(norm, true, 1)[I], magDb(A)));
        assert.ok(eqDelta(spectrumPhase(norm)[I], (1 / 12) * TAU));
    },
});
