// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { balance } from "../src/index.js";

describe("isBalanced", () => {
	test("balanced (skip)", () => {
		const check = balance();
		for (let x of [
			"",
			"()",
			"{}",
			"[]",
			`''`,
			`""`,
			`"'"`,
			`"("`,
			`")"`,
			`"()"`,
			"(())",
			"'(){[]}()'",
			"'(){[}()'",
			`a("x(y")b`,
			`a("x(y"(z))b`,
		]) {
			expect(check(x), x).toBeTrue();
		}
	});

	test("unbalanced (skip)", () => {
		const check = balance();
		for (let x of [
			"(",
			"{",
			"[",
			`'`,
			`"`,
			"(()",
			"{}}",
			"[][",
			`'''`,
			`"""`,
			"({[",
			"({}[",
		]) {
			expect(check(x), x).toBeFalse();
		}
	});

	test("balanced (no skip)", () => {
		const check = balance({ "(": ")" }, [`"`, `'`], false);
		for (let x of [
			``,
			`()`,
			`""`,
			`"()"`,
			`((""))`,
			`('("")')`,
			`(""'()')`,
		]) {
			expect(check(x), x).toBeTrue();
		}
	});

	test("unbalanced (no skip)", () => {
		const check = balance({ "(": ")" }, [`"`], false);
		for (let x of [
			`"(")`,
			`(")"`,
			`("("`,
			`("(")`,
			`("("())`,
			`("(`,
			`"(`,
		]) {
			expect(check(x), x).toBeFalse();
		}
	});

	test("custom", () => {
		const check = balance({ BEGIN: "END;" });
		expect(check("foo BEGIN a b END; bar".split(" "))).toBeTrue();
		expect(
			check("foo BEGIN a BEGIN b END; bar END;".split(" "))
		).toBeTrue();
		expect(check("foo BEGIN a b".split(" "))).toBeFalse();
		expect(check("foo BEGIN a BEGIN b END; bar".split(" "))).toBeFalse();
	});
});
