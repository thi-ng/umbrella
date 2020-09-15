import type { NumericArray } from "@thi.ng/api";
import * as assert from "assert";
import {
    ComplexArray,
    denormalizeFFT,
    fft,
    ifft,
    normalizeFFT,
    spectrumPhase,
    spectrumPow,
} from "../src";

const pulse8 = [-1, -1, -1, -1, 1, 1, 1, 1];

const deltaEq = (a: NumericArray, b: NumericArray, eps = 1e-3) => {
    if (a.length != b.length) return false;
    eps **= 2;
    for (let i = a.length; --i >= 0; ) {
        if ((a[i] - b[i]) ** 2 > eps) return false;
    }
    return true;
};

const deltaEqComplex = (a: ComplexArray, b: ComplexArray, eps?: number) =>
    deltaEq(a[0], b[0], eps) && deltaEq(a[1], b[1], eps);

describe("fft", () => {
    it("pulse(8)", () => {
        const res = fft([...pulse8]);

        assert.ok(
            deltaEqComplex(res, [
                [0, -2, 0, -2, 0, -2, 0, -2],
                [0, 4.828, 0, 0.828, 0, -0.828, 0, -4.828],
            ])
        );

        assert.ok(
            deltaEqComplex(ifft(fft([...pulse8])), [
                pulse8,
                [0, 0, 0, 0, 0, 0, 0, 0],
            ])
        );

        assert.ok(
            deltaEqComplex(
                ifft(denormalizeFFT(normalizeFFT(fft([...pulse8])))),
                [pulse8, [0, 0, 0, 0, 0, 0, 0, 0]]
            )
        );

        const norm = normalizeFFT(fft([...pulse8]));

        assert.ok(
            deltaEqComplex(norm, [
                [0, -0.707, 0, -0.707, 0, -0.707, 0, -0.707],
                [0, 1.707, 0, 0.293, 0, -0.293, 0, -1.707],
            ])
        );

        assert.ok(deltaEq(spectrumPow(res, false), [0, 3.414, 0, 0.586]));

        assert.ok(
            deltaEq(spectrumPow(res, true), [
                -Infinity,
                -3.698,
                -Infinity,
                -11.354,
            ])
        );

        assert.ok(deltaEq(spectrumPhase(res), [0, 1.963, 0, 2.749]));
    });
});
