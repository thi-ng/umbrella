import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    fmod,
    mod,
    nearestPrime,
    primesUntil,
    remainder,
} from "../src/index.js";

group("math", {
    fmod: () => {
        assert.strictEqual(fmod(3.75, 2), 1.75);
        assert.strictEqual(fmod(-3.75, 2), -1.75);
        assert.strictEqual(3.75 % 2, 1.75);
        assert.strictEqual(-3.75 % 2, -1.75);
    },

    mod: () => {
        assert.strictEqual(mod(3.75, 2), 1.75);
        assert.strictEqual(mod(-3.75, 2), 0.25);
    },

    remainder: () => {
        assert.strictEqual(remainder(3.75, 2), -0.25);
        assert.strictEqual(remainder(-3.75, 2), 0.25);
    },

    primes: () => {
        assert.deepStrictEqual([...primesUntil(0)], []);
        assert.deepStrictEqual([...primesUntil(1)], [1]);
        assert.deepStrictEqual(
            [...primesUntil(100)],
            [
                1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
                59, 61, 67, 71, 73, 79, 83, 89, 97,
            ]
        );
        assert.strictEqual(nearestPrime(-2), -1);
        assert.strictEqual(nearestPrime(0), -1);
        assert.strictEqual(nearestPrime(1), 1);
        assert.strictEqual(nearestPrime(2), 2);
        assert.strictEqual(nearestPrime(4), 3);
        assert.strictEqual(nearestPrime(8), 7);
        assert.strictEqual(nearestPrime(16), 13);
        assert.strictEqual(nearestPrime(1024), 1021);
    },
});
