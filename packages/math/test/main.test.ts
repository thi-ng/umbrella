import { expect, test } from "bun:test";
import {
	fmod,
	mod,
	nearestPrime,
	primesUntil,
	remainder,
} from "../src/index.js";

test("fmod", () => {
	expect(fmod(3.75, 2)).toBe(1.75);
	expect(fmod(-3.75, 2)).toBe(-1.75);
	expect(3.75 % 2).toBe(1.75);
	expect(-3.75 % 2).toBe(-1.75);
});

test("mod", () => {
	expect(mod(3.75, 2)).toBe(1.75);
	expect(mod(-3.75, 2)).toBe(0.25);
});

test("remainder", () => {
	expect(remainder(3.75, 2)).toBe(-0.25);
	expect(remainder(-3.75, 2)).toBe(0.25);
});

test("primes", () => {
	expect([...primesUntil(0)]).toEqual([]);
	expect([...primesUntil(1)]).toEqual([1]);
	expect([...primesUntil(100)]).toEqual([
		1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
		67, 71, 73, 79, 83, 89, 97,
	]);
	expect(nearestPrime(-2)).toBe(-1);
	expect(nearestPrime(0)).toBe(-1);
	expect(nearestPrime(1)).toBe(1);
	expect(nearestPrime(2)).toBe(2);
	expect(nearestPrime(4)).toBe(3);
	expect(nearestPrime(8)).toBe(7);
	expect(nearestPrime(16)).toBe(13);
	expect(nearestPrime(1024)).toBe(1021);
});
